function ajax(options){
	//整理options,options为json格式
	options=options||{};
	if(!options.url) return;
	options.data=options.data||{};//用于传输的数据
	options.type=options.type||'get';
	options.timeout=options.timeout||0;//0代表无限等待
	options.success=options.success||null;
	options.error=options.error||null;
	//data中的 随机数用于改变地址，应加上去。
	options.data.t=Math.random();
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));
	}
	var str=arr.join('&');
	//ajax创建（兼容）、连接、请求、接收、响应
	if(window.XMLHttpRequest){//高版本存在，IE6以下除外，IE6以下用else中
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	if(options.type=='get'){
		oAjax.open('get', options.url+'?'+str, true);
		oAjax.send();
	}else{
		oAjax.open('post', options.url, true);
		oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		oAjax.send(str);
	}	
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			clearTimeout(timer);
			if(oAjax.status>=200&&oAjax.status<300 || oAjax.status==304){
				options.success && options.success(oAjax.responseText);
			}else{
				options.error && options.error(oAjax.status);
			}
		}	
	};
	if(options.timeout){
		var timer=setTimeout(function(){
			alert('超时');
			oAjax.abort();//超时中断请求	
		}, options.timeout);
	}
};