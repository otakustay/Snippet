/**
 * 将QueryString转换为键值对象
 *
 * @param {string=} query QueryString对象
 * @return {Object} 存放QueryString中的键值对的对象
 */
function parseQueryStrng(opt_query) {
    var query = opt_query || window.location.search;
    var result = {};
    var pairs = query.split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        var name = decodeURIComponent(pair[0]);
        
        var value;
        // 对于a=1&b&c=2的形式，认为是空参数，其值为true（参考HTML中如readonly、checked之类的空属性）
        if (pair.length < 2) {
            value = true;
        }
        // 如果存在a=1,2,3的形式，认为是数组
        else {
            value = pair[1].split(',');
            for (var k = 0; k < value.length; k++) {
                value[k] = decodeURIComponent(value[k]);
            }
        }

        // 如果存在a=1&a=2的形式，认为是数组
        if (result.hasOwnProperty(name)) {
            var originalValue = result[name];
            result[name] = (originalValue instanceof Array ? originalValue : [originalValue]).concat(value);
        }
    }
}