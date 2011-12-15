/**
 * 获取flash插件版本号
 * 
 * @return {string}
 */
function getFlashVersion() {
    //摘自tangram的baidu.swf.version实现
    if (navigator.plugins && navigator.mimeTypes.length) {
        var plugin = navigator.plugins['Shockwave Flash'];
        if (plugin && plugin.description) {
            return plugin.description
                    .replace(/([a-zA-Z]|\s)+/, '')
                    .replace(/(\s)+r/, ".") + '.0';
        }
    }
    else if (window.ActiveXObject && !window.opera) {
        for (var i = 10; i >= 2; i--) {
            try {
                var c = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i);
                if (c) {
                    var version = c.GetVariable("$version");
                    return version.replace(/WIN/g,'').replace(/,/g,'.');
                }
            }
            catch(e) {}
        }
    }
    return '';
}