const btnpr={
    bind: function (el, binding, vnode) {
        console.log('action-------------',binding.modifiers);
        // 获取页面按钮权限
        // let btnPermissionsArr = vnode.context.$route.meta.btnPermissions;
        //AD：管理员 CN：普通账户 TS：游客
        let btnPermissionsArr = ['AD','CN','TS'];
        if (!has(btnPermissionsArr)) {
            if(!binding.modifiers){  
                // el.parentNode.removeChild(el);
                //没有权限没有修饰符默认删除
                el.style.display="none";
            }else if(binding.modifiers.dis){
                //禁用
                el.setAttribute("disabled",true);
                el.style.cursor="not-allowed";
            }
           
        }
    }
}

// 权限检查方法
function has(value) {
    let isExist = false;
    // 获取用户按钮权限
    // let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
    let btnPermissionsStr = 'AC'
    if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
        return false;
    }
    if (value.indexOf(btnPermissionsStr) > -1) {
        isExist = true;
    }
    return isExist;
};

export default btnpr;