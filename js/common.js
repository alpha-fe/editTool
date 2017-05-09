var utils = {

	/**
	 * 封面图正在上传当中，请稍后!
	 */
    COVER_UPLOADING_MSG:"封面图正在上传当中，请稍后!",
    /**
     * 保存草稿失败，请稍后再试!
     */
    SAVE_FAIL:"保存草稿失败，请稍后再试!",
    /**
     * 预览失败，请稍后再试!
     */
    PREVER_FAIL:"预览失败，请稍后再试!",
    /**
     * 发布失败，请稍后再试!
     */
    PUBLISH_FAIL:"发布失败，请稍后再试!",
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
	 * 清除缓存
	 * @param {Object} key
	 */
	removeLocalStorage:function(key){
		window.localStorage.removeItem(key);
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
	getLocalStorage: function(key) {
		var value = localStorage.getItem(key);
		if(value == null) {
			return value;
		}

		try {
			value = JSON.parse(value);
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

var yjTools = {
	/**
	 * 获取userid
	 */
	getUserIdByCookie:function(){
	    var clubUserShow = utils.getCookie("clubUserShow");

        if(clubUserShow){
            return clubUserShow.split("|")[0];
        }else{
            return 0;
        }
	},
	/**
	 * 获取username
	 */
	getLoginUserNameByCookie:function(){
	    var clubUserShow = utils.getCookie("clubUserShow");
        if (clubUserShow) {
            return clubUserShow.split("|")[3];
        } else {
            return "";
        }
	},
	/**
	 * 获取头像信息
	 * @param {Object} userid
	 */
	getHeadImgByUserId:function (userid){

	  var headImage = "";//头像图片
		$.ajax({
		    type:"get",
		    dataType : "json",//数据类型为jsonp
		    async:false,
		    url: "/index/getuserheadimg",
		    data: {"userid": userid},
		    success: function (data) {
		      headImage = data.result.HeadImage;
		    }
	  });
	  return headImage;
	},
	/**
	 * 获取本地草稿（发表游记时使用）
	 */
	getLocalDraftByUserId:function(userId){
		var key = userId;
        var draftData = utils.getLocalStorage(key);
        return draftData;
    }, 
    /**
	 * 获取本地草稿（编辑或续写时使用）
	 */
    getLocalDraftByTripId:function(userId,tripId){
    	var key = userId+"_"+tripId;
        var draftData = utils.getLocalStorage(key);
        return draftData;
    },
    /**
	 * 保存本地草稿（发表游记时使用）
	 */
	saveLocalDraftByUserId:function(userId,draftData){
		var key = userId;
        utils.setLocalStorage(key,draftData);
    }, 
    /**
	 * 保存本地草稿（编辑或续写时使用）
	 */
    saveLocalDraftByTripId:function(userId,tripId,draftData){
    	var key = userId+"_"+tripId;
        utils.setLocalStorage(key,draftData);
    },
    /**
     * 清除本地缓存（发表游记时使用）
     * @param {Object} userId
     */
    clearLocalDraftByUserId:function(userId){
    	var key = userId;
        utils.removeLocalStorage(key);
    },
      /**
     * 清除本地缓存（编辑或续写时使用）
     * @param {Object} userId
     */
    clearLocalDraftByTripId:function(userId,tripId){
    	var key = userId+"_"+tripId;
        utils.removeLocalStorage(key);
    },
    /**
     * 获取已发布游记
     * @param {Object} travelId
     */
    getTravelById: function (travelId,scallback,ecallback) {
        if (typeof travelId == "undefined" || travelId == "") {
            return;
        }
        var url = CONF.tripnoteGetUrl;
        var result="";
        $.ajax({
            url: url,
            dataType: "json",
            type: "post",
            async:false,
            data: { tripId: travelId },
            success: function (data) {
            	if(scallback){
            		scallback(data);
            	}
            },
            error: function (a, b) {
            	if(ecallback){
            		ecallback(a,b);
            	}
            }
        });
        return result;
    },
    /**
     * 获取远程草稿
     * @param {Object} tripId
     */
    getNewDraftTravelNote: function (tripId,scallback,ecallback) {
        if (typeof tripId == "undefined" || tripId == "") {
            return;
        }
        var url = CONF.draftGetUrl;
        var result="";
        $.ajax({
            url: url,
            dataType: "json",
            type: "post",
            async:false,
            //contenttype: "application/javascript;charset=utf-8",
            data: { tripId: tripId },
            success: function (data) {
				if(scallback){
            		scallback(data);
            	}
            },
            error: function (a, b) {
            	if(ecallback){
            		ecallback(a,b);
            	}
            }
        });
        return result;
    },
    /**
     * 保存草稿至服务端
     */
    saveDraftToServer:function(draftData,scallback,ecallback) {
        var jsonData = JSON.stringify(draftData);
        $.ajax({
            url: CONF.draftSaveUrl,
            dataType: "json",
            type: "post",
            async:"true",
            contenttype: "application/javascript;charset=utf-8",
            data: { jsonData: $.toJSON(jsonData) },
            success: function (data) {
				if(scallback){
            		scallback(data);
            	}
            },
            error: function (a, b) {
            	if(ecallback){
            		ecallback(a,b);
            	}
            }
        });
    },
     /**
     * 发布游记至服务端
     */
    publishNoteToServer:function(noteData,scallback,ecallback) {
        var jsonData = JSON.stringify(noteData);
        $.ajax({
            url: CONF.publishNoteUrl,
            dataType: "json",
            type: "post",
            async:"true",
            contenttype: "application/javascript;charset=utf-8",
            data: { jsonData: $.toJSON(jsonData) },
            success: function (data) {
				if(scallback){
            		scallback(data);
            	}
            },
            error: function (a, b) {
            	if(ecallback){
            		ecallback(a,b);
            	}
            }
        });
    },
    /**
	 * 将获取到的标签字符串信息转换为对象
	 * @param {Object} strJson
	 */
	oldConvertToTags:function(strJson){
		
		if(typeof strJson !== "string"){
			return strJson;
		}
		// strJson 若是string则转换成array返回
		var tmpCoverTagdict = JSON.parse(strJson);
		//	tagdict	 	 	n	String	标签
		//		code			String	标签code
		//		text			String	标签text
		var coverTagdict = [];
		for(k in tmpCoverTagdict) {
			var v = tmpCoverTagdict[k];
			if(k != "99") {
				coverTagdict.push({ "code": k, "text": v });
				continue;
			}
			var customTags = v.split(',');
			for(var i=0;i<customTags.length;i++){
				var tagName = customTags[i];
				coverTagdict.push({ "code": "99", "text": tagName });
			}
		}
		return coverTagdict;
	},
	/**
	 * 游记老数据转换为新数据
	 */
	oldConvertToNew:function(od){
		// 首先判断有无
		// 首先判断有无

		var nd = {};
		//id				n	int	游记id：发布传0
		nd.id = od.id;
		//userId				y	int	用户id
		nd.userId = od.userId;
		//coverInfo				y		封面信息
		var coverInfo = {};
		//	coverUrl	 	 	n	String	封面URL
		coverInfo.coverUrl = od.coverInfo.coverUrl;
		//	title	 	 	y	String	标题
		coverInfo.title = od.coverInfo.title;
		//	startTime	 	 	n	String	出发时间
		coverInfo.startTime = od.coverInfo.startTime;
		//	destination	 	 	n	String	目的地
		coverInfo.destination = od.coverInfo.destination;
		//	destinationInfo	 	 	n	String	目的地的经纬度信息
		coverInfo.destinationInfo = od.coverInfo.destinationInfo;
		//	perCost	 	 	n	String	人均花费
		coverInfo.perCost = od.coverInfo.perCost;
		// tag转换成数组
		coverInfo.tagdict = this.oldConvertToTags(od.coverInfo.tagdict);
		nd.coverInfo = coverInfo;
		// 行程信息
		nd.paragraphInfo = [];
		var paragraphInfo = {};
		// dayId						day id:发布传0
		paragraphInfo.dayId = null;
		// dayNum					Daynum:发布传0
		paragraphInfo.dayNum = null;
		// paragraphList			行程list
		var nParagraphList = [];
	
		// 
		for(var i =0;i<od.paragraphInfo.length;i++){
			var tmpInfo = od.paragraphInfo[i];
			
			if(typeof tmpInfo.paragraphList === "undefined")
				continue;
				
			for(var j=0;j<tmpInfo.paragraphList.length;j++){
				var tmpParagraph = tmpInfo.paragraphList[j];
				var nParagraph = {};
				//	id		n	String	行程id:发布传0
				nParagraph.id = tmpParagraph.id;
				//	journeyTitle		y	String	行程标题
				nParagraph.journeyTitle = tmpParagraph.journeyTitle;
				//	address		n	String	出发地
				nParagraph.address = tmpParagraph.address;
				//	addressInfo		n	String	出发地经纬度(逗号隔开)
				nParagraph.addressInfo = tmpParagraph.addressInfo;
				//	startCost		n		最低消费
				nParagraph.startCost = tmpParagraph.startCost;
				//	endCost		n		最高消费
				nParagraph.endCost = tmpParagraph.endCost;
				//	startTime		n		出行时间
				nParagraph.startTime = tmpParagraph.startTime;
				nParagraph.journeyTagdict = this.oldConvertToTags(tmpParagraph.journeyTagdict);
				nParagraph.journeyContent = [];
				
				if(typeof tmpParagraph.journeyContent === "undefined")
					continue;
				
				for(var k=0;k<tmpParagraph.journeyContent.length;k++){
					var tmpJourney = tmpParagraph.journeyContent[k];
					var nJourney = {};
					nJourney.id = tmpJourney.id;
					nJourney.imgurl = tmpJourney.imgurl;
					nJourney.content = tmpJourney.content;
					nJourney.type = tmpJourney.type;
					nJourney.width = tmpJourney.width;
					nJourney.height = tmpJourney.height;
					
					nParagraph.journeyContent.push(nJourney);
				}
				nParagraphList.push(nParagraph);
			}
		}
		paragraphInfo.paragraphList = nParagraphList
		nd.paragraphInfo.push(paragraphInfo);
		
		window.console.log(JSON.stringify(od));
		window.console.log(JSON.stringify(nd));
		return nd;
	},
	/**
	 * 上传图片并旋转图片
	 * @param {Object} item
	 * @param {Object} scallback
	 * @param {Object} ecallback
	 */
	imgRotateUpload: function(item,scallback,ecallback){
        var picUrl = item.picUrl,
            spinAngle = item.spinAngle;
            
        $.ajax({
	        url: CONF.uploadpicWithRotateUrl,
	        data:{ 	
	        	picUrl:item.picUrl
	        	,spinAngle:item.spinAngle
	        },
	        dataType: "json",
	        type: "post",
	        contenttype: "application/javascript;charset=utf-8",
	        success: function (data) {
				if(scallback){
					scallback(data);
				}
	        },
   			error: function (a, b) {
  				if(ecallback){
					ecallback(data);
				}
   			}
        });
    },
    /**
     * 用来比较本地草稿是最新的 还是 服务端 保存的是最新的
     * @param {Object} draftData
     * @param {Object} serverData
     */
    isDraftLatest:function(draftData,serverData){
    	if(draftData == null)
    		return false;
    		
    	return true;
    },
    /**
     * 
     * @param {Object} tripId
     * @param {Object} userId
     * @param {Object} enterType
     */
    getDraftByEnterType:function(tripId,userId,enterType){

		var draftData = null;
		switch (enterType){
			case 0:
			case 3:
				draftData = yjTools.getLocalDraftByUserId(userId);
				break;
			case 1:
			case 2:
				draftData = yjTools.getLocalDraftByTripId(userId,tripId);
				break;
			default:
				break;
		}
		return draftData;
    },
    /**
     * 获取默认数据
     */
    getBaseData:function(){
    	return JSON.parse(JSON.stringify(yjBaseData));
    }
};

var yjBaseData = {
  "id": "",
  "userId": "",
  "coverInfo": {
    "coverUrl": "",
    "title": "",
    "destination": "",
    "destinationInfo": "",
    "perCost": "",
    "startTime": "",
    "tagdict": []
  },
  "paragraphInfo": [{
    "id": "",
    "dayNum": "",
    "paragraphList": [
      {
        "id": "",
        "journeyTitle": "",
        "address": "",
        "addressInfo": "",
        "startCost": 0,
        "endCost": 0,
        "startTime": "",
        "tagdict": [],
        "journeyContent": [
          {
            "id": "0",
            "imgurl": "",
            "content": "",
            "type": "text",
            "width": "",
            "height": ""
          }
        ]
      }
    ]
  }]
};