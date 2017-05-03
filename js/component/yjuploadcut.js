/**
 * 游记编辑搜索下拉框 
 * 
 * 参数说明:
 * 
 *  依赖:
 * 		<link rel="stylesheet" href="libs/bootstrap/bootstrap.min.css">
 *		<link rel="stylesheet" href="libs/cropper/cropper.css">
 *		<link rel="stylesheet" href="uploadcutimg.css">
 * 
 * 
 * 		<script type="text/javascript" src="libs/vue-2.26.js"></script>
 * 		<script type="text/javascript" src="libs/jquery.min.v2.1.4.js"></script>
 *
 *		<!--上传图片-->
 *		<script type="text/javascript" src='libs/jquery.ui.widget.js'></script>
 *		<script type="text/javascript" src="libs/jquery.fileupload.js"></script>
 *		<!-- 将图片base64读取到页面上 -->
 *		<script type="text/javascript" src="libs/exif.js"></script>
 *		<!-- 剪裁图片 -->
 *		<script type="text/javascript" src="libs/tether.min.js"></script>
 *		<script type="text/javascript" src="libs/bootstrap/bootstrap.min.js"></script>
 *		<script type="text/javascript" src="libs/cropper/cropper.js"></script>
 *		<script type="text/javascript" src="ucVueComponent.js"></script>
 *
 * 	支持：ie10+,firfox,chorme
 *  兼容问题：canvas 不兼容ie9 cropper.js 不兼容ie9
 *  
 *  使用示例：
 * Created by xujia on 2017/4/16.
 */
