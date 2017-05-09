/**
 * 游记编辑搜索弹框 tagspopu
 *
 * 参数说明:
 *
 *  依赖：vue2.0,jquery
 *
 *  使用示例：
 * Created by yangijng on 2017/5/8.
 */
Vue.component('yjmessagepopup-component', {
    props: ['btnnumber', 'message'],
    template: '' +
    '<div class="message-box">'+
    '   <div class="message-box-content">'+
    '       <img src="img/successIcon.png" alt="" class="message-box-img">'+
    '       <p>{{message}}</p>'+
    '       <img src="img/popupClose.png" class="message-box-close" alt="" @click="close">'+
    '   </div>'+
    '   <div v-if="btnnumber==1" class="message-box-footer">'+
    '       <a href="javascript:void(0)" style="width:200px" @click="close">确定</a>'+
    '   </div>'+
    '   <div v-if="btnnumber==2" class="message-box-footer">'+
    '       <a href="javascript:void(0)" style="width:160px" @click="sure">确定</a>'+
    '       <a href="javascript:void(0)" style="width:160px;margin-left: 40px;" @click="close">取消</a>'+
    '   </div>'+
    '</div>'+
    '',
    data: function() {
        return {}
    },
    /**
     * 初始化控件
     */
    created: function() {

    },
    mounted: function() {

    },
    methods:{
        close :function(){
            $("html").removeClass("mfixed")
            this.$parent.showMessageBox = false;
        },
        sure: function(){
            this.$emit('delback');

        }
    }
})