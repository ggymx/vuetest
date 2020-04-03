//打印日志
const log={
    info:(info)=>{
        console.log(`打印日志信息：`,info);
    },
    err:(err)=>{
        console.log(`出现错误：!!!`,err);
    },
    alert:(info)=>{
        alert(info);
    }
};

export default log;