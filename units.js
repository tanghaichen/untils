//1-->实现类似于广告那种可以在滑动屏幕的时候圆滑的fixed到固定位置。
Object.prototype.tFixedAside = function(topq) {
    var demo = this;
    demo.style.position = 'absolute';
    demo.style.top = topq + 'px';
    var dTop = demo.offsetTop;
    var leader = 0;
    var target = 0;
    var stop;
    window.onscroll = function() {
        // console.log(document.body.scrollTop)//被卷入的高度
        clearInterval(stop)
        target = document.body.scrollTop + dTop; //最新的target
        stop = setInterval(function() {
            leader = leader + (target - leader) / 10;
            demo.style.top = leader + 'px';
        }, 20)
    }
}

//2-->实现在滚动到它的位置时固定在顶部。
Object.prototype.tFixedNav = function() {
    var nav = this;
    var navtop = nav.offsetTop;
    var marginTop = getComputedStyle(nav).marginTop;
    window.onscroll = function() {
        if (document.body.scrollTop >= navtop) {
            nav.style.marginTop = 0;
            nav.style.position = 'fixed';
            nav.style.zIndex = 99999;
            nav.style.top = 0;
        } else {
            nav.style.position = 'static';
            nav.style.marginTop = marginTop;
        }
    }
}


//3-->文字逐个显示并切换下一个
function fun() {
    wenzi = news[tNews];
    qianzhui = target[tNews];
    if (tTxti >= wenzi.length) {
        clearInterval(tNextItem);
        clearInterval(tNextText);
        tNews++;
        if (tNews >= news.length) {
            tNews = 0
        }
        tNextText = setInterval('fun()', 2000);
        tTxti = 0;
        return;
    }
    clearInterval(tNextItem);
    tDemo.href = qianzhui;
    tDemo.innerHTML = wenzi.substring(0, tTxti + 1);
    tTxti++;
    tNextItem = setInterval("fun()", 100);
}


Object.prototype.tHotNews = function(news,target) {
    tDemo = this;
    var tar = []

    tNews = 0;
    tTxti = 0;
    for (var i = 0; i < _default.news.length; i++) {
        tar.push('#')
    }
    news = _default.news;
    target = _default.target;
    for (var i = 0; i <_default.news.length- target.length; i++) {
    	target.push('#')
    }
    tNextItem = null;
    tNextText = null;

        fun();
}
