/**
 * 检查父页面通过操控iframe是否需要iframe的document.domain和父页面完全一致
 *
 * @return {boolean} 如果需要iframe和父页面的document完全一致才可访问iframe，则返回true
 */
var shouldIframeDomainMatch = function() {
    var doc = document
    var iframe = doc.createElement('iframe');
    var result = false;
    
    /*
     * 如果只访问某个属性，但不作操作的话，这一段会被closure compiler压得消失
     * 所以加个函数，closure compiler默认所有函数都有side effect，不会被压缩
     * 最好不要换别的写法，不然这个函数会被压缩成只返回false
     * @FUCK
     */
    function checkPermissionViolation(iframe) {
        try {
            return !iframe.contentWindow.document;
        }
        catch (ex) {
            return true;
        }
    }
    
    iframe.src = 'about:blank';
    doc.body.insertBefore(iframe, doc.body.firstChild);

    result = checkPermissionViolation(iframe);
    
    doc.body.removeChild(iframe);
    
    /*
     * 由于IE下建iframe检测，又有一个try/catch，效率是比较低的，所以做成惰性函数
     * 但此处理要求在该函数被运行前，document.domain就已经修改，否则无效
     */
    shouldIframeDomainMatch = function() { return result; };
    return result;
};