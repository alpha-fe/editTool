var popDialog = [{
	"title": "封面图片最大尺寸为9999*9999，最大不超过20MB",
	"content": "请重新选择封面图片",
	"btns": ["确定"]
}, {
	"title": "",
	"content": "图片上传失败了，是否重新上传？",
	"btns": ["是", "否"]
}, {
	"title": "",
	"content": "保存成功",
	"btns": ["确定"]
}, {
	"title": "",
	"content": "保存失败",
	"btns": ["确定"]
}, {
	"title": "",
	"content": "发布失败，已将游记保存至草稿箱！",
	"btns": ["确定"]
}, {
	"title": "",
	"content": "发布成功",
	"btns": ["确定"]
}, {
	"title": "",
	"content": "你有正在编辑的游记尚未保存，快去看看吧~",
	"btns": ["关闭"]
}, {
	"title": "",
	"content": "还有未写完的游记，是否读取？",
	"btns": ["读取", "不读取"]
}, {
	"title": "",
	"content": "是否删除该张图片？",
	"btns": ["是", "否"]
}, {
	"title": "封面图片最小尺寸为670x377",
	"content": "请重新选择封面图片",
	"btns": ["确定"]
}, {
	"title": "您上传的格式不正确！",
	"content": "只能上传 " + utils.UPLOAD_IMG_TYPE + " 格式的文件！",
	"btns": ["确定"]
}]

