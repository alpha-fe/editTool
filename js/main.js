var queryParams = utils.getQueryParams();	// url的query参数
var enterType = 0;							// 进入方式
var yjDraftData = null;						// 游记本地草稿数据
var userId = "";							// 用户ID
var mainVue = new Vue({
    el: '#app',
    data: {
    	apiConfig : {},
        isReady:false,			// 获取到json数据后设置为true
        isRender:true,			// 保存图文混排时画面重绘
        showYjpicmixtool:false,	// 每次关闭图文混排都销毁组件
        hasTags: false,			// true:显示修改标签 false:添加标签
        yjData:{},				// 游记数据
      	enterType:enterType	,	// 进入类型 0 发表游记 1 编辑 2 续写 3从草稿进入
      	intervalObj : null,		// 自动保存
      	doAutoSave:false,		// 是否启用自动保存
        showAddContent:false,	// 添加正文
        showMessageBox:false,   //结果弹框
        pIndex:0,               //当前操作对应的行程索引
        resultMessage:"",
        btnNumber:1,
        limitStyle: {
            color: '#FD5554'
        }
    },
    created: function() {
        self = this;
        this.apiConfig = CONF;
		// 初始化方法
		this.initByCreated();
        
        //  test
//      $.getJSON("mock/main.json", function(data) {
//          	self.yjData = data;
//          	self.isReady = true;
//	    });
   
    },
    mounted: function() {
    	
		this.initByMounted();
    },
    methods: {
    	/**
    	 * mounted事件中的初始化
    	 */
    	initByCreated:function(){
    		self = this;
    	  	var tripId = queryParams['tripId'];
			var travelStatus = queryParams["travelStatus"];
			var isContinue = queryParams["c"] === "0";
			userId= yjTools.getUserIdByCookie();
			
			// 未登陆用户去登陆
			if (userId == ""){
		        var loacation = window.location.href;
				//去掉离开页面弹窗
		        window.removeEventListener("beforeunload", checkLeavePage);
		        window.removeEventListener("unload", checkLeavePage);
		        window.location = "http://account.autohome.com.cn/?backurl="+encodeURIComponent(loacation);
		    	return;
			}
			// 判断进入方式
			if( tripId != "" && typeof tripId !== "undefined" && (travelStatus == "" || typeof travelStatus === "undefined")){
				// 草稿进入
				enterType = 3;
			}else if(tripId != "" && typeof tripId !== "undefined" && travelStatus == "detail" && isContinue){
				// 续写
				enterType = 2;
			}else if(tripId != "" && typeof tripId !== "undefined" && travelStatus == "detail"){
				// 点击 编辑
				enterType = 1;
			}else{
				// 通过发表游记进入
				enterType = 0;
			}
			var draftData = yjTools.getDraftByEnterType(tripId,userId,enterType);
			var baseData = yjTools.getBaseData();
	        var serverData = null;
	        var isDraftLatest = false;
        	if(enterType == 0){ // 新游记
        		
      
    			if(draftData){
    				// 弹出提示『您还有未写完的游记，是否读取草稿？』
					// 点击是读取草稿，
					// 点击否则删除草稿，用户可以重新新建游记
					var layerid = layer.confirm('您还有未写完的游记，是否读取草稿？', {
					  btn: ['读取','不读取'] //按钮
					}, function(){
						layer.close(layerid);
						
						self.yjData = draftData;
						self.isReady = true;
					}, function(){
						yjTools.clearLocalDraftByUserId(userId);
					 	layer.close(layerid);
					 	
					 	self.yjData = baseData;
					 	self.isReady = true;
					});
    			}else{
    		 		self.yjData = baseData;
					self.isReady = true;
    			}
            		
            	
	        	
	        	
        	}else if(enterType == 1){	// 编辑
        		// http://xujia.autohome.com.cn/editTool/main.html?tripId=53531&travelStatus=detail 测试编辑数据
        		yjTools.getTravelById(tripId,function(data){
        			if (data && data.returncode == 0) {
	           
	                    serverData = data.result;
        				isDraftLatest = yjTools.isDraftLatest(draftData,serverData);
        				if(isDraftLatest){
        					// 弹出提示『检测到此篇游记有未发表的草稿，是否读取？』
							// 点击是读取本地缓存的该篇游记的最新本地草稿，
							// 点击否则删除之前保存的对应游记的本地草稿，读取对应游记的线上草稿
							var layerid = layer.confirm('检测到此篇游记有未发表的草稿，是否读取？', {
							  btn: ['读取','不读取'] //按钮
							}, function(){
								layer.close(layerid);
								
								self.yjData = draftData;
								self.isReady = true;
							}, function(){
								yjTools.clearLocalDraftByUserId(userId,tripId);
							 	layer.close(layerid);
							 	
							 	self.yjData = baseData;
					 			self.isReady = true;
							});
	        			}else{
	        				self.yjData = yjTools.oldConvertToNew(serverData);
	        				self.isReady = true;
	        			}
	            		
	                }else{
	            	 	self.yjData = baseData;
					 	self.isReady = true;
	                }
        		
        		});
        		
        	}else if(enterType == 2){	// 续写
        		// http://xujia.autohome.com.cn/editTool/main.html?tripId=53531&travelStatus=detail&c=0 测试续写数据
        		yjTools.getTravelById(tripId,function(data){
        			if (data && data.returncode == 0) {
	                      serverData = data.result;
        				isDraftLatest = yjTools.isDraftLatest(draftData,serverData);
        				if(isDraftLatest){
	        				// 弹出提示『检测到此篇游记有未发表的草稿，是否读取？』
							// 点击是读取本地缓存的该篇游记的最新本地草稿，
							// 点击否则删除之前保存的对应游记的本地草稿，读取对应游记的线上草稿
							var layerid = layer.confirm('检测到此篇游记有未发表的草稿，是否读取？', {
							  btn: ['读取','不读取'] //按钮
							}, function(){
								layer.close(layerid);
								
								self.yjData = draftData;
								self.isReady = true;
							}, function(){
								yjTools.clearLocalDraftByUserId(userId,tripId);
							 	layer.close(layerid);
							 	
							   	self.yjData = baseData;
					 			self.isReady = true;
							});
	        			}else{
	        				self.yjData = yjTools.oldConvertToNew(serverData);
	        				self.isReady = true;
	        			}
	                }else{
	                	self.yjData = baseData;
					 	self.isReady = true;
	                }

        		});
        	}else if(enterType == 3){	// 草稿
        		// http://xujia.autohome.com.cn/editTool/main.html?tripId=54565 测试草稿数据
        		yjTools.getNewDraftTravelNote(tripId,function(data){
        			if (data && data.returncode == 0) {
	                    serverData = data.result;
        				isDraftLatest = yjTools.isDraftLatest(draftData,serverData);
        				if(isDraftLatest){
	        				// 弹出提示『您还有未写完的游记，是否读取草稿？』
							// 点击是读取草稿，
							// 点击否则删除草稿，用户可以重新新建游记
							var layerid = layer.confirm('您还有未写完的游记，是否读取草稿？', {
							  btn: ['读取','不读取'] //按钮
							}, function(){
								layer.close(layerid);
								
								self.yjData = yjDraftData;
								self.isReady = true;
							}, function(){
								yjTools.clearLocalDraftByUserId(userId);
							 	layer.close(layerid);
							 	
							 	self.yjData = baseData;
					 			self.isReady = true;
							});
	        			}else{
	        				self.yjData = yjTools.oldConvertToNew(serverData);
	        				self.isReady = true;
	        			}
	                }else{
	                	self.yjData = baseData;
					 	self.isReady = true;
	                }
        			
        		});
        	}

    	},
    	/**
    	 * mounted事件中的初始化
    	 */
    	initByMounted:function(){
    		var self = this;
    		document.onkeydown=function(event){
				var e = event || window.event || arguments.callee.caller.arguments[0];
	          	if(e && e.keyCode==27){ // 按 Esc 
	            	return;
	          	}          
	          	if(e && e.keyCode==13){ // enter 键
	            	return;
	          	}
	          	
	          	console.log('自动保存启用');
	          	self.doAutoSave = true;
         	}; 
         	
         	this.autoSaveNote();
    	},
    	/**
    	 * 页面打开时草稿的校验
    	 */
    	initLoadCheck:function(tripId){

    	},
        /**
         * 添加行程，校验标题是否填写，人均花费如果填写是否正确
         */
        addJourney:function(pindex){
            // todo：未完成
            // todo:check
            // check不过 返回
            var isOk = true;
            var checkData = this.yjData.paragraphInfo[0].paragraphList;
            for(var i=0;i<checkData.length;i++){
                var journeyTitle = checkData[i].journeyTitle;
                var startCost = checkData[i].startCost;
                var endCost = checkData[i].endCost;
                if(!journeyTitle){
                    isOk = false;
                    var number = i+1;
                    this.resultMessage ="行程"+number+"尚未添加行程标题"
                    break;
                }
                if(parseInt(startCost) > parseInt(endCost)){
                    isOk = false;
                    this.resultMessage = journeyTitle+"人均最低花费不能高于人均最高花费，快去修改";
                    break;
                }
            }
            if(!isOk){
                this.btnNumber = 1;
                this.showMessageBox = true;
                $("html").addClass("mfixed");
                return;
            }

            var journey = {
                "journeyId": "0",
                "journeyTitle": "",
                "address": "",
                "addressInfo": "",
                "startCost": "",
                "endCost": "",
                "startTime": "",
                "journeyTagdict": [],
                "journeyContent": [
                    {
                        "id": "",
                        "imgurl": "",
                        "content": "",
                        "type": "text",
                        "width": "",
                        "height": ""
                    }
                ]
            };
            if(typeof(pindex) == "undefined"){

                this.yjData.paragraphInfo[0].paragraphList.push(journey);

            }else{

                this.yjData.paragraphInfo[0].paragraphList.splice(pindex,0,journey);

            }
        },
        /**
         * 删除行程
         */
        delJourney:function(pindex){
            this.pIndex = pindex;
            this.resultMessage = "是否删除此行程";
            this.showMessageBox = true;
            this.btnNumber = 2;
            $("html").addClass("mfixed");
        },
        delJourneyCallback:function(){
            this.yjData.paragraphInfo[0].paragraphList.splice(this.pIndex,1);
            this.showMessageBox = false;
            $("html").removeClass("mfixed");
        },
        /**
         * 添加正文
         */
        addContent:function(index){
            this.showAddContent = true;
            $("html").addClass("mfixed");
            this.pIndex = index;
        },
        /**
         * 保存正文
         * @param {Object} r
         */
        addContentCallback:function(r){
            if(r.action == "close"){
                this.showAddContent = false;
                return;
            }
            var index = this.pIndex;
            var content = {
                "id": "",
                "imgurl": "",
                "content": r.content,
                "type": "text",
                "width": "",
                "height": ""
            };
            this.yjData.paragraphInfo[0].paragraphList[index].journeyContent.push(content);
            this.showAddContent = false;

        },

        /**
         * 上传图片后的回掉
         * @param {Object} r
         */
        uploadedimg:function(r,index){
        	window.console.log(JSON.stringify(r));
        	window.console.log(index);
        },
        /**
         * 添加图片
         */
        uploadimg:function(event){
        	var $uploadinput = $(event.target).parents('div.operate').find('a.fl input');
			$uploadinput.click();
        },
        /**
         * 删除正文或图片
         */
        deleteItem:function(pindex,jindex){

            this.yjData.paragraphInfo[0].paragraphList[pindex].journeyContent.splice(jindex,1);
        },
        /**
         * 添加标签
         */
        showTagsPopup: function(index,event) {
            var self = this;
            this.hasTags = index;
            Vue.nextTick(function() {
                var tagsPopupEle = $(event.currentTarget).parent().parent().find('.tags-popup');
                layer.open({
                    type: 1,
                    shade: 0.5,
                    title: false,
                    anim: 2,
                    content: tagsPopupEle,
                    end :function(){
                        self.hasTags = false;
                    }
                });
            })

        },
        /**
         * 标签数据接收
         * @param {Object} r
         */
        yjtagspop:function(r){
            layer.closeAll(); // 通过layer.open方法的end函数 修改this.hasTags = false; 实现销毁tagspopup
            if(r.data){
                var index = r.data.index;
                var tagdict = r.data.tagdict;
                this.yjData.paragraphInfo[0].paragraphList[index].journeyTagdict = tagdict;
            }

        },
        /**
         * 显示图文混排
         */
        showDragArticle:function() {
            this.showYjpicmixtool = true;

            window.console.log(JSON.stringify(this.yjData));
            Vue.nextTick(function() {
                $(".dragArticle").animate({width: 'toggle'});
            })
        },
        /**
         * 图文混排数据接收
         * @param {Object} r
         */
        yjpicmixtool:function(r){
        	if(r.action == "close"){
        		this.showYjpicmixtool = false;

        		Vue.nextTick(function() {
                	$(".dragArticle").animate({width: 'toggle'});
            	})
        		return;
        	}
        	this.isRender = false;
        	if(r.data){
				Vue.set(this.yjData.paragraphInfo, 0, r.data );
            }
            this.isRender = true;
            
			this.showYjpicmixtool = false;
    		Vue.nextTick(function() {
            	$(".dragArticle").animate({width: 'toggle'});
        	})
          
            window.console.log(JSON.stringify(this.yjData));
        },
        /**
         * 自动保存草稿
         */
        autoSaveNote: function() {
            
            var self = this;
            if(this.intervalObj != null){
            	return;
            }
           
            this.intervalObj = setInterval(function(){
            	if(!self.doAutoSave){
            		return;
            	}
            	
            	console.log('自动保存草稿 执行中');
            	switch (enterType){
	            	case 0:	// 新游记
	            	case 3:	// 草稿
	            	setInterval
	            		yjTools.saveLocalDraftByUserId(userId,this.yjData);
	            		break;
	            	case 1:	// 编辑
	            	case 2:	// 续写
	            		var tripId = queryParams['tripId'];
	            		yjTools.saveLocalDraftByTripId(userId,tripId,this.yjData);
	            		break;
	            	default:
	            		break;
            	}
            },30000)
            
        },
        /**
         * 手动保存草稿
         */
        manualSaveNote: function() {
        	yjTools.saveLocalDraftByUserId(userId,this.yjData);
        	layer.alert("保存成功");
//      	var yjdraftData = this.yjData;
//      	yjTools.saveDraftToServer(yjdraftData,function(data){
//      		layer.alert("保存成功");
//      	})
            console.log('手动保存草稿');
        },
        /**
         * 预览
         */
        preview: function() {
        	//去掉离开页面弹窗
           	window.removeEventListener("beforeunload", checkLeavePage);
           	window.removeEventListener("unload", checkLeavePage);
  
            console.log('预览');
        },
        /**
         * 发布
         */
        publish: function() {
        	//去掉离开页面弹窗
           	window.removeEventListener("beforeunload", checkLeavePage);
           	window.removeEventListener("unload", checkLeavePage);
//         	var yjdraftData = this.yjData;
//         	yjTools.publishNoteToServer(yjDraftData,function(data){
//         		if(data){
//         			if (data.returncode == 0) {
//              
//	                    localDataTool.ckearDraft();
//	                    popup.showPubSuccess();
//	                }else if (data.returncode == 2 || data.returncode == 1){
//	                
//	                    yjTools.saveLocalDraftByUserId(userId,yjDraftData);
//	                    popup.showMsg("发布失败："+data.message);
//	                }
//	                else {
//	                 
//	                    yjTools.saveLocalDraftByUserId(userId,yjDraftData);
//	                    popup.showMsg(yjTools.PUBLISH_FAIL);
//	                }
//         		}
//         	});
           	$("html").addClass("mfixed")
            this.showMessageBox = true;
        }
    }
})