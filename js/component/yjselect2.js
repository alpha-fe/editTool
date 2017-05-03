/**
 * 游记编辑搜索下拉框 autoselect2
 * 
 * 参数说明:
 * 
 *  依赖：vue2.0,jquery，jquery-ui
 * 	支持：ie10+,firfox,chorme
 * 
 *  使用示例：
 *  <yjselect2-component v-bind:params='{css:"fl",domain:"http://you.autohome.com.cn",requestUrl:"/commonexternal/getsuggestplace.do",selectedValue:"selectedValue",destination:"selectedText",destinationInfo:"selectedTextAuto"}' ></yjselect2-component>
 *
 * Created by xujia on 2017/4/16.
 */
Vue.component('yjselect2-component', {
	props: ["params","dest","destinfo"],
	template: '#yjselect2',
	data: function() {
		return {
			destination: "",
			destinationInfo: "",
			currentLength: 0,
			maxLength: 0,
			errMessage: ""
		}
	},
	/**
	 * 初始化控件
	 */
	created: function() {
		if($(this).hasClass(this.params.css)) {
			$(this).addClass(this.params.css);
		}

//		console.log('yjselect2-component created');
//		console.log("dest:"+this.dest);
//		console.log("destinfo:"+this.destinfo);
		var params = this.params;
		if(typeof params === "undefined" || params === null) {
			return;
		}

		if(typeof this.dest !== "undefined" && this.dest !== null) {
			this.destination = this.dest;
		}

		if(typeof this.destinfo !== "undefined" && this.destinfo !== null) {
			this.destinationInfo = this.destinfo + "";
		}

		if(params.defaultmaxlenth !== null &&
			typeof params.defaultmaxlenth !== 'undefined' &&
			params.defaultmaxlenth > 0) {

			this.maxLength = params.defaultmaxlenth;
			if(this.destination !== null && typeof this.destination !== "undefined") {
				this.currentLength = this.destination.length;
				if(this.currentLength > params.defaultmaxlenth) {
					this.maxLength = this.currentLength;
				}
			} else {
				this.currentLength = 0;
			}
		}
	},
	mounted: function() {
//		console.log('已经挂载到模板上:msg变量渲染到模板');
		var url = this.params.domain + this.params.requestUrl;
//		console.log(url);
		var _self = this;
		var inputDom = this.$el.getElementsByTagName('input');
		$(inputDom).autocomplete({
			source: function(request, response) {
				$.ajax({
					url: url,
					dataType: "jsonp",
					contenttype: "application/javascript;charset=utf-8",
					jsonp: 'jsonpCallback',
					data: {
						query: encodeURI(request.term),
						featureClass: "P",
						style: "full",
						maxRows: 5,
						name_startsWith: request.term
					},
					success: function(data) {
						if(data.result) {
							data.result.result = data.result.result.splice(0, 5);
							if(typeof data.result.result == "undefined" || data.result.result.length <= 0) {
								data.result.result.push({
									name: "未找到你输入的地点",
									location: "",
									city: ""
								});
							}
							response($.map(data.result.result, function(item) {
								return {
									label: item.name + (item.name ? "   " + item.city : ""),
									value: item.name,
									destination: item.name,
									destinationInfo: item.location
								}
							}));
						} else {
							var result = [{
								name: "未找到你输入的地点",
								location: "",
								city: ""
							}];
							response($.map(result, function(item) {
								return {
									label: item.name + (item.name ? "   " + item.city : ""),
									value: item.name,
									destination: item.name,
									destinationInfo: item.location
								}
							}));
						}
					},
					error: function(a, b) {
						console.log(a);
					}
				});
			},
			minLength: 1,
			select: function(event, ui) {
				if(ui.item.value == "未找到你输入的地点") {
					return false;
				}
				_self.destination = ui.item.destination; //地点
				_self.destinationInfo = ui.item.destination; //GPS 位置信息

				return false;
			},
			focus: function(event, ui) {
				if(ui.item.value == "未找到你输入的地点") {
					return false;
				}
				_self.destination = ui.item.destination; //地点
				return false;
			}
		})
	},
	watch: {
		/**
		 * destination，并调用change方法
		 */
		'destination': 'change'
	},
	methods: {
		selected: function(e) {
//			console.log('selected');

		},
		change: function(current, old) {
//			console.log('change');
//			console.log('old:' + old + " current:" + current);
//			console.log('destination:' + this.destination);

			if(current.length > this.maxLength) {
				current = old;
				this.destination = old;
				return false;
			}

			this.currentLength = this.destination.length;
			if(this.currentLength > this.params.defaultmaxlenth) {
				this.maxLength = this.currentLength;
			} else {
				this.maxLength = this.params.defaultmaxlenth;
			}
		}
	}
})