Vue.component('yjuploadcut-component', {
	props: ["imgurl"],
	data: function() {
		return {
			serverUrl: "http://127.0.0.1:808",
			// 提交图片按钮
			inputfile: "div.head-img a",
			// 剪裁图片显示的modal
			cutmodal: "#cover-modal",
			// 剪裁图片显示的modal中的图片
			cutimg: "#cover-modal div.modal-body img",
			
			// 图片url
			imgUrl:null,
			// 设置图片url
			imgUrlStyle:"",
			// 上传图片按钮名称
			uploadImgName:""
		}
	},
	template: '' +
		'<div>' +
		'	<div class="head-img clearfix" v-bind:style="imgUrlStyle">' +
		'		<img v-show="imgUrl==null" src="img/headerImgIcon.png" alt="" class="fl">' +
		'		<div class="fl text" v-show="imgUrl==null">' +
		'			<p style="font-size: 16px">设置游记封面</p>' +
		'			<p>游记封面将会展示在列表页中，请认真选择哦～</p>' +
		'		</div>' +
		'		<a href="javascript:void(0);">{{uploadImgName}}' +
		'			<input name="upload_filename" type="file" accept=".jpg,.png,.bmp,jpeg">' +
		'		</a>' +
		'	</div>' +
		'	<div class="modal fade" id="cover-modal" aria-labelledby="modalLabel" data-backdrop="static" role="dialog" tabindex="-1">' +
		'		<div class="modal-dialog" role="document">' +
		'			<div class="modal-content">' +
		'				<div class="modal-body" style="margin: 0px; padding: 0px;">' +
		'					<div>' +
		'						<img src="">' +
		'					</div>' +
		'				</div>' +
		'			</div>' +
		'		</div>' +
		'	</div>' +
		'</div>',
	created: function() {
		this.imgUrl = this.imgurl;
		this.imgUrlStyle = 'background-image:url(' + this.imgurl + ')';
		this.uploadImgName = this.imgUrl ? "更改封面":"设置封面";
	},
	mounted: function() {
		this.self = this;
		var cutmodal = this.cutmodal;
		var inputfile = this.inputfile;
		var cutimg = this.cutimg;

		// 绑定图片剪裁页面展示事件
		this.$options.methods.bindShowModal(this);

		var self = this;
		// 绑定上传图片展示事件
		$(this.inputfile).on("change", "input[type='file']", function(event) {
			self.$options.methods.loadlocalPic(event, function(imgUrl) {
				$(cutimg).attr('src', imgUrl);
				$(cutmodal).modal('show');
			});
			var parent = $(this).parent();
			var html = parent.html();
			parent.html('');
			parent.append(html);

		});
	},
	methods: {
		/**
		 * 保存处理
		 * @param {Object} base64data
		 * @param {Object} uploadUrl
		 */
		save: function(self, base64data) {
			var uploadUrl = self.serverUrl + "/upload/uploadforbase64";
			self.$options.methods.saveBase64Pic(base64data, uploadUrl, function(imgUrl) {
				self.imgUrl = imgUrl;
				self.imgUrlStyle = 'background-image:url(' + imgUrl + ')';
				self.uploadImgName = "设置封面";

			});
		},
		/**
		 * 将图片保存至服务器
		 * @param {Object} base64data
		 * @param {Object} callBackSuccess
		 */
		saveBase64Pic: function(base64data, uploadUrl, callBackSuccess) {
			//			callBackSuccess(base64data);
			//			return;
			$.ajax({
				url: uploadUrl,
				dataType: "json",
				type: "post",
				async: true,
				data: { picData: base64data },
				success: function(data) {
					if(data && data.returncode == 0) {
						if(typeof callBackSuccess != "undefined" &&
							typeof callBackSuccess == "function") {
							var imgUrl = data.result;
							callBackSuccess(imgUrl);
						}
					}
				},
				error: function(a, b) {
					console.log(a);
				}
			});
		},
		/**
		 * 读取本地图片并显示出来
		 * @param {Object} event 上传控件事件
		 * @param {Object} callback
		 * @param {Object} msgCallback
		 */
		loadlocalPic: function(event, callback, msgCallback) {
			var files = event.target.files;
			if(!(files && files.length > 0))
				return;

			try {
				//读取exif信息进行处理
				EXIF.getData(files[0], function() {

					//获取目前上传的文件
					var file = this;
					var imgInfo = file.name.split('.');

					//图片旋转
					var extensions = imgInfo[imgInfo.length - 1].toLowerCase();
					// 文件类型校验
					if(utils.UPLOAD_IMG_TYPE.indexOf(extensions) === -1) {
						popup.popPicTypeCheckFail();
						return false;
					}

					/**
					 * 图片文件读取事件
					 * @param {Object} e
					 */
					function onImageLoad(e) {
						var image = this;
						var width = image.width;
						var height = image.height;

						//高度或宽度大于9999或文件大小大于20M.宽度小于670 高度小于377
						if(width > 9999 || height > 9999 || file.size > 20971520) {
							popup.popPicCheckFail();
							return false;
						} else if(width < 670 || height < 377) {
							popup.sizeSmallError();
							return false;
						}

						// 获取 window 的 URL 工具
						var URL = window.URL || window.webkitURL;
						// 通过 file 生成目标 url
						var imgURL = URL.createObjectURL(file);

						if(callback !== undefined && callback !== null) {
							callback(imgURL);
						}
					}

					var reader = new FileReader();
					// 设置文件读取事件函数
					reader.onload = function(e) {
						var image = new Image();
						// 设置读取文件事件函数
						image.onload = onImageLoad;
						// 读取将文件内容赋值给img对象
						image.src = e.target.result;
					};
					// 读取文件
					reader.readAsDataURL(file);
				});
			} catch(e) {
				console.log(e);
			}
		},
		/**
		 * 将图片剪裁，并上传服务器
		 */
		bindShowModal: function(self) {
			var cutmodal = self.cutmodal;
			$(cutmodal).on('shown.bs.modal', function() {
				var $modal = $(this);
				var $image = $modal.find('div.modal-body img');
				$image.cropper({
					aspectRatio: 16 / 9,
					background: false,
					guides: false,
					zoomable: false,
					mouseWheelZoom: false,
					touchDragZoom: false,
					minCropBoxWidth: 500,
					minCropBoxHeight: 230,
					dragMode: 'none',
					checkImageOrigin: false,
					viewMode: 1,
					crop: function(e) {
						var targetEle = $modal.find('div.cropper-crop-box');
						var width = Math.floor(targetEle.width());
						var height = Math.floor(targetEle.height());
						$modal.find('span.crop-width').html(width);
						$modal.find('span.crop-height').html(height);

					},
					ready: function() {
						$modal.find(".cropper-crop-box").append('<div class="crop-size"><span class="crop-width">0</span> X <span class="crop-height">0</span></div>');
						$modal.find(".cropper-crop-box").append('<div class="form-groups crop-btns"><button type="button" class="btn btn-cancel close-modal" data-dismiss="modal">取消</button><button type="button" class="btn btn-complete">确定</button></div>');
						$modal.find('button.btn-complete').on('click', function() {
							var croppedCanvas = $image.cropper('getCroppedCanvas');
							var base64data = croppedCanvas.toDataURL();
							self.$options.methods.save(self, base64data);
							$modal.modal('hide');
						});
					}
				});
			}).on('hidden.bs.modal', function() {
				var $image = $(this).find('div.modal-body img');
				$image.cropper('destroy');
			});
		}
	}
})
