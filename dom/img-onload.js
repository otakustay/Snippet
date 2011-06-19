/**
 * 为img元素添加onload事件
 * 
 * @param {Element} img 需要添加onload事件的img元素
 * @param {function} fn onload事件处理函数
 */
function addImgOnload(img, fn) {
    /*
     * 1. Firefox和Opera在图片的响应是404时，对响应进行缓存
     * 2. Firefox和Opera在缓存命中且为404时，不触发事件
     * 3. Firefox和Opera在缓存命中且为404时，complete属性是true
     * 4. Firefox和Safari有naturalWidth/naturalHeight属性，如果图片加载失败返回0
     * 5. Opera的width/height在图片加载失败时返回0，其他浏览器返回以alt属性渲染的文字的宽和高
     * 6. IE对加载失败的图片，complete是false
     */
    var loaded = false;
    img.onload = function(e) {
        if (!loaded) {
            loaded = true;
            fn.call(img, e);
        }
        img.onload = null;
    };
    if (img.complete || img.readyState === 'complete') {
        loaded = true;
        fn.call(img, e);
    }
}