//弹窗组件
var popup = {
	//清空modal
	clearModal: function() {
		var $modal = $("#modal");
		//$modal.modal({backdrop: 'static'});
		$modal.find(".modal-body").empty();
		$modal.find(".modal-footer").empty();
	},
	setCookie: function(c_name, value, expiredays) {
		var exdate = new Date()
		exdate.setDate(exdate.getDate() + expiredays)
		document.cookie = c_name + "=" + escape(value) +
			((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
	},
	getCookie: function(c_name) {
		if(document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=")
			if(c_start != -1) {
				c_start = c_start + c_name.length + 1
				c_end = document.cookie.indexOf(";", c_start)
				if(c_end == -1) c_end = document.cookie.length
				return unescape(document.cookie.substring(c_start, c_end))
			}
		}
		return ""
	},
	//图片类型  
	popPicTypeCheckFail: function() {
		var content = $('<div>' +
			'    <p class="icon icon-warning"></p>' +
			'<p>' + window.popDialog[10].title + '</p>' +
			'<p>' + window.popDialog[10].content + '</p>' +
			'  </div>');
		var footer = $('<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[0].btns[0] + '</button>');
		var $modal = $("#modal");
		$modal.modal({ backdrop: 'static' });
		this.clearModal();
		$modal.find(".modal-body").append(content);
		$modal.find(".modal-footer").append(footer);
		footer.click(function() {
			$("#fileupload").click();
		});
		$modal.modal("show");
	},
	//图片尺寸 大小 检查失败
	popPicCheckFail: function() {
		var content = $('<div>' +
			'    <p class="icon icon-warning"></p>' +
			'<p>' + window.popDialog[0].title + '</p>' +
			'<p>' + window.popDialog[0].content + '</p>' +
			'  </div>');
		var footer = $('<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[0].btns[0] + '</button>');
		var $modal = $("#modal");
		$modal.modal({ backdrop: 'static' });
		this.clearModal();
		$modal.find(".modal-body").append(content);
		$modal.find(".modal-footer").append(footer);
		footer.click(function() {
			$("#fileupload").click();
		});
		$modal.modal("show");
	},
	//图片上传失败
	picUplpadFail: function() {
		var content = $('<div>' +
			'    <p class="icon icon-warning"></p>' +
			'    <p>' + window.popDialog[1].content + '</p>' +
			'  </div>');
		var footer = $('<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[1].btns[0] + '</button>' +
			'<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[1].btns[1] + '</button>');
		var $modal = $("#modal");
		$modal.modal({ backdrop: 'static' });
		$modal.find(".modal-body").empty();
		$modal.find(".modal-body").append(content);
		$modal.find(".modal-footer").empty();
		$modal.find(".modal-footer").append(footer);
		footer.click(function(e) {
			var obj = e.originalEvent.srcElement ? e.originalEvent.srcElement : e.originalEvent.target;
			var srcEle = $(obj);
			if(srcEle.text() === "是") {
				$("#fileupload").click();
			} else {}
		});
		$modal.modal("show") //.on('hidden.bs.modal', function (e) {});
	},
	//提示信息
	showMsg: function(msg) {
		var content = $('<div id="save_fail">' +
			'    <p class="icon icon-warning "></p>' +
			'    <p>' + msg + '</p>' +
			'  </div>');
		var footer = $('<button type="button" class="btn btn-warning" data-dismiss="modal">确定</button>');
		var $smModal = $("#smDialog");
		$smModal.modal({ backdrop: 'static' });
		$smModal.find(".modal-body").empty();
		$smModal.find(".modal-footer").empty();
		$smModal.find(".modal-body").append(content);
		$smModal.find(".modal-footer").append(footer);
		$smModal.modal("show");
	},
	//保存成功
	showSaveSuccess: function() {
		var content = $('<div id="save_success">' +
			'    <p class="icon icon-success"></p>' +
			'    <p>' + window.popDialog[2].content + '</p>' +
			'  </div>');
		var footer = $('<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[2].btns[0] + '</button>');
		var $smModal = $("#smDialog");
		$smModal.modal({ backdrop: 'static' });
		$smModal.find(".modal-body").empty();
		$smModal.find(".modal-footer").empty();
		$smModal.find(".modal-body").append(content);
		$smModal.find(".modal-footer").append(footer);
		$smModal.modal("show");
		$smModal.find(".modal-footer").find(".btn-warning").click(function(e) {
			e.preventDefault();
			localDataTool.ckearDraft();
		});
		$smModal.modal("show");
	},
	//保存失败
	showSaveFail: function() {
		var content = $('<div id="save_success">' +
			'    <p class="icon icon-close-r"></p>' +
			'    <p>' + window.popDialog[3].content + '</p>' +
			'  </div>');
		var footer = $('<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[3].btns[0] + '</button>');
		var $smModal = $("#smDialog");
		$smModal.modal({ backdrop: 'static' });
		$smModal.find(".modal-body").empty();
		$smModal.find(".modal-footer").empty();
		$smModal.find(".modal-body").append(content);
		$smModal.find(".modal-footer").append(footer);
		$smModal.modal("show");
	},
	showPubFail: function() {
		var content = $('<div id="save_success">' +
			'    <p class="icon icon-close-r"></p>' +
			'    <p>' + window.popDialog[4].content + '</p>' +
			'  </div>');
		var footer = $('<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[4].btns[0] + '</button>');
		var $smModal = $("#smDialog");
		$smModal.modal({ backdrop: 'static' });
		$smModal.find(".modal-body").empty();
		$smModal.find(".modal-footer").empty();
		footer.click(function() {
			//var data = travelData.getTravelJsonData();
			//localStorage.setItem('jsonData', $.toJSON(data));
			localDataTool.saveLocalDraft();
		});
		$smModal.find(".modal-body").append(content);
		$smModal.find(".modal-footer").append(footer);
		$smModal.modal("show");
	},
	//发布成功
	showPubSuccess: function() {
		var content = $('<div id="save_success">' +
			'    <p class="icon icon-success"></p>' +
			'    <p>' + window.popDialog[5].content + '</p>' +
			'  </div>');
		var footer = $('<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[5].btns[0] + '</button>');
		var $smModal = $("#smDialog");
		$smModal.modal({ backdrop: 'static' });
		$smModal.find(".modal-body").empty();
		$smModal.find(".modal-body").append(content);
		$smModal.find(".modal-footer").empty();
		$smModal.find(".modal-footer").append(footer);
		$smModal.find(".modal-footer").find(".btn-warning").click(function(e) {
			//跳转至详情页
			e.preventDefault();
			var travleId = $("#travelId").val();
			//window.open(util.serverUrl+"/details/"+travleId);
			//清空草稿
			//window.localStorage['jsonData'] = "";
			localDataTool.ckearDraft();
			window.location = util.serverUrl + "/details/" + travleId + "?v=" + Date.parse(new Date());

		});
		$smModal.modal("show");

	},
	popClickNum: 0,
	showRequierInputErr: function(msg) {
		var content = $('<div>' +
			'    <p class="icon icon-warning"></p>' +
			'    <p>' + msg + '</p>' +
			'  </div>');
		var $foot = $('<button type="button" class="btn btn-warning" data-dismiss="modal">确定</button>');

		var $modal = $("#modal");
		$modal.modal({ backdrop: 'static' });
		$modal.find(".modal-body").empty();
		$modal.find(".modal-body").append(content);
		$modal.find(".modal-footer").empty();
		$modal.find(".modal-footer").append($foot);
		$modal.modal("show").on('hidden.bs.modal', function(e) {
			$('.error-focus').focus();
		});

	},
	isOpen: function(draftCache) {
		var userId = getUserIdByCookie();
		var windowopen = parseInt(popup.getCookie('leave'));
		var index = parseInt(popup.getCookie('index'));
		//var windowopen = parseInt(localStorage.getItem('leave'));  //0:没有编辑页面打开  1:有编辑页面打开状态
		// var index = parseInt(localStorage.getItem('index'));
		var data = window.localStorage.getItem(userId);

		if((index == 1 && windowopen == 1) || (index > 1 && windowopen != undefined) || (index > 1 && windowopen >= 0 && data)) {
			console.log(111)
			popup.showTips();
		} else if((index == 1 && windowopen != 1 && data) || (data && index <= 1) || (!data && index > 1 && (windowopen >= 0 || windowopen == ''))) {
			console.log(222)
			popup.showDraftInfo();
		}

	},
	//30秒内有操作,不允许用户打开第二个页面对同一篇游记进行编辑
	showTips: function() {
		var content = $('<div>' +
			'    <p class="icon icon-warning"></p>' +
			'    <p>' + window.popDialog[6].content + '</p>' +
			'  </div>');
		var footer = $('<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[6].btns[0] + '</button>');
		var $modal = $("#modal");
		$modal.modal({ backdrop: 'static' });
		$modal.find(".modal-body").empty();
		$modal.find(".modal-body").append(content);
		$modal.find(".modal-footer").empty();
		$modal.find(".modal-footer").append(footer);
		footer.click(function(e) {
			var obj = e.originalEvent.srcElement ? e.originalEvent.srcElement : e.originalEvent.target;
			var srcEle = $(obj);
			// //清空客户端缓存
			// localDataTool.ckearDraft();
			$('body').removeAttr('onbeforeunload');
			window.close();
		});
		$modal.modal("show"); //.on('hidden.bs.modal', function (e,c) {});
	},
	canotEditTips: function(msg) {
		var content = $('<div>' +
			'    <p class="icon icon-warning"></p>' +
			'    <p>' + msg + '</p>' +
			'  </div>');
		var footer = $('<button type="button" class="btn btn-warning" data-dismiss="modal">确认</button>');
		var $modal = $("#modal");
		$modal.modal({ backdrop: 'static' });
		$modal.find(".modal-body").empty();
		$modal.find(".modal-body").append(content);
		$modal.find(".modal-footer").empty();
		$modal.find(".modal-footer").append(footer);
		footer.click(function(e) {
			window.location.href = "http://you.autohome.com.cn";
		});
		$modal.modal("show"); //.on('hidden.bs.modal', function (e,c) {});
	},
	//显示草稿
	showDraftInfo: function() {
		var content = $('<div>' +
			'    <p class="icon icon-warning"></p>' +
			'    <p>' + window.popDialog[7].content + '</p>' +
			'  </div>');
		var footer = $('<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[7].btns[0] + '</button>' +
			'<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[7].btns[1] + '</button>');
		var $modal = $("#modal");
		$modal.modal({ backdrop: 'static' });
		$modal.find(".modal-body").empty();
		$modal.find(".modal-body").append(content);
		$modal.find(".modal-footer").empty();
		$modal.find(".modal-footer").append(footer);
		footer.click(function(e) {
			var obj = e.originalEvent.srcElement ? e.originalEvent.srcElement : e.originalEvent.target;
			var srcEle = $(obj);
			if(srcEle.text() === "读取") {
				window.location = util.serverUrl + "/edit/editcontent";
				// localStorage.setItem('leave',1);
				// localStorage.setItem('index', localStorage.getItem('index')?localStorage.getItem('index'):1);
				popup.setCookie('leave', 1);
				popup.setCookie('index', popup.getCookie('index') ? popup.getCookie('index') : 1);
			} else {
				//清空客户端缓存
				localDataTool.ckearDraft();
				// localStorage.setItem('leave',0);
				popup.setCookie('leave', 0);
				//window.localStorage.setItem('jsonData', "");
			}
		});
		$modal.modal("show"); //.on('hidden.bs.modal', function (e,c) {});
	},
	//删除图片确认
	showDeletPicConfirm: function(deleteClassId) {
		var content = $('<div>' +
			'    <p class="icon icon-warning"></p>' +
			'    <p>' + window.popDialog[8].content + '</p>' +
			'  </div>');
		var footer = $('<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[8].btns[0] + '</button>' +
			'<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[8].btns[0] + '</button>');
		var $modal = $("#modal");
		$modal.modal({ backdrop: 'static' });
		$modal.find(".modal-body").empty();
		$modal.find(".modal-body").append(content);
		$modal.find(".modal-footer").empty();
		$modal.find(".modal-footer").append(footer);
		footer.click(function(e) {
			var obj = e.originalEvent.srcElement ? e.originalEvent.srcElement : e.originalEvent.target;
			var srcEle = $(obj);
			if(srcEle.text() === "是") {
				$("." + deleteClassId).remove();
			} else {}
		});
		$modal.modal("show") //.on('hidden.bs.modal', function (e) {});
	},
	//图片尺寸过小ERROR
	sizeSmallError: function() {
		var sizeSmallError = '<div class="error-panel error-size-small">'
			//          + '<img src="'+util.serverUrl + '/assets/js/edit/images/interrobang.png" alt=""/>'
			+
			'<p>' + window.popDialog[9].title + '</p>' +
			'<p>' + window.popDialog[9].content + '</p>' +
			'</div>';
		var footer = $('<button type="button" class="btn btn-warning" data-dismiss="modal">' + window.popDialog[9].btns[0] + '</button>');
		var $modal = $("#modal");
		$modal.modal({ backdrop: 'static' });
		this.clearModal();
		$modal.find(".modal-body").append(sizeSmallError);
		$modal.find(".modal-footer").append(footer);
		footer.click(function() {
			if(!!window.ActiveXObject || "ActiveXObject" in window) {
				$('#modal').modal('hide');
			} else {
				$("#fileupload").click();
			}
		});
		$modal.modal("show")
	},
	showSmDialog: function(content, callbackClose) {
		if(typeof callbackClose == "undefined") {
			callbackClose = function() {};
		}
		var $smModal = $("#smDialog");
		$smModal.modal({ backdrop: 'static' });
		$smModal.find(".modal-body").empty();
		$smModal.find(".modal-body").append(content);
		$smModal.modal("show").on('hidden.bs.modal', callbackClose);
	},
	show: function(content, callbackClose) {
		if(typeof callbackClose == "undefined") {
			callbackClose = function() {};
		}
		var $modal = $("#modal");
		$modal.modal({ backdrop: 'static' });
		$modal.find(".modal-body").empty();
		$modal.find(".modal-body").append(content);
		$modal.find(".modal-footer").empty();
		$modal.modal('show').on('hidden.bs.modal', callbackClose);
	},
	close: function() {
		$("#modal").modal("hide");
	}

};