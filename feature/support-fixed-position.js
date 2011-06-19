/**
 * 判断是否支持position:fixed
 *
 * @return {boolean} 如果当前浏览器支持position:fixed则返回true
 */
function supportFixedPosition() {
    var doc = document;
    /*
     * 使用如下结构：
     * <div style="position: absolute; top: 200px;"> <== outer
     *     <div style="position: fixed; top: 100px;"></div> <== inner
     * </div>
     *
     * 如果浏览器支持fixed，由于fixed是相对于document定位的，因此无论body样式如何，top始终是100px
     * 如果浏览器不支持fixed，被解释为static，则inner的top是无效的，其top和outer相同
     */
    var outer = doc.createElement('div');
    var inner = doc.createElement('div');
    var result = false;

    outer.style.position = 'absolute';
    outer.style.top = '200px';

    inner.style.position = 'fixed';
    inner.style.top = '100px';

    outer.appendChild(inner);
    doc.body.insertBefore(outer, doc.body.firstChild);

    if (inner.getBoundingClientRect && 
        inner.getBoundingClientRect().top !== outer.getBoundingClientRect().top) {
        result = true;
    }

    doc.body.removeChild(outer);

    // 考虑到脚本可能在head中被引用，此时没有body，因此只能做成函数，使用惰性函数提升效率    
    supportFixedPosition = function() { return result; };
    
    return result;
};