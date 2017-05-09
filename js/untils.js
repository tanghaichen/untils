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
    //4-->倒计时
    tcountDown: function(div, options, off) {
        var demo = div;
        var _default = {
            year: 2100,
            month: 12,
            day: 31,
            hour: 23,
            minute: 59,
            second: 59
        }
        if (off === undefined) {
            var off = '[好日子]';
        }
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }
        if (_default.year < 2017) {
            console.log('今年已经是2017年啦');
            return false
        }
        if (_default.month > 12) {
            console.log('月份不能大于12');
            return false
        }
        if (_default.day > 31) {
            console.log('日期不能大于31');
            return false
        }
        if (_default.hour > 23) {
            console.log('hour不能大于24');
            return false
        }
        if (_default.minute > 59) {
            console.log('minute不能大于60');
            return false
        }
        if (_default.second > 59) {
            console.log('second不能大于60');
            return false
        }
        var future = new Date(_default.year, _default.month - 1, _default.day, _default.hour, _default.minute, _default.second);
        setInterval(function() {
            var now = new Date();
            var hao = future - now;
            var seconds = hao / 1000;
            var day = parseInt(seconds / (24 * 60 * 60));
            var nowsecond = seconds % (24 * 60 * 60);
            var hour = parseInt(nowsecond / (60 * 60));
            var hours = nowsecond % (60 * 60);
            var minute = parseInt(hours / 60);
            var minutes = hours % 60;
            var second = parseInt(minutes % 60);
            demo.innerHTML = "距离" + off + "还有" + day + '天' + hour + '时' + minute + '分' + second + '秒';
        }, 300);
    },
    tBackTop: function(div) {
        //5-->点击回到顶部
        var goLink = div;
        goLink.style.cursor = 'pointer'
        goLink.style.display = 'none';
        window.onscroll = computedDisplay;

        function computedDisplay() {
            var curTop = document.documentElement.scrollTop || document.body.scrollTop;
            var curHeight = document.documentElement.clientHeight || document.body.clientHeight;
            goLink.style.display = curTop > curHeight / 2 ? 'block' : 'none';
        }
        goLink.onclick = function() {
            window.onscroll = null;
            this.style.display = 'none'
            var duration = 500,
                interval = 10,
                target = document.documentElement.scrollTop || document.body.scrollTop;
            var step = (target / duration) * interval;
            var timer = window.setInterval(function() {
                var curTop = document.documentElement.scrollTop || document.body.scrollTop;
                // console.log(curTop)
                if (curTop === 0) {
                    // console.log(2);
                    curTop = 0;
                    window.clearInterval(timer);
                    window.onscroll = computedDisplay;
                    return;
                }
                curTop -= step;
                document.documentElement.scrollTop = curTop;
                document.body.scrollTop = curTop;
            }, interval);
        }
    },


}


var until = new Until();
