(function() {
	var intervalTime = 5000;

	function init() {
		var isFirst = false;
		// 获取url参数
		var queryParams = utils.getQueryParams();

		var isRefresh = window.sessionStorage["loaded"];
		// 获取到值就是刷新，刷新不处理
		if(isRefresh) {
			checkUtils.setTimestamp(tripId);
			setInterval(function() {
				//5秒自动保存依次
				checkUtils.setTimestamp(tripId);
			}, intervalTime);
			return;
		} else {
			window.sessionStorage["loaded"] = true;
		}

		var tripId = queryParams['tripId'];
		var isEditting = checkUtils.checkActivityEditPage(tripId);
		// 正在编辑则弹出提示
		if(isEditting) {
			window.sessionStorage.clear();
			popup.showTips();
			return;
		}

		checkUtils.setTimestamp(tripId);
		setInterval(function() {
			//5秒自动保存依次
			checkUtils.setTimestamp(tripId);
		}, intervalTime);
	}

	var checkUtils = {
		/**
		 * 写入、更新时间戳本地缓存
		 * @param {Object} tripId
		 */
		setTimestamp: function(tripId) {
			var storage = window.localStorage;
			var key = this.getTimestampKey(tripId);
			var timestamp = new Date().getTime();
			storage.setItem(key, timestamp);
		},
		/**
		 * 清除时间戳本地缓存
		 * @param {Object} tripId
		 */
		removeTimestamp: function(tripId) {
			var storage = window.localStorage;
			var key = this.getTimestampKey(tripId);
			storage.removeItem(key);
		},
		/**
		 * 获取时间戳本地缓存
		 * @param {Object} tripId
		 */
		getTimestamp: function(tripId) {
			var storage = window.localStorage;
			var key = this.getTimestampKey(tripId);
			var timespan = storage[key];
			return timespan == undefined ? 0 : timespan;
		},
		/**
		 * 检查是否存在正在编辑的游记    true  有正在编辑的游记        false  没有正在编辑的游记
		 * @param {Object} tripId
		 */
		checkActivityEditPage: function(tripId) {
			var timestamp = new Date().getTime();
			//console.log("当前时间："+timestamp);
			var prevTimeStamp = this.getTimestamp(tripId);
			//console.log("上一时间："+prevTimeStamp);
			//console.log("相减时间："+(timestamp- prevTimeStamp));
			return timestamp - prevTimeStamp < intervalTime;
		},
		/**
		 * 生成时间戳本地缓存key
		 * @param {Object} tripId
		 */
		getTimestampKey: function(tripId) {
			return "TravelTimestamp_" + tripId;
		}
	}
	
	init();
})();