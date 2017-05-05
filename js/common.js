var utils = {
	/**
	 * 上传图片类型种类
	 */
	UPLOAD_IMG_TYPE: '.jpg,.bmp,jpeg,.png',
	getQueryParam: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	},
	/**
	 * 获取url querystring 数组
	 */
	getQueryParams:function(){
	    var url = location.search; //获取url中"?"符后的字串
	    var theRequest = new Object();
	    if (url.indexOf("?") != -1) {
	        var str = url.substr(1);
	        strs = str.split("&");
	        for(var i = 0; i < strs.length; i ++) {
	            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
	        }
	    }
	    return theRequest;
	},
	/**
	 * 获取缩略图
	 * @param {Object} width
	 * @param {Object} height
	 * @param {Object} imageName
	 */
	getImageUrl:function(width,height,imageName){
	    if (typeof  imageName == "undefined"){
	        throw new Error("imageName must not undefined");
	    }
	    var preUrl = imageName.substr(0, imageName.lastIndexOf("/") + 1);
	    var lastUrl = imageName.substr(imageName.lastIndexOf("/") + 1);
	    lastUrl = width + "x" + height + "_0_autohomecar__" + lastUrl;
	    return preUrl + lastUrl;
	},
	/**
	 * 存储到localstorage
	 * @param {Object} key
	 * @param {Object} obj
	 */
	setLocalStorage: function(key, obj) {
		localStorage.setItem(key, JSON.stringify(obj));
	},
	/**
	 * 从localstorage取值
	 * @param {Object} key
	 */
	getLocalStorag: function(key) {
		var value = localStorage.getItem(key);
		if(value == null) {
			return value;
		}

		try {
			value = JSON.parse(key);
		} catch(e) {
			window.console.log(e);
		}
		return value;
	}, 
	/**
	 * 获取cookie
	 * @param {Object} cname
	 */
	getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
}

Array.prototype.del = function(index) {
	if(isNaN(index) || index >= this.length) {
		return false;
	}
	for(var i = 0, n = 0; i < this.length; i++) {
		if(this[i] != this[index]) {
			this[n++] = this[i];
		}
	}
	this.length -= 1;
};