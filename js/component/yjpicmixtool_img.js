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
Vue.component('yjmix-img-component', {
	props: ['params', 'imgobj' , 'index'],
	template: ''+
		'<div class="dragArticle-add-caption">'+
		'    <div class="head">'+
		'        添加图注'+
		'        <img src="img/popupClose.png" alt="" class="close" @click="closePupop">'+
		'    </div>'+
		'    <div class="content clearfix">'+
		'        <div class="image fl">'+
		'            <img v-bind:src="img.imgurl">'+
		'            <div class="rotate"></div>'+
		'            <div class="rotate-text">'+
		'                <img @click="rotateImg($event)" src="img/rotateIcon.png" alt="">'+
		'                <span @click="rotateImg($event)">旋转90°</span>'+
		'            </div>'+
		'        </div>'+
		'        <div class="describe fl">'+
		'            <textarea placeholder="为图片添加描述~" v-model="img.content"></textarea>'+
		'            <p class="limit">{{currentLength}}/{{maxLength}}</p>'+
		'        </div>'+
		'    </div>'+
		'    <div class="foot">'+
		'        <span @click="saveContent">保存</span>'+
		'    </div>'+
		'</div>',
	data: function() {
		return {
			type:1,	// 1:添加 2 修改
			title:"",
			img:null,
			currentLength: 0,
			maxLength: 0,
			errMessage: ""
		}
	},
	/**
	 * 初始化控件
	 */
	created: function() {
		console.log(this.imgobj);

		this.type = this.params.type; // 1:添加 2 修改
		this.title = this.params.title;
		this.img = this.imgobj;
		
		if(this.params.defaultmaxlenth === null || typeof this.params.defaultmaxlenth === 'undefined' || this.params.defaultmaxlenth <= 0) {
		} else {
			this.maxLength = this.params.defaultmaxlenth;
			if(!(this.img.content === null || typeof this.img.content === "undefined")) {
				this.currentLength = this.img.content.length;
				if(this.currentLength > this.params.defaultmaxlenth) {
					this.maxLength = this.currentLength;
				}
			}
		}
	},
	watch: {
		/**
		 * 监听content值变化，并调用change方法
		 */
		'img.content': 'change'
	},
	methods: {
		/**
		 * 旋转图片
		 */
		rotateImg:function(event){
			var self = this;
			var imgEle = $(event.currentTarget).parent().parent().find('img:eq(0)');
			var picUrl = imgEle.attr('src');
		
			yjTools.imgRotateUpload({
				"picUrl":picUrl,
				"spinAngle":90
			},
			function(r){
				self.img.imgurl = r.result.result;
				self.img.height = r.result.height;
				self.img.width = r.result.width;
			},
			function(){
				
			})
		},
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
			this.$emit('childup', { type:this.type,  action:"save", img:this.img , index:this.index});
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
			this.currentLength = this.img.content.length;
			if(this.currentLength > this.currentLength) {
				this.maxLength = this.img.content.length;
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

			if(curVal.length > this.maxLength) {
				curVal = oldVal;
				this.img.content = oldVal;
				return false;
			}

			this.maxLength = this.params.defaultmaxlenth;
			this.currentLength = this.img.content.length;
			if(this.currentLength > this.params.defaultmaxlenth) {
				this.maxLength = this.currentLength;
			}
		}

	}
})
