var baseData = {};
var mainVue = new Vue({
	el: '#app',
	data: {
		isReady:false,			// 获取到json数据后设置为true
		showYjpicmixtool:false,	// 每次关闭图文混排都销毁组件
		hasTags: false,			// true:显示修改标签 false:添加标签
		yjData:{}
	},
	created: function() {
//		$.ajaxSettings.async = true;
		self = this;
		$.getJSON("mock/main.json", function(data) {
			self.yjData = data;
			self.isReady = true;
		});
	
	},
	mounted: function() {


	},
	methods: {
		/**
		 * 添加行程
		 */
		addJourney:function(){
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
		        "address": "行程1",
		        "addressInfo": "",
		        "startCost": null,
		        "endCost": null,
		        "startTime": "",
		        "tagdict": [],
		        "journeyContent": []
		     };
		     this.yjData.paragraphInfo.paragraphList.push(journey);
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
			console.log('预览');
		},
		/**
		 * 发布
		 */
		publish: function() {
			console.log('发布');
		}
	}
})