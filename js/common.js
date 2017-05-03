var utils = {
	UPLOAD_IMG_TYPE: '.jpg,.bmp,jpeg,.png',
	getQueryParam: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	},
	getImageUrl:function(width,height,imageName){
	    if (typeof  imageName == "undefined"){
	        throw new Error("imageName must not undefined");
	    }
	    var preUrl = imageName.substr(0, imageName.lastIndexOf("/") + 1);
	    var lastUrl = imageName.substr(imageName.lastIndexOf("/") + 1);
	    lastUrl = width + "x" + height + "_0_autohomecar__" + lastUrl;
	    return preUrl + lastUrl;
	},
	setLocalStorage: function(key, obj) {
		localStorage.setItem(key, JSON.stringify(obj));
	},
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
	deepClone: function(data) {
		var t = typeof(data),
			o, i, ni;

		if(t === 'array') {
			o = [];
		} else if(t === 'object') {
			o = {};
		} else {
			return data;
		}

		if(t === 'array') {
			for(i = 0, ni = data.length; i < ni; i++) {
				o.push(utils.deepClone(data[i]));
			}
			return o;
		} else if(t === 'object') {
			for(i in data) {
				o[i] = utils.deepClone(data[i]);
			}
			return o;
		}
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