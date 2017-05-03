/**
 * 游记编辑右侧列表
 * 
 * 参数说明:
 * 
 *  依赖：vue2.0
 * 
 *  使用示例：
 * Created by xujia on 2017/4/24.
 */
Vue.component('yjcatalog-component', {
	props: ["list"],
	template: '' +
		'<div class="catalog">'+
		'	<img src="img/catalogIcon.png" alt="" class="catalog-icon">'+
		'	<span class="catalog-text">点击对应行程可快速切换</span>'+
		'	<ul>'+
		'		<li v-for="(l,index) in list" >'+
		'			<a style="text-decoration:none" href="#" v-on:click="greet(index)">{{ index }}/ {{l.journeyTitle}}</a>'+
		'		</li>'+
		'	</ul>'+
		'</div>',
	data: function() {
		return {
			test: ""
		}
	},
	/**
	 * 初始化控件
	 */
	created: function() {
	},
	mounted: function() {
	},
 
  	methods: {  
    	greet: function (index) {  
      		window.console.log(index);
    	}  
  	}  
})