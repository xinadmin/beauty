/**
 * Created by shentao on 2018/2/10.
 */
(function(){
    //定义一个公共函数，方便获取dom元素
    function $_(name){
        return document.querySelectorAll(name);
    }
    var mslider=function(option){
        //设置默认参数
        this.defaultopt={
            slideCell:".wrap",
            mainCell:".box",
            interTime:1000,
            autoPlay:false//自动播放
        }
        //判断传入的opts是否有默认参数中的值，如果默认参数值不存在opts中
        //就把默认参数加进opts中,这样就不会把默认参数修改了
        option=option||this.defaultopt;
        for(var k in this.defaultopt){
            if(!option[k]){
                option[k]=this.defaultopt[k];
            }
        }
        this.option=option;
        this.timer=null;//定义一个定时器变量
        this.wrap=$_(this.option.slideCell)[0];//最外层容易，显示当前的图片
        this.box=$_(this.option.mainCell)[0];//轮播图片的包裹层
        this.ali=$_(this.option.mainCell+" li");//轮播图片集合
        this.len=this.ali.length;//轮播图片的数目
        this.aliWidth=parseInt(getComputedStyle(this.wrap).width);//每个图片的宽度
        this.aliHeight=parseInt(getComputedStyle(this.ali[0]).height);//每个图片的告诉
        this.iNow=0;//当前显示第几张图片
        this.int();//执行初始化函数
    }
    mslider.prototype={
        constructor:mslider,
        int:function(){
            var _this=this;
            this.createNode();
            this.addEvent();
            if(this.option.autoPlay==true){
                this.timer=setInterval(_this.auto_play(),this.option.interTime)
            }
            this.create_page();//自动分页
        },
        //包裹曾头部尾部增加一个节点，方便实现无缝切换，做一些初始化样式设置
        createNode:function(){
            var _this=this;
            var nodeBefore=this.ali[0].cloneNode(true);
            var nodeAfter=this.ali[this.len-1].cloneNode(true);
            _this.box.appendChild(nodeBefore);
            _this.box.insertBefore(nodeAfter,this.ali[0]);
            this.newLen=$_(this.option.slideCell+" >ul li").length;
            this.box.style.cssText="width:"+this.newLen*this.aliWidth+"px;"+"position:absolute;"+" left:"+(-this.aliWidth)+"px";
            this.wrap.style.cssText="height:"+this.aliHeight+"px";
           for(var i=0;i<this.newLen;i++){
              var oli=$_(this.option.mainCell)[0].children[i];
              oli.style.cssText="float:left;"+"width:"+this.aliWidth+"px";
            }
        },
        //创建
        create_page:function(){
            var _this=this;
            //生成自动分页的导航
            if(this.option. autoPage==true){
                var ali="";
                for(var i=0;i<this.len;i++){
                    ali+="<li>"+(i+1)+"</li>";
                }
                var oul=$_(this.option.titCell)[0];
                oul.innerHTML=ali;
            }
            this.tit=$_(this.option.titCell+" li");
            this.tit[_this.iNow].className="on";
            for(var i=0;i<this.tit.length;i++){
                this.tit[i].pos=i;
                this.tit[i].onclick=function(){
                    clearInterval(_this.timer);
                    var currNum=this.pos;
                    var dir=currNum-_this.iNow;
                    if(_this.state==true){
                        _this.handle();
                    }
                    else{
                        _this.startOffset=_this.box.offsetLeft;
                    }
                    _this.animate(-_this.aliWidth*dir);
                    _this.iNow=currNum;

                }
            }
        },
        //处理动画没有结束滑动的bug
        handle:function(){
            var _this=this;
            clearInterval(_this.transition);
            _this.endX=_this.endX<=-(_this.newLen-1)*_this.aliWidth?-(_this.aliWidth):_this.endX;
            _this.endX=_this.endX>=0?-(_this.newLen-2)*_this.aliWidth:_this.endX;
            _this.startOffset=_this.endX;
        }
        ,
        //添加滑动事件
        addEvent:function(){
            var _this=this;var startX=0;this.startOffset=-_this.aliWidth;var movex=0;this.endX=0;this.state=false;
            _this.wrap.addEventListener("touchstart",start,false);
            _this.wrap.addEventListener("touchmove",move,false);
            _this.wrap.addEventListener("touchend",end,false);
            function start(e){
                var e=e||window.event;
                clearInterval(_this.timer);
                if(_this.state==true){
                    _this.handle();
                }
                else{
                    clearInterval(_this.transition);
                    startX= e.touches[0].clientX;
                    _this.startOffset=_this.box.offsetLeft;
                }
            }
            function move(e){
                var e=e||window.event;
                _this.movex= e.touches[0].clientX-startX;
                _this.box.style.left=_this.startOffset+_this.movex+"px";
            }
            function end(e){
                var left = _this.box.offsetLeft;
                var currNum = left/_this.aliWidth;
                var pointX=left%_this.aliWidth;
                if(_this.movex<0){
                    if(Math.abs(_this.movex)<30){
                        _this.animate(0)
                    }
                    else{
                        _this.animate(-_this.aliWidth)
                    }
                }
                else{
                    if(Math.abs(_this.movex)<30){
                        _this.animate(0)
                    }
                    else{
                        _this.animate(_this.aliWidth)
                    }
                }
            }
        },
        //封装一个动画函数
        animate:function(offset){
            var _this=this;var interval=10;_this.state=true;_this.endX=_this.startOffset+offset;

            var offsetX=(_this.endX-_this.startOffset)/this.aliWidth;
                _this.tit[_this.iNow].className="";
                _this.iNow-=offsetX;
                _this.iNow=_this.iNow>=5?0:_this.iNow;
                _this.iNow=_this.iNow<0?4:_this.iNow;
                _this.tit[_this.iNow].className="on";
            _this.transition=setInterval(move,10);
            function move(){
                var speed=(_this.endX-_this.box.offsetLeft)/20;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                if(parseInt(_this.box.style.left)==-(_this.newLen-1)*_this.aliWidth){
                    _this.box.style.left=-(_this.aliWidth)+"px";
                    _this.endX=-(_this.aliWidth);
                }
                if(parseInt(_this.box.style.left)==0){
                    _this.box.style.left=-(_this.newLen-2)*_this.aliWidth+"px";
                    _this.endX=-(_this.newLen-2)*_this.aliWidth;
                }
                _this.box.style.left=_this.box.offsetLeft+speed+"px";
                if(speed==0){
                    clearInterval(_this.transition);
                      if(_this.option.autoPlay==true){
                        clearInterval(_this.timer);
                          _this.timer=setInterval(_this.auto_play(),_this.option.interTime)
                    }
                    _this.box.style.left=_this.endX+"px";
                    _this.state=false;
                }
            }
        },
        //设置自动播放
        auto_play:function(){
            var _this=this;
            return function(){
                     clearInterval(_this.timer);
                    _this.startOffset=_this.box.offsetLeft;
                    _this.animate(-_this.aliWidth);

            }
        }

    }
    window.mslider=mslider;//暴露给全局，方便调用
})();