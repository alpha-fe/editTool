var baseData = {};
var mainVue = new Vue({
    el: '#app',
    data: {
    	apiConfig : {},
        isReady:false,			// 获取到json数据后设置为true
        showYjpicmixtool:false,	// 每次关闭图文混排都销毁组件
        hasTags: false,			// true:显示修改标签 false:添加标签
        yjData:{},				// 游记数据
      	enterType:enterType		// 进入类型 0 发表游记 1 编辑 2 续写 3从草稿进入
    },
    created: function() {
        self = this;
        this.apiConfig = CONF;
		// 勿删除 todo: 初始化方法
//		this.initByCreated();
        
        //  test
        $.getJSON("mock/main.json", function(data) {
            	self.yjData = data;
            	self.isReady = true;
	    });
   
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
	        if(yjDraftData == null){
	        	if(enterType == 0){ // 新游记
	        		$.getJSON("mock/new_empty.json", function(data) {
	            		self.yjData = data;
	            		self.isReady = true;
		        	});
		        	
	        	}else if(enterType == 1){	// 编辑
	        		// http://xujia.autohome.com.cn/editTool/main.html?tripId=53531&travelStatus=detail 测试编辑数据
	        		yjTools.getTravelById(tripId,function(data){
	        			if (data && data.returncode == 0) {
		                    self.yjData = yjTools.oldConvertToNew(data.result);
		                }else{
		                	
		                }
	        			self.isReady = true;
	        		});
	        		
	        	}else if(enterType == 2){	// 续写
	        		// http://xujia.autohome.com.cn/editTool/main.html?tripId=53531&travelStatus=detail&c=0 测试续写数据
	        		yjTools.getTravelById(tripId,function(data){
	        			if (data && data.returncode == 0) {
		                    self.yjData = yjTools.oldConvertToNew(data.result);
		                }else{
		                	
		                }
	        			self.isReady = true;
	        		});
	        	}else if(enterType == 3){	// 草稿
	        		// http://xujia.autohome.com.cn/editTool/main.html?tripId=54565 测试草稿数据
	        		yjTools.getNewDraftTravelNote(tripId,function(data){
	        			if (data && data.returncode == 0) {
		                    self.yjData = yjTools.oldConvertToNew(data.result);
		                }else{
		                	
		                }
	        			self.isReady = true;
	        		});
	        	}
	
	        }else{
	    	 	self.yjData = yjDraftData;
	        	self.isReady = true;
	        }
	        
	        if(typeof self.yjData.paragraphInfo === "undefined" 
	        	|| self.yjData.paragraphInfo == null 
	        	|| self.yjData.paragraphInfo.length == 0){
	        	self.yjData.paragraphInfo = [{
										        "id": "",
										        "journeyTitle": "",
										        "address": "",
										        "addressInfo": "",
										        "startCost": 0,
										        "endCost": 0,
										        "startTime": "",
										        "tagdict": [],
										        "journeyContent": [
										          {
										            "id": "0",
										            "imgurl": "",
										            "content": "",
										            "type": "",
										            "width": "",
										            "height": ""
										          }
										        ]
										      }];
	        }
    	},
    	/**
    	 * mounted事件中的初始化
    	 */
    	initByMounted:function(){
    		
    	},
    	/**
    	 * 页面打开时草稿的校验
    	 */
    	initLoadCheck:function(tripId){

    	},
        /**
         * 添加行程
         */
        addJourney:function(pindex){
            // todo：未完成
            // todo:check
            // check不过 返回
            var isOk = true;
            if(!isOk){
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
                "tagdict": [],
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
            this.yjData.paragraphInfo[0].paragraphList.splice(pindex,1);
        },
        /**
         * 添加正文
         */
        addContent:function(index){
            var content = {
                id: "",
                imgurl: "",
                content: "",
                type: "text",
                width: "750",
                height: "500"
            };
            this.yjData.paragraphInfo[0].paragraphList[index].journeyContent.push(content);
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
                this.yjData.paragraphInfo[0].paragraphList[index].tagdict = tagdict;
            }

        },
        /**
         * 显示图文混排
         */
        showDragArticle:function() {
            this.showYjpicmixtool = true;
            Vue.nextTick(function() {
                $(".dragArticle").animate({width: 'toggle'});
            })
        },
        /**
         * 图文混排数据接收
         * @param {Object} r
         */
        yjpicmixtool:function(r){
            this.showYjpicmixtool = false;
            if(r.data) // 数据返回时 保存数据
                this.yjData.paragraphInfo[0] = r.data;
        },
        /**
         * 自动保存草稿
         */
        autoSaveNote: function() {
            console.log('自动保存草稿');
        },
        /**
         * 手动保存草稿
         */
        manualSaveNote: function() {
        	var yjdraftData = this.yjData;
        	yjTools.saveDraftToServer(yjdraftData,function(data){
        		layer.alert("保存成功");
        	})
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
           	$("html").addClass("mfixed")
            $(".message-box").show();
            console.log('发布');
        }
    }
})