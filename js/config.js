var isProduct = false;
var CONF = {};
if(!isProduct){
	CONF = {
		// 游记服务器地址
		"serverUrl":"http://you.autohome.com.cn",
		// 获取游记信息
		"tripnoteGetUrl":"http://xujia.autohome.com.cn/tripnote/gettripnotebyidforpc",
		// 获取草稿
		"draftGetUrl":"http://xujia.autohome.com.cn/tripnote/gettripnotebyidforpc",
		// 保存草稿
		"draftSaveUrl":"http://xujia.autohome.com.cn/tripnote/pc/draftnote",
		// 上传图片uploadforbase64
		"uploadforbase64Url":"http://xujia.autohome.com.cn/upload/uploadforbase64",
		// 上传图片uploadpicUrl
		"uploadpicUrl":"http://xujia.autohome.com.cn/upload/uploadpic.do",
		// 目的地搜索
		"suggestUrl":"http://xujia.autohome.com.cn/commonexternal/getsuggestplace.do",
		// 图片旋转
		"uploadpicWithRotateUrl":"http://xujia.autohome.com.cn/upload/uploadpicForUrl"
	};
}else{
	CONF = {
		// 游记服务器地址
		"serverUrl":"http://you.autohome.com.cn",
		// 获取游记信息
		"tripnoteGetUrl":"http://you.autohome.com.cn/tripnote/gettripnotebyidforpc",
		// 获取草稿
		"draftGetUrl":"http://you.autohome.com.cn/tripnote/gettripnotebyidforpc",
		// 保存草稿
		"draftSaveUrl":"http://you.autohome.com.cn/tripnote/pc/draftnote",
		// 上传图片uploadforbase64
		"uploadforbase64Url":"http://you.autohome.com.cn/upload/uploadforbase64",
		// 上传图片uploadpicUrl
		"uploadpicUrl":"http://you.autohome.com.cn/upload/uploadpic.do",
		// 目的地搜索
		"suggestUrl":"http://you.autohome.com.cn/commonexternal/getsuggestplace.do",
		// 图片旋转
		"uploadpicWithRotateUrl":"http://you.autohome.com.cn/upload/uploadpicForUrl"
	};

}
