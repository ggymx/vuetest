//切换皮肤
const Skin = {
  getCss: function () {
    let template=localStorage.getItem("template") || '001';
    console.log('更换皮肤----------',template);
    return require("../assets/theme/"+template+"/"+template+".less");
    // let link=document.createElement('link');
    // link.setAttribute('type','text/css');
    // link.setAttribute('rel','stylesheet')
    // link.setAttribute('href',"../assets/theme/"+template+"/"+template+".css");
    // link.setAttribute('id','skin');
    // document.getElementsByTagName('head')[0].appendChild(link);
  },
  setCss: function (template) {
    localStorage.setItem("template",template);
     location.reload();
  },
  getImg: function () {},
  setImg: function () {}
}

export default Skin;