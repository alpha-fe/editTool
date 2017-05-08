var queryParams = utils.getQueryParams();	// url的query参数
var enterType = 0;							// 进入方式
var yjDraftData = null;						// 游记本地草稿数据
var userId = "";							// 用户ID
(function(){
	var tripId = queryParams['tripId'];
	var travelStatus = queryParams["travelStatus"];
	var isContinue = queryParams["c"] === "0";
	
	userId= yjTools.getUserIdByCookie();
	// 未登陆用户去登陆
	if (userId == ""){
        var loacation = window.location.href;
		//去掉离开页面弹窗
        window.removeEventListener("beforeunload", checkLeavePage);
        window.removeEventListener("unload", checkLeavePage);
        window.location = "http://account.autohome.com.cn/?backurl="+encodeURIComponent(loacation);
    	return;
	}
	// 判断进入方式
	if( tripId != "" && typeof tripId !== "undefined" && (travelStatus == "" || typeof travelStatus === "undefined")){
		// 草稿进入
		enterType = 3;
	}else if(tripId != "" && typeof tripId !== "undefined" && travelStatus == "detail" && isContinue){
		// 续写
		enterType = 2;
	}else if(tripId != "" && typeof tripId !== "undefined" && travelStatus == "detail"){
		// 点击 编辑
		enterType = 1;
	}else{
		// 通过发表游记进入
		enterType = 0;
	}
	
	var draftData = null;
	switch (enterType){
		case 0:
		case 3:
			draftData = yjTools.getLocalDraftByUserId(userId);
			if(draftData != null){
				// 弹出提示『您还有未写完的游记，是否读取草稿？』
				// 点击是读取草稿，
				// 点击否则删除草稿，用户可以重新新建游记
				var layerid = layer.confirm('您还有未写完的游记，是否读取草稿？', {
				  btn: ['读取','不读取'] //按钮
				}, function(){
					yjDraftData = draftData;
					layer.close(layerid);
				}, function(){
					yjTools.clearLocalDraftByUserId(userId);
				 	layer.close(layerid);
				});
			}
			break;
		case 1:
		case 2:
			draftData = yjTools.getLocalDraftByTripId(userId,tripId);
			if(draftData != null){
				// 弹出提示『检测到此篇游记有未发表的草稿，是否读取？』
				// 点击是读取本地缓存的该篇游记的最新本地草稿，
				// 点击否则删除之前保存的对应游记的本地草稿，读取对应游记的线上草稿
				var layerid = layer.confirm('检测到此篇游记有未发表的草稿，是否读取？', {
				  btn: ['读取','不读取'] //按钮
				}, function(){
					yjDraftData = draftData;
					layer.close(layerid);
				}, function(){
					yjTools.clearLocalDraftByUserId(userId,tripId);
				 	layer.close(layerid);
				});
			}
			break;
		default:
			break;
	}
})();
