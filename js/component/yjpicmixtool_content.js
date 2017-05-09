/**
 * 游记编辑工具添加正文
 * 
 * 参数说明:
 *  str string 显示值
 * 	defaultstr string 默认显示值
 *  defaultmaxlenth number 可输入最大长度值
 * 
 *  依赖：vue2.0
 * 	支持：ie10+,firfox,chorme
 * 
 * 	兼容详情：ie9不支持placeholder
 * 
 *  使用示例：
 * 
 * Created by xujia on 2017/5/5.
 */
Vue.component('yjmix-content-component', {
	props: ['params', 'str', 'index'],
	template: ''+
		'<div class="dragArticle-add-content" style="z-index:9999">'+
		'    <div class="head">'+
		'        {{title}}'+
		'        <img src="img/popupClose.png" alt="" class="close" v-on:click="closePupop">'+
		'    </div>'+
		'    <div class="content">'+
		'        <textarea name="" v-on:focus="focus" v-on:blur="blur" v-model="message" cols="30" rows="10" placeholder="分享你的旅行故事"></textarea>'+
		'        <span>{{currentLength}}/{{maxLength}}</span>'+
		'    </div>'+
		'    <div class="foot">'+
		'        <span v-on:click="saveContent">保存</span>'+
		'    </div>'+
		'</div>',
	data: function() {
		return {
			type:1,	// 1:添加 2 修改
			title:"",
			message: "",
			currentLength: 0,
			maxLength: 0,
			errMessage: ""
		}
	},
	/**
	 * 初始化控件
	 */
	created: function() {
		console.log(this.params.defaultmaxlenth);

		if(this.str === null || typeof this.str === 'undefined') {
		} else {
			this.message = this.str + "";
		}
		
		this.type = this.params.type; // 1:添加 2 修改
		this.title = this.params.title;

		if(this.params.defaultmaxlenth === null || typeof this.params.defaultmaxlenth === 'undefined' || this.params.defaultmaxlenth <= 0) {
		} else {
			this.maxLength = this.params.defaultmaxlenth;
			if(!(this.message === null || typeof this.message === "undefined")) {
				this.currentLength = this.message.length;
				if(this.currentLength > this.params.defaultmaxlenth) {
					this.maxLength = this.currentLength;
				}
			}
		}
	},
	watch: {
		/**
		 * 监听message值变化，并调用change方法
		 */
		'message': 'change'
	},
	methods: {
		/**
		 * 关闭
		 */
		closePupop:function(){
			$(this.$el).hide();
			this.$emit('childup', { action:"close"});
		},
		/**
		 * 保存
		 */
		saveContent:function(){
			$(this.$el).hide();
			this.$emit('childup', { type:this.type,  action:"save", content: this.message, index:this.index});
		},
		/**
		 * 获得焦点
		 */
		focus: function() {

		},
		/**
		 * 失去焦点
		 */
		blur: function() {
			this.currentLength = this.message.length;
			if(this.currentLength > this.currentLength) {
				this.maxLength = this.message.length;
			}
		},
		/**
		 * 输入值变化时触发
		 * @param {Object} curVal 新值
		 * @param {Object} oldVal 旧值
		 */
		change: function(curVal, oldVal) {
			console.log('change');
			console.log('old:' + oldVal + " new:" + curVal);
			console.log('message:' + this.message);

			if(curVal.length > this.maxLength) {
				curVal = oldVal;
				this.message = oldVal;
				return false;
			}

			this.maxLength = this.params.defaultmaxlenth;
			this.currentLength = this.message.length;
			if(this.currentLength > this.params.defaultmaxlenth) {
				this.maxLength = this.currentLength;
			}
		}

	}
})
