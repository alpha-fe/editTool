var baseData = {};
var mainVue = new Vue({
    el: '#app',
    data: {
        isReady:false,			// 获取到json数据后设置为true
        showYjpicmixtool:false,	// 每次关闭图文混排都销毁组件
        hasTags: false,			// true:显示修改标签 false:添加标签
        yjData:{},				// 游记数据
        queryParams:[]			// query参数
    },
    created: function() {
//  	// 获取url参数
    	this.queryParams = utils.getQueryParams();
    	
//		$.ajaxSettings.async = true;
        self = this;
        $.getJSON("mock/main.json", function(data) {
            self.yjData = data;
            self.isReady = true;
        });
        
      	$.getJSON("mock/old_sample.json", function(data) {
            self.oldConverToNew(data.result);
        });
    },
    mounted: function() {


    },
    methods: {
    	/**
    	 * 将获取到的标签字符串信息转换为对象
    	 * @param {Object} strJson
    	 */
    	oldConverToTags:function(strJson){
    		
    		if(typeof strJson !== "string"){
    			return strJson;
    		}
    		// strJson 若是string则转换成array返回
    		var tmpCoverTagdict = JSON.parse(strJson);
			//	tagdict	 	 	n	String	标签
			//		code			String	标签code
			//		text			String	标签text
			var coverTagdict = [];
			for(k in tmpCoverTagdict) {
				var v = tmpCoverTagdict[k];
				if(k != "99") {
					coverTagdict.push({ "code": k, "text": v });
					continue;
				}
				var customTags = v.split(',');
				for(var i=0;i<customTags.length;i++){
					var tagName = customTags[i];
					coverTagdict.push({ "code": "99", "text": tagName });
				}
			}
			return coverTagdict;
    	},
    	/**
    	 * 游记老数据转换为新数据
    	 */
    	oldConverToNew:function(od){
    		// 首先判断有无
    		// 首先判断有无

			var nd = {};
			//id				n	int	游记id：发布传0
			nd.id = od.id;
			//userId				y	int	用户id
			nd.userId = od.userId;
			//coverInfo				y		封面信息
			var coverInfo = {};
			//	coverUrl	 	 	n	String	封面URL
			coverInfo.coverUrl = od.coverInfo.coverUrl;
			//	title	 	 	y	String	标题
			coverInfo.title = od.coverInfo.title;
			//	startTime	 	 	n	String	出发时间
			coverInfo.startTime = od.coverInfo.startTime;
			//	destination	 	 	n	String	目的地
			coverInfo.destination = od.coverInfo.destination;
			//	destinationInfo	 	 	n	String	目的地的经纬度信息
			coverInfo.destinationInfo = od.coverInfo.destinationInfo;
			//	perCost	 	 	n	String	人均花费
			coverInfo.perCost = od.coverInfo.perCost;
			// tag转换成数组
			coverInfo.tagdict = this.oldConverToTags(od.coverInfo.tagdict);
			nd.coverInfo = coverInfo;
			// 行程信息
			nd.paragraphInfo = [];
			var paragraphInfo = {};
			// dayId						day id:发布传0
			paragraphInfo.dayId = null;
			// dayNum					Daynum:发布传0
			paragraphInfo.dayNum = null;
			// paragraphList			行程list
			var nParagraphList = [];
		
			// 
			for(var i =0;i<od.paragraphInfo.length;i++){
				var tmpInfo = od.paragraphInfo[i];
				for(var j=0;j<tmpInfo.paragraphList.length;j++){
					var tmpParagraph = tmpInfo.paragraphList[j];
					var nParagraph = {};
					//	id		n	String	行程id:发布传0
					nParagraph.id = tmpParagraph.id;
					//	journeyTitle		y	String	行程标题
					nParagraph.journeyTitle = tmpParagraph.journeyTitle;
					//	address		n	String	出发地
					nParagraph.address = tmpParagraph.address;
					//	addressInfo		n	String	出发地经纬度(逗号隔开)
					nParagraph.addressInfo = tmpParagraph.addressInfo;
					//	startCost		n		最低消费
					nParagraph.startCost = tmpParagraph.startCost;
					//	endCost		n		最高消费
					nParagraph.endCost = tmpParagraph.endCost;
					//	startTime		n		出行时间
					nParagraph.startTime = tmpParagraph.startTime;
					nParagraph.journeyTagdict = this.oldConverToTags(tmpParagraph.journeyTagdict);
					nParagraph.journeyContent = [];
					for(var k=0;k<tmpParagraph.journeyContent.length;k++){
						var tmpJourney = tmpParagraph.journeyContent[k];
						var nJourney = {};
						nJourney.id = tmpJourney.id;
						nJourney.imgurl = tmpJourney.imgurl;
						nJourney.content = tmpJourney.content;
						nJourney.type = tmpJourney.type;
						nJourney.width = tmpJourney.width;
						nJourney.height = tmpJourney.height;
						
						nParagraph.journeyContent.push(nJourney);
					}
					nParagraphList.push(nParagraph);
				}
			}
			paragraphInfo.paragraphList = nParagraphList
			nd.paragraphInfo.push(paragraphInfo);
			
			window.console.log(JSON.stringify(nd));
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

                this.yjData.paragraphInfo.paragraphList.push(journey);

            }else{

                this.yjData.paragraphInfo.paragraphList.splice(pindex,0,journey);

            }
        },
        /**
         * 删除行程
         */
        delJourney:function(pindex){
            this.yjData.paragraphInfo.paragraphList.splice(pindex,1);
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
            this.yjData.paragraphInfo.paragraphList[index].journeyContent.push(content);
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

            this.yjData.paragraphInfo.paragraphList[pindex].journeyContent.splice(jindex,1);
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
                this.yjData.paragraphInfo.paragraphList[index].tagdict = tagdict;
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
                this.yjData.paragraphInfo = r.data;
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
           	
            console.log('发布');
        }
    }
})