//menu部分
$('#option li').on('mouseenter', function(){
	t=$(this);
	timer=setTimeout(function(){
		t.find("div").slideDown();
	},400);
    t.addClass('green');
});
$('#option li').on('mouseleave', function(){
	clearTimeout(timer);
	$(this).find("div").slideUp();
    $(this).removeClass('green');
});
//banner轮播图
//如果要实现轮播图带spot切换，就不能用这种方法，因为改变的是第一个li 的marginLeft
//所以获取不到每一张图片的索引值
//应该是这样吧。。。。
//var timer;
//timer=setInterval(move,5000);
//function move(){
//	$('.banner .back li:first-child').animate({
//			marginLeft:'-1440px'
//		},500,function(){
//			var temp=$('.banner .back li:first-child').clone();
//			$('.banner .back li:first-child').remove();
//			temp.css({marginLeft:'0'});
//			$('.banner .back').append(temp);
//	});
//}
var timer;
var index=1;
//页面加载时开启定时器
addTimer();

function addTimer(){
	var len=$('.banner .back li').length;
	timer=setInterval(function(){
		moveImg(index);
		index++;
		if(index==len){
			index=0;
		}
	},5000);
}
//背景图切换函数
function moveImg(index){
	//无缝滚动
	$('.banner .back').animate({
			marginLeft:-1440*index+"px"
		},500);
	$(".banner .spot li").eq(index).addClass("spoton").siblings().removeClass("spoton");
}
//spot绑定事件函数
function spotOn(index){
	$('.banner .spot li').on('mouseenter',function(){
		$(this).addClass('spoton').siblings().removeClass("spoton");
		index=$(this).index();
		setTimeout(function(){
			$('.banner .back').animate({
					marginLeft:-1440*index+"px"
				},500);
		},300);
	});
	//为什么不用mouseleave而用siblings().removeClass('');是因为绑定mouseleave事件的话
	//只要鼠标离开spot里的li，它的样式就会被清除，然而我们想要的效果是鼠标离开li并且
	//只要还在banner范围内它就不会清除样式，所以选择siblings()水平遍历。(siblings水
	//平遍历原理类似于for循环嵌套,mouseleave类似于onmouseout)
	// $('.banner .spot li').on('mouseleave',function(){
	// 	$(this).removeClass('spoton');
	// });
}
//鼠标移入背景图关闭定时器
$('.banner').on('mouseenter',function(){
	clearInterval(timer);
	//调用spot绑定事件函数
	spotOn(index);
});
//鼠标移出开启定时器
$('.banner').on('mouseleave',function(){
	addTimer();
});
//小广告的无缝滚动
var adTimer;
//定时器开启
adTimer=setInterval(movenext,3000);
//当鼠标移入轮播图时清除定时器并且触发向左向右箭头点击事件
$('#slideshow').on('mouseenter',function(){
	clearInterval(adTimer);
	$('#slideshow .left').click(function(){
		moveprev();
	});
	$('#slideshow .right').click(function(){
		movenext();
	});
});
//鼠标移出时开启定时器
$('#slideshow').on('mouseleave',function(){
	adTimer=setInterval(movenext,3000);
});
//向左轮播函数
function movenext() {
    $("#slideshow .pic li:first-child").animate({marginLeft: "-320px"},800,
	    function(){
	    	var temp=$('#slideshow .pic li:first-child').clone();
	        $('#slideshow .pic li:first-child').remove(); 
	        temp.css({marginLeft:"0"});
		    $("#slideshow .pic").append(temp);
		});
}
//向右轮播函数
function moveprev(){
	var tem=$('#slideshow .pic li:last-child').clone();
	$('#slideshow .pic li:last-child').remove();
	tem.css({marginLeft:"-320px"});
	$('#slideshow .pic').prepend(tem);
	$("#slideshow .pic li:first-child").animate({marginLeft:"0"},800);
}