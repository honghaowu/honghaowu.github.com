// JavaScript Document
function getStyle(obj, attr){return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj, false)[attr]};
function move(obj, json, optional){
	var start={};
	var dis={};
	var n=0;
	optional=optional||{};
	optional.time=optional.time||300;
	optional.fn=optional.fn||null;
	optional.type=optional.type||'ease-out';
	var count=Math.round(optional.time/30);
	for(var key in json){
		start[key]=parseFloat(getStyle(obj, key));
		dis[key]=json[key]-start[key];	
	}
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var key in json){
			switch(optional.type){
				case 'linear':
					var cur=start[key]+dis[key]*n/count;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[key]+dis[key]*a*a;
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
			optional.fn&&optional.fn();
		}	
	}, 30);
		
}