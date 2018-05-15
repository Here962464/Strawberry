/**
 * @Author: ZM
 * @Date: 2017/6/11
 * @Last Modified by: ZM
 * @Last Modified time: 2017/6/11
 */
//封装组件
KG.ZM.Slider=(function(){
	var obj=function (options){
		//把Drag的形参当做_setPara的实参
		//封装一个专门处理参数的函数
		this._setPara(options);	
	};
	obj.prototype={
		//修正指针
		constructor: obj,
		//公开接口
		init: function (){
			//样式的初始化     健壮性
			this.setBoxStyle();
			// 小圆点样式的初始化   
			this.setDotFn();
			//向左点击事件
			this.moveLeft();
			//向右点击事件
			this.moveRight();
			//自动播放
			this._autoPlay();
		},
		//小圆点划过改变样式
		spotHover:function(){
			var _this=this;
			this.$slideDotBox.children().off('mouseover').on('mouseover',function(){
				_this.curIndex=$(this).index();
				$(this).addClass('selected').siblings().removeClass('selected');
				_this.moveFn();
			})
		},
		//向左点击事件
		moveLeft:function(){
			if(this.$aSlideArrow.length == 0){
				return;
			}
			var _this=this;	
			this.$aSlideArrow[0].off('click').on('click',function(){	
				if(_this.curIndex<=0){
					_this.curIndex = _this.$oLiLen;
				}
				_this.curIndex--;
				_this.moveFn();	
				if(_this.$slideDotBox){
					_this.$slideDotBox.children().eq(_this.curIndex).addClass('selected').siblings().removeClass('selected');
				}
			});
		},
		//向右点击事件
		moveRight:function(){
			if(this.$aSlideArrow.length == 0){
				return;
			}
			var _this=this;
			this.$aSlideArrow[1].off('click').on('click',function(){
				_this.curIndex++;
				if(_this.curIndex>=_this.$oLiLen){
					_this.curIndex = 0;
				}
				_this.moveFn();
				if(_this.$slideDotBox){
					_this.$slideDotBox.children().eq(_this.curIndex).addClass('selected').siblings().removeClass('selected');
				}
			});
		},
		//移动函数
		moveFn:function(){
			this.moveLen = this.$slideBox.width();
			var _this=this;
			this.$slideBox.children('ul').animate({
				'left':-_this.moveLen * _this.curIndex
			},_this.moveSpeed);
		},
		//小圆点样式的初始化
		setDotFn:function(){
			if(this.$slideDotBox == null){
				return;
			}
			var str = '';
			for (var i = 0; i < this.$oLiLen; i++){
				str += '<dd></dd>';
				if (i == this.curIndex){ // 当前的小圆点儿是选中的
					str = '<dd class="selected"></dd>'
				}		
			}
			this.$slideDotBox.append(str);
			//小圆点划过改变样式
			this.spotHover();
		},
		// Box样式的初始化 
		setBoxStyle:function(){
			this.$slideBox.css({
				'overflow':'hidden',
				'position':'relative'
			}).children('ul').css({
				'width':10000,
				'position':'absolute'
			});
		},
		//自动播放
		_autoPlay:function(){
			if(!this.autoPlay){
				return;
			}
			var _this=this;
			this.timer = setInterval(function(){
				_this.curIndex++;
				if(_this.curIndex>=_this.$oLiLen){
					_this.curIndex = 0;
				}
				_this.moveFn();
				if(_this.$slideDotBox){
					_this.$slideDotBox.children().eq(_this.curIndex).addClass('selected').siblings().removeClass('selected');
				}
			},_this.interval);
			this.clearTimer();
		},
		//清除定时器
		clearTimer:function(){
			var _this=this;
			this.$slideBox.off('mouseover').on('mouseover',function(){
				clearInterval(_this.timer);
			});
			this.$slideBox.off('mouseout').on('mouseout',function(){
				_this._autoPlay();
			});
		},
		//设置参数
		_setPara:function (option){
			this.$slideBox = option.$slideBox;
			this.$slideDotBox = option.$slideDotBox || null;
			this.$aSlideArrow = option.$aSlideArrow || [];
			this.curIndex = option.curIndex || 0;
			this.autoPlay = option.autoPlay || false;
			this.callback = option.callback || null;
			this.interval = option.interval || 3000;
			this.moveSpeed = option.moveSpeed || 500;
			this.timer = null;	
			this.$oLiLen = this.$slideBox.children('ul:first').children().length; 
		},
		//回调函数
		remove:function(){//组件移除
			
		}
	};
	return obj;
})();

// 调用的示例
//var oSlider = new KG.WYJ.Slider({
//	$slideBox: $('.slider'),
//	$slideDotBox: $('.slider > dl'), // 可选参数
//	$aSlideArrow: [$('.left_btn'), $('.right_btn')], // 可选参数
//	curIndex: 0,// 可选参数
//	autoPlay: true,//必传参数
//	interval:3000,//图片播放间隔 // 可选参数
//	moveSpeed:1000, //图片移动速度// 可选参数
//	callback: function(){// 可选参数
//		
//	}
//});
//oSlider.init();