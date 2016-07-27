/**
 * Created by 哥 on 2016/7/13.
 */
window.onload=function(){
    /***************获取元素*****************/
    var oMain=document.getElementById('main');
    var oHead=document.getElementById('header');
    var oMusic=document.getElementById('music');
    var oAudio=document.getElementById('audio');
    var oMenu=document.getElementById('menu');
    var oBanner=document.getElementById('banner');
    var oBanUl=oBanner.getElementsByTagName('ul')[0];
    var oBanLi=oBanner.getElementsByTagName('li')[0];
    var oPrev=getByClass(oBanner,'prev')[0];
    var oNext=getByClass(oBanner,'next')[0];
    var oContent=document.getElementById('content');
    var oSkill=document.getElementById('skill');
    var skillList=getByClass(oSkill,'skillList')[0].getElementsByTagName('li');
    var skillInfo=getByClass(oSkill,'skill');
    var oContactMe=getByClass(oMenu,'contactMe')[0];
    var oWorkShow=getByClass(oMenu,'workShow')[0];
    var aNavList=oMenu.getElementsByTagName('a');

    //page0  音乐/菜单/banner/分享
    /******音乐（小耳机）*******/
    var bOpen=false;
    oMusic.style.backgroundPosition='0 -65px';
    oAudio.src='';
    oMusic.onclick=function(){
        if(bOpen){
            oMusic.style.backgroundPosition='0 -65px';
            oAudio.src='';
        }else{
            oMusic.style.backgroundPosition='0 0';
            oAudio.src='music/Florence.mp3';
            oAudio.volume=0.1;
        }
        bOpen=!bOpen;
    };
    /**********banner切换***********/
    var clientW=document.documentElement.clientWidth;
    var cur=0;
    var bClick=false;
    var timerBanner=null;
    timerBanner=setInterval(function(){
        cur++;
        tabBanner();
    },3000);
    oPrev.onclick=function(){
        if(bClick) return;
        bClick=true;
        cur--;
        if(cur<0) cur=Math.abs(cur);
        tabBanner();
    };
    oPrev.onmouseover=oNext.onmouseover=function(){
        clearInterval(timerBanner);
    };
    oPrev.onmouseout=oNext.onmouseout=function(){
        timerBanner=setInterval(function(){
            cur++;
            tabBanner();
        },3000);
    };
    oNext.onclick=function(){
        if(bClick) return;
        bClick=true;
        cur++;
        tabBanner();
    };

    function tabBanner(){
        oBanLi.style.opacity=0;
        oBanLi.style.WebkitTransition='1s all ease';
        oBanLi.style.MozTransition='1s all ease';
        oBanLi.style.transition='1s all ease';
        function transEnd(){
            oBanLi.removeEventListener('transitionend',transEnd,false);
            //alert(1);
            cur%=2;
            oBanLi.style.WebkitTransition='none';
            oBanLi.style.MozTransition='none';
            oBanLi.style.transition='none';
            oBanLi.style.opacity=1;
            oBanLi.style.backgroundImage='url(image/banner'+(cur+1)+'.jpg)';
            oBanUl.style.backgroundImage='url(image/banner'+(2-cur)+'.jpg)';
            bClick=false;
        }
        oBanLi.addEventListener('transitionend',transEnd,false);
    }
    //page2

    //页面切换
    var aTab=document.getElementById('navTab').getElementsByTagName('li');

    var oPage1=getByClass(oContent,'page1')[0];
    var oPage2=getByClass(oContent,'page2')[0];
    var oPage3=getByClass(oContent,'page3')[0];
    var oPage4=document.getElementById('footer');
    var oPage0=document.getElementById('header');
    //console.log(oPage0);
    var aPage=[oPage0,oPage1,oPage2,oPage3,oPage4];
    var oNavTab=document.getElementById('navTab');
    var bWheel=false;
    var count=0;
    var pageH=oPage1.offsetHeight;
    for(var i=0;i<aNavList.length;i++){
        (function(index){
            aNavList[i].onmouseover=function(){
                for(var i=0;i<aNavList.length;i++){
                    aNavList[i].className='';
                }
                aNavList[index].className='active';
            };
        })(i);
        (function(index){
            aNavList[i].onmouseout=function(){
                for(var i=0;i<aNavList.length;i++){
                    aNavList[i].className='';
                }
                aNavList[0].className='active';
            };
        })(i);
    }
    oContactMe.onclick=function(){
        tab(4);
    };
   /* oWorkShow.onclick=function(){
        tab(2);
    };*/
    addMouseWheel(document,function(down){
        if(bWheel) return;
        bhWeel=true;
        if(down){
            count++;
            if(count>4) count=4;
            tab(count);
        }else{
            count--;
            if(count<0) count=0;
            tab(count);
        }
    });
    //侧边栏切换
    tabPage();


function tabPage(){
    for(var i=0; i<aTab.length; i++){
        (function(index){
            aTab[i].onmouseover=function(){
                tab(index);
            };
        })(i);
    }
}
function tab(index){
    for(var i=0; i<aTab.length; i++){
        aTab[i].className='';
    }
    aTab[index].className='active';
    oMain.style.WebkitTransform='translateY('+-index*pageH+'px)';
    oMain.style.MozTransform='translateY('+-index*pageH+'px)';
    oMain.style.MsTransform='translateY('+-index*pageH+'px)';
    oMain.style.transform='translateY('+-index*pageH+'px)';
    oMain.style.WebkitTransition='1s all ease';
    oMain.style.MozTransition='1s all ease';
    oMain.style.transition='1s all ease';
    oMain.addEventListener('transitionend',fnEnd,false);
    function fnEnd(){
        oMain.removeEventListener('transitionend',fnEnd,false);
        if(index==1){
            //skillShow();
        }else{
            //skillHide();
        }
        if(index==0){
            oMenu.style.WebkitTransition='1s all ease';
            oMenu.style.MozTransition='1s all ease';
            oMenu.style.transition='1s all ease';
            oMenu.style.WebkitTransform='translateY(0px)';
            oMenu.style.MozTransform='translateY(0px)';
            oMenu.style.MsTransform='translateY(0px)';
            oMenu.style.transform='translateY(0px)';
        }else{
            oMenu.style.WebkitTransition='1s all ease';
            oMenu.style.MozTransition='1s all ease';
            oMenu.style.transition='1s all ease';
            oMenu.style.WebkitTransform='translateY('+-oMenu.offsetHeight+'px)';
            oMenu.style.MozTransform='translateY('+-oMenu.offsetHeight+'px)';
            oMenu.style.MsTransform='translateY('+-oMenu.offsetHeight+'px)';
            oMenu.style.transform='translateY('+-oMenu.offsetHeight+'px)';
        }
        bWheel=false;
    }
}




//根据class获取元素
function getByClass(oParent,sClass){
    if(oParent.getElementsByClassName){
        return oParent.getElementsByClassName(sClass);
    }else{
        var aEle=oParent.getElementsByTagName('*');
        var result=[];
        var re=new RegExp('\\b'+sClass+'\\b');
        for(var i=0; i<aEle.length; i++){
            if(re.test(aEle[i].className)){
                result.push(aEle[i]);
            }
        }
        return result;
    }
}

//获取样式
function getStyle(obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}
//move 框架
function move(obj,json,optional){
    optional=optional||{};
    optional.type=optional.type||'ease-out';
    optional.time=optional.time||300;
    optional.fn=optional.fn||null;
    var start={};
    var dis={};
    for(var key in json){
        start[key]=parseFloat(getStyle(obj,key));
        dis[key]=parseFloat(json[key])-start[key];
    }
    var n=0;
    var count=parseInt(optional.time/30);
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;
        for(var key in json){
            switch (optional.type) {
                case 'ease':
                    var a=n/count;
                    var cur=start[key]+a*dis[key];
                    break;
                case 'ease-in':
                    var a=n/count;
                    var cur=start[key]+a*a*dis[key];
                    break;
                case 'ease-out':
                    var a=1-n/count;
                    var cur=start[key]+(1-a*a*a)*dis[key];
                    break;

            }
            if(key=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
            }else{
                obj.style[key]=cur+'px';

            }
            if(n==count){
                clearInterval(obj.timer);
                optional.fn&&optional.fn();
            }
        }
    },30);
}
//鼠标滚轮
function addMouseWheel(obj,fn){
    var fireFox=window.navigator.userAgent.toLowerCase().indexOf('firefox');
    if(fireFox!=-1){
        obj.addEventListener('DOMMouseScroll',fnWheel,false);
    }else{
        obj.onmousewheel=fnWheel;
    }
    function fnWheel(ev){
        var e=ev||event;
        var down=false;
        if(e.wheelDelta){
            down= e.wheelDelta<0?true:false;
        }else if(e.detail){
            down= e.detail>0?true:false;
        }
        fn(down);
        e.preventDefault&& e.preventDefault();
        return false;
    }
}
//流星
/*function createLx(){
    var oContent=document.getElementById('content');
    var oDiv=document.createElement('div');
    oDiv.className='lx';
    oContent.appendChild(oDiv);
    var sPeedX=10+Math.random()*20;
    var d=Math.random()*-20-10;
    var sPeedY=10+Math.random()*20;
    liuxing(oDiv,sPeedX,sPeedY);
    oDiv.style.transform='rotate('+d+'deg)';
}
function liuxing(obj,sPeedX,sPeedY){
    setInterval(function(){
        var l=obj.offsetLeft;
        var t=obj.offsetTop;
        if(l<0||l>oContent.offsetWidth-obj.offsetWidth){
            oContent.removeChild(obj);
        }
        if(t<0||t>oContent.offsetHeight-obj.offsetHeight){
            oContent.removeChild(obj);
        }
        l+=sPeedX;
        t+=sPeedY;
        obj.style.left=l+'px';
        obj.style.top=t+'px';
    },30);
}*/
};