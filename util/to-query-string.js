/** 
 * 将对象转换为QueryString
 *
 * @param {Object|undefined} data 保存数据的对象
 * @return {string} QueryString，不包括起始的?或&符号
 */
function toQueryString(data) {
    if (!data) {
        return '';
    }

    var query = [];
    // TODO: 内容是数组的话怎么处理
    for (var name in data) {
        if (data.hasOwnProperty(name)) {
            var value = data[name];
            // 数组使用逗号分隔
            if (value instanceof Array) {
                value = value.slice();
                for (var i = 0; i < value.length; i++) {
                    value[i] = encodeURIComponent(value[i]);
                }
                value = value.join(',');
            }
            query[query.length] = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        }
    }

    return query.join('&');
}