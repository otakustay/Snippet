// @import to-query-string

/**
 * 向服务器发送日志
 *
 * @param {string} url 接收日志的URL
 * @param {Object|undefined} data 日志的内容
 */
function sendLog(url, data) {
    var now = +new Date;
    var key = 'log' + now;
    var img = new Image();

    window[key] = img;
    img.onload = img.onerror = img.onabort = function() {
        /* 
         * 如果这个img很不幸正好加载了一个存在的资源，又是个gif动画
         * 则在gif动画播放过程中，img会多次触发onload
         * 另外IE下onload事件存在内存泄露问题
         */
        img.onload = img.onerror = img.onerror = null;
        delete window[key];
    };

    // 防缓存
    url += (url.indexOf('?') < 0 ? '?' : '&') + '_=' + now;
    // 添加内容
    url += '&' + toQueryString(data);

    img.src = url;
}