function Until() {}
Until.prototype = {
    contructor: Until,
    //1-->实现类似于广告那种可以在滑动屏幕的时候圆滑的fixed到固定位置。
    tFixedAside: function(div) {
        var demo = div;

        function offset(curEle) {
            var totalLeft = null,
                totalTop = null,
                par = curEle.offsetParent;

            totalLeft += curEle.offsetLeft;
            totalTop += curEle.offsetTop;
            while (par) {
                if (navigator.userAgent.indexOf("MSIE 8.0") === -1) { //不在ie8
                    totalLeft += par.clientLeft;
                    totalTop += par.clientTop;
                    //累加边框
                }
                totalLeft += par.offsetLeft;
                totalTop += par.offsetTop;

                par = par.offsetParent;
            }
            return { left: totalLeft, top: totalTop }
        }
        var dTop = offset(demo).top;
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

    },
    //2-->实现在滚动到它的位置时固定在顶部。
    tFixedNav: function(div) {
        var nav = div;
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
    },
    //3-->文字逐个显示并切换下一个
    tHotNews: function(div, options) {
        tDemo = div;
        var tar = [];
        _default = {
            news: ['这里是默认文字1', '这里是默认文字2', '这里是默认文字3'],
            target: tar,
            everyItem: 2000,
            everyText: 100

        }
        tNews = 0;
        tTxti = 0;
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }
        for (var i = 0; i < _default.news.length; i++) {
            tar.push('#')
        }
        news = _default.news;
        target = _default.target;
        everyItem = _default.everyItem;
        everyText = _default.everyText;
        for (var i = 0; i < _default.news.length - target.length; i++) {
            target.push('#')
        }
        tNextItem = null;
        tNextText = null;
        fun();

        function fun() {
            var wenzi = news[tNews];
            var qianzhui = target[tNews];
            if (tTxti >= wenzi.length) {
                clearInterval(tNextText);
                clearInterval(tNextItem);
                tNews++;
                if (tNews >= news.length) {
                    tNews = 0
                }
                tNextItem = setInterval(arguments.callee, everyItem);
                tTxti = 0;
                return;
            }
            clearInterval(tNextText);
            tDemo.href = qianzhui;
            tDemo.innerHTML = wenzi.substring(0, tTxti + 1);
            tTxti++;
            tNextText = setInterval(arguments.callee, everyText);
        }
    },

}


var until = new Until();
