/**
 * 游记编辑工具多行输入框 
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
 * Created by xujia on 2017/4/24.
 */
Vue.component('yjtextarea-component', {
	props: ['params', 'str'],
	template: ''+
		'<div :class="params.css">'+
		'	<textarea v-on:focus="focus" v-on:blur="blur" v-model="message" :placeholder="params.placeholder"></textarea>'+
		'	<p v-if="currentLength==maxLength" class="limit full">{{currentLength}}/{{maxLength}}</p>'+
    	'	<p v-else class="limit">{{currentLength}}/{{maxLength}}</p>'+
		'</div>',
	data: function() {
		return {
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
//		console.log('yjtextarea created');
//		console.log(this.str);
		console.log(this.params.defaultmaxlenth);

		if(this.str === null || typeof this.str === 'undefined') {
//			console.log('str is undefined');
		} else {
			this.message = this.str + "";
		}
//		console.log(this.message)

		if(this.params.defaultmaxlenth === null || typeof this.params.defaultmaxlenth === 'undefined' || this.params.defaultmaxlenth <= 0) {
//			console.log('defaultmaxlenth is undefined');
		} else {
			this.maxLength = this.params.defaultmaxlenth;
			if(!(this.message === null || typeof this.message === "undefined")) {
				this.currentLength = this.message.length;
				if(this.currentLength > this.params.defaultmaxlenth) {
					this.maxLength = this.currentLength;
				}
			}
//			console.log(this.maxLength)
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
		 * 获得焦点
		 */
		focus: function() {

		},
		/**
		 * 失去焦点
		 */
		blur: function() {
//			console.log('blur');
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
