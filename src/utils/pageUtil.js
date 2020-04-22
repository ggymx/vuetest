//自适应设置
console.log('动态设置rem和px比例');
let page = {
  //设置html字号
  setHtmlFontSize: function (doc, win) {
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' :
      'resize'; //orientationchange设备旋转 resize调整浏览器窗口的大小
    var recalc = function () {
      var clientWidth = docEl.clientWidth; //设备
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 1280) + 'px'; //换算 
      console.log('设备分辨率---------', clientWidth);
      console.log(docEl.style.fontSize);
    };

    if (!doc.addEventListener) return;
    /*添加事件监听器：监听分辨率变化，执行recalc*/
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false); //火狐加载DOMContentLoaded，优先于load
  }
}

page.setHtmlFontSize(document, window);