//权限控制

import router from './router'
import store from './store'
import { getToken,setUserAccount, removeUserAccount, setUserId, removeUserId, getAccessToken,removeAccessToken,removeToken,removeRefreshToken,removeOldToken } from '@/util/auth'
import * as authUtils from '@/util/auth'
import {getButtonPermissions, setButtonPermissions, hasPermission} from '@/util/publicData'
import {getUserInfo} from "@/api/login";
import {getUserFunctions} from "@/api/manage/roleFunc";
import {getSystemToken} from "@/api/manage/token.js";
import Notify from '@/plugins/notify';

function canTo(to,from,next){//判断是否有条件前往
	next && next();
	if(to.query&&to.path==from.path){
		location.reload();
	}
}
router.beforeEach((to, from, next) => {
	/*
		to: 路由即将跳到哪
		from: 从哪个路由来
		next(): 不破坏路由跳转，按照之前的路由正常跳转
		next('/path'): 破坏原来的跳转，跳到新的路由/——/——
	 */
	if(to && to.query) {
		localStorage.setItem('url', location.href.replace(location.host, "localhost:8080"))
		if(to.query.account) {
			authUtils.setUserAccount(to.query.account)
		}
		/*
		if(to.query.userId) {
			authUtils.setUserId(to.query.userId)
		}
		*/
		if(to.query.appToken) {
			authUtils.setAccessToken(to.query.appToken)
		}
		if(to.query.uaaToken) {
			authUtils.setOldToken(to.query.uaaToken)
			authUtils.setToken(to.query.uaaToken)
   			authUtils.setRefreshToken(to.query.uaaToken)
   			getSystemToken({
				uaaToken: to.query.uaaToken
   			}).then(rs => {
   				if(rs && rs.access_token && rs.refresh_token) {
					//替换为新的token
					authUtils.setToken(rs.access_token)
					authUtils.setRefreshToken(rs.refresh_token)
					getUserInfo().then(result => {
						if(result && result.userExtInfo && result.userExtInfo.userId) {
							authUtils.setUserId(result.userExtInfo.userId)
						}
						//获取当前登陆用户权限
						getUserFunctions().then(response => {
							if(response.data && response.data.length) {
								let auth = response.data.filter(_ => _.isOn !== 0).map(_ => _.code)
								localStorage.setItem('buttonPermissions', JSON.stringify(auth))
								setButtonPermissions(auth)
								let link = getHomePage()
								goRouter(to, from, (link ? next(link) : next))
							} else {
								Notify.init('您当前没有任何权限，请联系管理员～', {hideOnly: false}, function() {
									location.href = stage.home[process.env['SERVE_ENV']]
								});
							}
						}, error => {
							Notify.init('您当前没有任何权限或者token已失效，请重新登陆～', {hideOnly: false}, function() {
								location.href = stage.home[process.env['SERVE_ENV']]
							});	
						})
					}, error => {
		    			Notify.init('您当前没有任何权限或者token已失效，请重新登陆～', {hideOnly: false}, function() {
							location.href = stage.home[process.env['SERVE_ENV']]
						});	
		    		})
				} else {
					Notify.init('您当前没有任何权限或者token已失效，请重新登陆～', {hideOnly: false}, function() {
						location.href = stage.home[process.env['SERVE_ENV']]
					});	
				}
    		}, error => {
    			Notify.init('您当前没有任何权限或者token已失效，请重新登陆～', {hideOnly: false}, function() {
					location.href = stage.home[process.env['SERVE_ENV']]
				});	
    		})
		} else {
			goRouter(to, from, next)
		}
	}
})

function goRouter(to, from, next) {
	// 正常token 逻辑
	if (getAccessToken() != null && getToken() != null) {
		//是否拥有权限
		let buttonPermissions = getButtonPermissions()
		if(buttonPermissions && buttonPermissions.length) {
			canTo(to,from,next);
		} else {
			let permissions = localStorage.getItem('buttonPermissions')
			if(permissions && JSON.parse(permissions).length) {
				setButtonPermissions(JSON.parse(permissions))
				canTo(to,from,next);
			} else {
				Notify.init('您当前没有任何权限，请联系管理员～', {hideOnly: false}, function() {
					location.href = stage.home[process.env['SERVE_ENV']]
				});
			}
		}
	} else {
		Notify.init('token失效，请重新登陆～', {hideOnly: false}, function() {
			location.href = stage.home[process.env['SERVE_ENV']]
		});	
		//next("/login")
	}
	
	setTimeout(()=>{
		$("svg title").remove();//处理掉svg文件里的title
	},1000);
}

function getHomePage() {
	let link = null
	//根据权限，配置默认首页
	if(hasPermission(['RB3'])) {
		link = '/system/rolelist'
	}
	if(hasPermission(['RB1'])) {
		link = '/system/userlist'
	}
	if(hasPermission(['RB2'])) {
		link = '/system/orglist'
	}
	if(hasPermission(['RC1/C'])) {
		link = '/record/list'
	}
	if(hasPermission(['RA1/A8'])) {
		link = '/report/list'
	}
	if(hasPermission(['RA1/A'])) {
		link = '/assets/list'
	}
	return link
}

//路由结束操作
router.afterEach(() => {})
