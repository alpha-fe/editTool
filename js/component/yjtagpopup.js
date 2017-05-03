/**
 * 游记编辑搜索弹框 tagspopu
 * 
 * 参数说明:
 * 
 *  依赖：vue2.0,jquery
 * 
 *  使用示例：
 * Created by xujia on 2017/4/24.
 */
Vue.component('yjtapopup-component', {
	props: ["seltags","index"],
	template: '' +
		'<div class="tags-popup" >' +
		'	<div class="popup-header">' +
		'		添加标签' +
		'		<img src="img/popupClose.png" class="close" alt="" v-on:click="closeTagsPopup">' +
		'	</div>' +
		'	<div class="popup-body">' +
		'		<p class="warm">可以选择或创建3个以内的标签，每个标签最多7个字，以空格键或回车键确认完成标签输入</p>' +
		'		<input type="text" placeholder="创建新标签" v-model="customTag" :disabled="disabled" @keydown="keydown">' +
		'		<span class="limit">{{currentLength}}/{{maxLength}}</span>' +
		'		<div class="selected-tags clearfix" >' +
		'			<span v-for="(t,index) in selectedTags" class="fl">{{t.text}}<a href="javascript:void(0);" v-on:click="removeTag(index)" class="remove-tag">×</a></span>' +
		'		</div>' +
		'		<p class="common-tag">常用标签</p>' +
		'		<div class="tagbox">'+
		'			<div class="tag clearfix" v-for="(tag,pindex) in tags">' +
		'				<div class="tag-type fl" @click="processTag(pindex)">{{tag.text}}</div>' +
		'				<div class="tag-name fl">' +
		'					<span v-bind:class="{\'selected\':stag.selected}" @click="processTag(pindex,sindex)" v-for="(stag,sindex) in tag.list">{{stag.text}}</span>' +
		'				</div>' +
		'			</div>' +
    	'		</div>' +
		'	</div>' +
		'	<div class="popup-footer">' +
		'		<a href="javascript:void(0);" @click="confirmAdd" class="add-btn">确认添加</a>' +
		'	</div>' +
		'</div>' +
		'',
	data: function() {
		return {
			tags: [
				{
					"text": "美食",
					"code": "007",
					"list": [{
							"text": "本地小吃 ",
							"code": "0079999000001"
						},
						{
							"text": "本地必吃",
							"code": "0079999000002"
						},
						{
							"text": "本地菜肴",
							"code": "0079999000003"
						},
						{
							"text": "本地人推荐",
							"code": "0079999000004"
						}
					]
				},
				{
					"text": "住宿",
					"code": "008",
					"list": [{
							"text": "酒店",
							"code": "0080001000001"
						},
						{
							"text": "民宿",
							"code": "0080001000002"
						},
						{
							"text": "露营",
							"code": "0080001000003"
						},
						{
							"text": "露营地",
							"code": "0089999000001"
						},
						{
							"text": "农家院",
							"code": "0089999000002"
						},
						{
							"text": "客栈",
							"code": "0089999000003"
						},
						{
							"text": "公寓",
							"code": "0089999000004"
						},
						{
							"text": "借宿",
							"code": "0089999000005"
						},
						{
							"text": "青年旅社",
							"code": "0089999000006"
						}
					]
				},
				{
					"text": "购物",
					"code": "009",
					"list": [{
							"text": "本地特产",
							"code": "0099999000001"
						},
						{
							"text": "本地纪念品",
							"code": "0099999000002"
						},
						{
							"text": "日杂",
							"code": "0099999000003"
						},
						{
							"text": "本土品牌",
							"code": "0099999000004"
						},
						{
							"text": "shopping mall",
							"code": "0099999000005"
						},
						{
							"text": "折扣奥莱",
							"code": "0099999000006"
						},
						{
							"text": "超市/便利店",
							"code": "0099999000007"
						}
					]
				},
				{
					"text": "夜生活",
					"code": "010",
					"list": [{
							"text": "夜景",
							"code": "0109999000001"
						},
						{
							"text": "夜店",
							"code": "0109999000002"
						},
						{
							"text": "酒吧",
							"code": "0109999000003"
						},
						{
							"text": "夜市",
							"code": "0109999000004"
						},
						{
							"text": "KTV",
							"code": "0109999000005"
						},
						{
							"text": "夜宵",
							"code": "0109999000006"
						},
						{
							"text": "演出",
							"code": "0109999000007"
						}
					]
				},
				{
					"text": "游玩",
					"code": "011",
					"list": [{
							"text": "自然风貌",
							"code": "0110001000001"
						},
						{
							"text": "民俗文化",
							"code": "0110001000002"
						},
						{
							"text": "宗教民族",
							"code": "0110001000003"
						},
						{
							"text": "户外",
							"code": "0110001000015"
						},
						{
							"text": "海岛",
							"code": "0110001000004"
						},
						{
							"text": "自驾",
							"code": "0110001000010"
						},
						{
							"text": "古镇",
							"code": "0110001000005"
						},
						{
							"text": "婚纱",
							"code": "0110001000006"
						},
						{
							"text": "摄影",
							"code": "0110001000007"
						},
						{
							"text": "蜜月",
							"code": "0110001000008"
						},
						{
							"text": "游学",
							"code": "0110001000009"
						},
						{
							"text": "邮轮",
							"code": "0110001000011"
						},
						{
							"text": "赏花",
							"code": "0110001000012"
						},
						{
							"text": "潜水",
							"code": "0110001000013"
						},
						{
							"text": "滑雪",
							"code": "0110001000014"
						},
						{
							"text": "民俗风情",
							"code": "0110001000015"
						},
						{
							"text": "历史古迹",
							"code": "0110001000016"
						},
						{
							"text": "户外探险",
							"code": "0110001000017"
						},
						{
							"text": "婚纱旅拍",
							"code": "0110001000018"
						},
						{
							"text": "游轮",
							"code": "0110001000019"
						},
						{
							"text": "博物馆",
							"code": "0110001000020"
						},
						{
							"text": "游乐园",
							"code": "0110001000021"
						},
						{
							"text": "极限运动",
							"code": "0110001000022"
						},
						{
							"text": "艺术馆",
							"code": "0110001000023"
						},
						{
							"text": "游园",
							"code": "0110001000024"
						},
						{
							"text": "骑行",
							"code": "0110001000025"
						}
					]
				}
			],
			disabled: false,
			customTag: "",
			currentLength: 0,
			maxLength: 7,
			tagMax: 3,
			selectedTags: []
		}
	},
	/**
	 * 初始化控件
	 */
	created: function() {
		//		console.log('yjtapopup created');

		if (!(typeof this.seltags === "undefined" || this.seltags === null)){
			this.selectedTags = JSON.parse(JSON.stringify(this.seltags)) ;
		}

		if(this.selectedTags && this.selectedTags.length == 3) {
			this.disabled = true;
		} else {
			this.disabled = false;
		}

		var taglist = [];
		var ptaglength = this.tags.length;
		for(var i = 0; i < ptaglength; i++) {
			var ptag = this.tags[i];
			ptag.selected = false;
			taglist.push(ptag);
			var staglength = ptag.list.length;
			for(var j = 0; j < staglength; j++) {
				var stag = ptag.list[j];
				stag.selected = false;
				taglist.push(stag);
			}
		}

		for(var i = 0; i < taglist.length; i++) {
			var itag = taglist[i];
			for(var j = 0; j < this.selectedTags.length; j++) {
				var jtag = this.selectedTags[j];
				if(itag.code != jtag.code) {
					continue;
				}
				this.selectedTags[j] = itag;
				itag.selected = true;
			}
		}
	},
	mounted: function() {

	},
	watch: {
		/**
		 * 监听message值变化，并调用change方法
		 */
		'customTag': 'change'
	},
	methods: {
		/**
		 * 保存标签
		 */
		confirmAdd: function() {
			this.$emit('childup', { isCreated: false, data:{tagdict: this.selectedTags ,index:this.index}});
//			layer.closeAll();
		},
		/**
		 * 处理标签
		 * 处理已选中的是删除
		 * 处理未选中的是添加
		 * @param {Object} pindex 一级标签索引
		 * @param {Object} sindex 二级标签索引
		 */
		processTag: function(pindex, sindex) {
			//			console.log(pindex + ' ' + sindex);

			var tag = [];
			if(typeof pindex !== 'undefined' && typeof sindex !== 'undefined') {
				tag = this.tags[pindex].list[sindex];
			} else if(typeof pindex !== 'undefined') {
				var tag = this.tags[pindex];
			}

			if(tag.selected) {
				// 已经选择 取消选择
				var newSelectedTags = [];
				for(var i = 0; i < this.selectedTags.length; i++) {
					var t = this.selectedTags[i];
					// 找到选中的
					if(tag.code == t.code) {
						tag.selected = false;
					} else {
						newSelectedTags.push(t);
					}
				}
				this.selectedTags = newSelectedTags
			} else {
				// 未选择 进行选择
				if(this.selectedTags.length >= 3) {
					return;
				}

				for(var i = 0; i < this.selectedTags.length; i++) {
					var t = this.selectedTags[i];
					// 选过的不能再选，直接return
					if(tag.code == t.code) {
						return;
					}
				}
				tag.selected = true;
				this.selectedTags.push(tag);
			}

			if(this.selectedTags.length < 3) {
				this.disabled = false;
			} else {
				this.disabled = true;
			}
		},
		/**
		 * 删除多余标签
		 */
		removeTag: function(index) {
			//			this.selectedTags.del(index);
			//			var newTags = this.selectedTags;
			//			this.selectedTags = newTags.splice(0);

			this.selectedTags[index].selected = false;
			var l = this.selectedTags.length;
			var newSelectedTags = [];
			for(var i = 0; i < l; i++) {
				if(i == index) {
					continue;
				}

				newSelectedTags.push(this.selectedTags[i]);
			}
			this.selectedTags = newSelectedTags;

			if(this.selectedTags.length < 3) {
				this.disabled = false;
			}
		},
		/**
		 * 关闭标签弹层
		 */
		closeTagsPopup: function() {
			this.$emit('childup', { isCreated: false});
//			layer.closeAll();
		},
		/**
		 * 键盘事件
		 * @param {Object} e
		 */
		keydown: function(e) {
			//			console.log(e.keyCode);

			if(e.keyCode != 13 && e.keyCode != 32) {
				return;
			}

			if(typeof this.selectedTags === 'undefined' || this.selectedTags === null) {
				this.selectedTags = [];
			}

			if(this.selectedTags.length >= 3) {
				return;
			}

			var text = this.customTag;
			var code = 99;
			if($.trim(text) == "") {
				return;
			}

			this.selectedTags.push({ "text": text, "code": code });
			this.customTag = "";

			if(this.selectedTags.length == 3) {
				this.disabled = true;
			} else {
				this.disabled = false;
			}
		},
		/**
		 * 输入值变化时触发
		 * @param {Object} curVal 新值
		 * @param {Object} oldVal 旧值
		 */
		change: function(curVal, oldVal) {
			//			console.log('change');
			//			console.log('old:' + oldVal + " new:" + curVal);
			//			console.log('customTag:' + this.customTag);

			if(curVal.length > this.maxLength) {
				curVal = oldVal;
				this.customTag = oldVal;
				return false;
			}

			this.currentLength = this.customTag.length;
		}

	}
})