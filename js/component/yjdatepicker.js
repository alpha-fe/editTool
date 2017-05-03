/**
 * 游记编辑搜索下拉框 datepicker
 * 
 * 参数说明:
 * 
 *  依赖：vue2.0,jquery
 * 	<script src='js/air-datepicker/dist/js/datepicker.min.js'></script>
 *	<script src='js/air-datepicker/dist/js/i18n/datepicker.zh.js'></script>
 * 
 *  使用示例：
 * Created by xujia on 2017/4/24.
 */
Vue.component('yjdatepicker-component', {
	props: ["journeydate"],
	template: '' +
		'   <input type="text" v-model="selectedDate" placeholder="请选择出行日期" readonly="readonly" data-language="zh" name="startTime" data-error="出行时间">' +
		'',
	data: function() {
		return {
			selectedDate: ""
		}
	},
	/**
	 * 初始化控件
	 */
	created: function() {
//		console.log(' yjdatepicker created');
//		console.log('journeydate:'+this.journeydate);

		if(typeof this.journeydate === "undefined" || this.journeydate === null) {} else {
			this.selectedDate = this.journeydate;
		}

	},
	mounted: function() {
		var elDom = this.$el;
		$(elDom).datepicker({
			maxDate: new Date(),
			onSelect: function(formattedDate, date, inst) {
				if($('.datepicker-panel').length) {
					$('.datepicker-panel > b').html(formattedDate);

				}
				$("#datepickers-container").hide();
			}
		});
		$(elDom).click(function() {
			$("#datepickers-container").show();
		});
	}
})