var queueTask = (function() {
    var queues = {};

    /**
     * 调用一个函数，如果该函数不存在，则从指定的script中加载后再调用
     *
     * @param {string} fn 函数的名称
     * @param {string} url 定义函数的脚本所在的URL
     * @param {Array} parameters 调用函数的参数
     */
    return function(fn, url, parameters) {
        if (window[fn]) {
            window[fn].apply(window, parameters);
        }
        else {
            var key = fn + '@' + url;
            var queue = queues[key];

            /*
             * 如果queue已经存在，说明已经开始加载脚本了，只是没加载完，此时不要重复加载
             * 如果queue不存在，说明脚本还没加载过，执行一次加载
             */
            if (!queue) {
                queue = [];

                function executeQueue() {
                    while (queue.length) {
                        var parameters = queue.shift();
                        window[fn].apply(window, parameters);
                    }
                    delete queues[key];
                }

                var script = document.createElement('script');
                var complete = false;
                script.async = true;
                script.src = url;
                script.onload = script.onreadystatechange = function() {
                    if (!complete && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                        complete = true;
                        executeQueue();
                    }
                }

                var placeholder = document.getElementsByTagName('script')[0];
                placeholder.parentNode.insertBefore(script, placeholder);
            }

            queue.push(parameters);
        }
    }
}());