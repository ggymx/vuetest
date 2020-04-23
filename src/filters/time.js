//demo
import Highcharts from "highcharts"

export const time = (s, format, type = "system",offset=0) => {//offset unit : ms
	if($.isNumeric(s)){
		s*=1000;
		s=Math.round(s);
		if(s!=undefined){
			switch(type){
				case "system":s+=stage.time.localOffset;break;//使用本机系统的时区
				case "utc":break;//直接呈现，不附加时区
				case "inc":s+=stage.time.offset;break;//使用公司时区
				case "offset":s+=offset;break;//使用目标时区值来呈现

				// case "":break;
				// default:break;
			}
		}
	}
	return s?Highcharts.dateFormat(format,s):"--";//%Y/%m/%d or %Y/%m/%d and %H:%M:%S
}

//时间戳转换为年-月-日 时:分
function toZero(n) {
	return n < 9 ? '0' + n : n
}

Date.prototype.toLocaleString = function () {
	return this.getFullYear() + '-' + toZero(this.getMonth() + 1) + '-' + toZero(this.getDate()) + ' ' + toZero(this.getHours()) + ':' + toZero(this.getMinutes());
}

export const translateTime = (str,part) => {
	// 第一个参数就是当前的值，后面依次是传来的参数
	if(part === 'b'){
		return new Date(str).toLocaleString().slice(0,10)
	}else if(part === 't'){
		return new Date(str).toLocaleString().slice(11)
	}

}
