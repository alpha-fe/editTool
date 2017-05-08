/**
 * 游记编辑搜索下拉框 datepicker
 * 
 * 参数说明:
 * 
 *  依赖：vue2.0,jquery,jquery-ui
 * 
 *  使用示例：
 * Created by xujia on 2017/4/24.
 */
Vue.component('yjpicmixtool-component', {
	props: ["d"],
	template: '' +
		'<div v-if="data"  class="dragArticle clearfix" id="dragArticle">' +
		'	<div class="journey-catalog">' +
		'		<ul>' +
		'			<li @click="selectJourney($event)" :class="{active:index==tabSelected}" :index="index" v-for="(item,index) in data.paragraphList">{{item.journeyTitle}}</li>' +
		'		</ul>' +
		'	</div>' +
		'	<div class="journey-content">' +
		'		<div class="dragArticle-header clearfix">' +
		'			<p class="notice-big fl">拖拽可调整正文、图片顺序</p>' +
		'			<p class="notice-small fl">支持jpg、png、bmp格式的图片，图片单张大小不超过20M，<br> 图片最小支持：320*800px，最大支持9999*9999px.' +
		'			</p>' +
		'			<a href="javascript:void(0);" class="dragArticle-close" @click="hideMixtool">关闭</a>' +
		'			<a href="javascript:void(0);" class="dragArticle-save" @click="saveMixtool">保存</a>' +
		'		</div>' +
		'		<div class="drag-con">' +
		'			<ul class="clearfix gridly" v-show="tabSelected==pindex" v-for="(paragraph,pindex) in data.paragraphList" style="position: relative;">' +
		'				<li v-for="(item,jindex) in paragraph.journeyContent" :id="\'\'+pindex+jindex" :mid="jindex" class="dragArticle-item fl">' +
		'					<div class="brick small">' +
		'						<img class="img" v-if="item.type==\'img\'" :src="item.imgurl" alt="">' +
		'						<img v-if="item.type==\'text\'" src="img/updateContent.png" alt="">' +
		'						<a href="javascript:void(0);" @click="del(jindex,$event)" class="del-icon">' +
		'							<img src="img/deleteIcon-white.png" alt=""><span></span>' +
		'						</a>' +
		'						<p v-if="item.type==\'text\'" @click="modifyContent" class="update"><span>修改正文</span><span class="bg-span"></span></p>' +
		'						<p v-if="item.type==\'img\'" @click="modifyComment" class="update"><span>添加图注</span><span class="bg-span"></span></p>' +
		'						<input type=input style="display:none" :value="JSON.stringify(item)" />' +
		'					</div>' +
		'				</li>' +
		'			</ul>' +
			'		<ul>' +
		'				<a href="javascript:void(0);" @click="addContent($event)" class="fl">' +
		'					<img src="img/addTextIcon.png" alt="">' +
		'					<span class="text">添加正文</span>' +
		'				</a>' +
		'				<a href="javascript:void(0);" @click="addImg($event)"  class="fl">' +
		'					<img src="img/addImgIcon.png" alt="">' +
		'					<span class="img-number">0/50</span>' +
		'					<span class="text">添加图片</span>' +
		'					<yjupload-component @childup="uploadimg" ></yjupload-component>'+
		'				</a>' +
		'			</ul>' +
		'		</div>' +
		'	</div>' +
		'</div>' +
		'',
	data: function() {
		return {
			init: false,
			tabSelected: 0, // 选中的行程tabindex
			tabJourneyOpRecord: [], // 操作日志，用于保存
			tabJourneySorted: [], // 所有行程的正文图片的排序
			tabJourneyDel: [], // 所有行程的正文图片的删除index
			data: null,
			baseData: null
		}
	},
	/**
	 * 初始化控件
	 */
	created: function() {
		console.log("created mixtool");

		window.console.log("d:" + JSON.stringify(this.d));

		var jsonData = JSON.stringify(this.d);
		this.data = JSON.parse(jsonData); // 通过此方式进行深拷贝
		this.baseData = JSON.parse(jsonData); // 通过此方式进行深拷贝

		if(this.tabJourneySorted.length == 0) {
			for(var i = 0; i < this.data.paragraphList.length; i++) {
				this.tabJourneyOpRecord.push([]);
				this.tabJourneySorted.push([]);
				this.tabJourneyDel.push([]);
			}
		}

	},
	destroyed: function() {
		console.log("destroyed mixtool");
	},
	mounted: function() {

		var self = this;
        var $dragCon = $('div.drag-con');
    	$dragCon.find(".gridly").each(function(){

	        $(this).sortable({
				placeholder: "ui-state-highlight dragArticle-item fl",
	        	cursor: "move"
	        });
	        $(this).disableSelection();
        });
	},
	methods: {
		/**
		 * 隐藏图文混排工具
		 */
		hideMixtool: function() {
			var self = this;
            $("html").removeClass("mfixed");
			$(this.$el).animate({ width: 'toggle' }, function() {
				self.$emit('childup', { isCreated: false });
			});
		},
		/**
		 * 保存图文混排工具当前状态
		 */
		saveMixtool: function() {
			var self = this;

			// 保存前的数据顺序
			window.console.log("保存前:" + JSON.stringify(this.data));
			
			var saveData = JSON.parse(JSON.stringify(this.data));
			var tabList = saveData.paragraphList;
			for(var i = 0; i < tabList.length; i++) {
				var selector = '.gridly:eq(' + i + ')';
				// 获得排序后的ele
				var sortedEles = this.$options.methods.sort.bind(this)(selector);
				var journeyContent = [];
				for(var j = 0; j < sortedEles.length; j++) {
					var ele = sortedEles[j];
					var jsonStr = $(ele).find('input').val();
					var obj = JSON.parse(jsonStr);
					journeyContent.push(obj);
				}
				saveData.paragraphList[i].journeyContent = journeyContent;
			}

			// 保存后的数据顺序
			window.console.log("保存后:" + JSON.stringify(saveData));
			$(this.$el).animate({ width: 'toggle' }, function() {
				self.$emit('childup', { isCreated: false, data: saveData });
			});
            $("html").removeClass("mfixed");
		},
		/**
		 * 添加正文
		 */
		addContent: function() {
			var content = {
				"id": "",
				"imgurl": "",
				"content": "testtest",
				"type": "text",
				"width": "",
				"height": ""
			};
			$(".dragArticle-add-content").show();
			$("html").addClass("mfixed");
			this.data.paragraphList[this.tabSelected].journeyContent.push(content);

			console.log('add text');
		},
		/**
		 * 修改正文
		 */
		modifyContent: function() {
			// todo:未做
		},
		/**
		 * 修改注解
		 */
		modifyComment: function() {
			// todo:未作做
            $(".dragArticle-add-caption").show();
            $("html").addClass("mfixed");
		},
		/**
		 * 上传图片
		 * @param {Object} r
		 */
		uploadimg:function(r){
//			window.console.log(JSON.stringify(r));
			if(r.code != 0){
				alert("上传错误");
				return;
			}
			
			var img = {
				"id": "",
				"imgurl": "",
				"content": "",
				"type": "img",
				"width": "",
				"height": ""
			};
			img.imgurl = r.result;
			this.data.paragraphList[this.tabSelected].journeyContent.push(img);

//			console.log('add img')
		},
		/**
		 * 添加图片
		 */
		addImg: function(event) {
			var $uploadinput = $(event.target).parents('ul').find('input');
			$uploadinput.click();
	
		},
		/**
		 * 删除某个正文或图注
		 * @param {Object} index
		 * @param {Object} event
		 */
		del: function(index, event) {
			var journeyEl = $(event.currentTarget);
			journeyEl.parent().parent().remove();

		},
		/**
		 * 选择行程tab
		 * @param {Object} event
		 */
		selectJourney: function(event) {
			var journeyEl = $(event.currentTarget);
			this.tabSelected = journeyEl.attr('index');

		},
		/**
		 * 排序
		 * @param {Object} $selector
		 */
		sort: function($selector) {
			return($($selector + '> *')).sort(function(a, b) {
				var $a, $b, aPosition, aPositionInt, bPosition, bPositionInt;
				$a = $(a);
				$b = $(b);
				aPosition = $a.data('position');
				bPosition = $b.data('position');
				aPositionInt = parseInt(aPosition);
				bPositionInt = parseInt(bPosition);
				if((aPosition != null) && (bPosition == null)) {
					return -1;
				}
				if((bPosition != null) && (aPosition == null)) {
					return +1;
				}
				if(!aPosition && !bPosition && $a.index() < $b.index()) {
					return -1;
				}
				if(!bPosition && !aPosition && $b.index() < $a.index()) {
					return +1;
				}
				if(aPositionInt < bPositionInt) {
					return -1;
				}
				if(bPositionInt < aPositionInt) {
					return +1;
				}
				return 0;
			});
		}

	}
})