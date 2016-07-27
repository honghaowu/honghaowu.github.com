//版权 北京智能社©, 保留所有权利
//url,data,success,error,cbKey,timeout	==	options
function jsonp(options){
	//整理options
	options	=	options	||	{};
	if(!options.url) return;
	if(!options.data) return;
	options.cbKey=	options.cbKey || 'cb';
	options.timeout=options.timeout ||	0;
	options.success=options.success ||	null;
	options.error=options.error ||	null;
	
	//整理data 
	var cbValue =  'jsonp'+Math.random(); 
	options.data[options.cbKey]=cbValue.replace('.','');//告诉网上的js回调随机函数名
	
	window[options.data[options.cbKey]]=function(json){
		options.success && options.success(json);
		clearTimeout(timer);
		//删除script标签
		document.getElementsByTagName('head')[0].removeChild(oSc);
		window[options.data[options.cbKey]]=null;//删除用过的函数
	};	
	
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));	
	}
	options.url = options.url +'?' +arr.join('&');
	//创建script标签，丢到head里面
	var oSc=document.createElement('script');
	oSc.src=options.url;
	document.getElementsByTagName('head')[0].appendChild(oSc);
	
	//超时
	if(options.timeout){
		var timer=setTimeout(function(){
			options.error && options.error();
			//阻止请求
			window[options.data[options.cbKey]]=function(){};//给个空函数什么都不做
		},options.timeout);
	}
}