/**
 * Created by 哥 on 2016/6/26.
 */
function move(obj, json, optional){
    //整理可选参
    optional=optional||{};
    optional.time=optional.time||300;
    optional.type=optional.type||'ease-out';
    //必填参数
    var start={};
    var dis={};
    for(var key in json){
        start[key]=parseFloat(getStyle(obj, key));
        dis[key]=json[key]-start[key];
    }
    var count=Math.round(optional.time/30);
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;
        for(var key in json){
            switch(optional.type){
                case 'linear':
                    var cur=start[key]+n/count*dis[key];
                    break;
                case 'ease-in':
                    var a=n/count;
                    var cur=start[key]+a*a*a*dis[key];
                    break;
                case 'ease-out':
                    var a=1-n/count;
                    var cur=start[key]+(1-a*a*a)*dis[key];
            }
            if(key=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
            }else{
                obj.style[key]=cur+'px';
            }
        }
        if(n==count){
            clearInterval(obj.timer);
            optional.fn && optional.fn();
        }
    },30);
}
function getStyle(obj, attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj, false)[attr];
}