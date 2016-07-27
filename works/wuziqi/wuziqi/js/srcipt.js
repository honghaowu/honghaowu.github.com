/**
 * Created by 哥 on 2016/7/22.
 */
var chess=document.getElementById('chess');
var context=chess.getContext('2d');
var me=true;
var myWin=[];
var computerWin=[];
var over=false;
//存棋子情况，刚开始都为0，下黑存1，白存2；
var chessBoard=[];
for(var i=0; i<15; i++){
    chessBoard[i]=[];
    for(var j=0; j<15; j++){
        chessBoard[i][j]=0;
    }
}
//赢法
var wins=[];
for(var i=0; i<15; i++){
    wins[i]=[];
    for(var j=0; j<15; j++){
        wins[i][j]=[];
    }
}
var count=0;
//横着5个
for(var i=0; i<15; i++){
    for(var j=0; j<11;j++){
        for(var k=0; k<5;k++){
            wins[i][j+k][count]=true;
        }
        count++;
    }
}
//竖着5个
for(var i=0; i<15; i++){
    for(var j=0; j<11;j++){
        for(var k=0; k<5;k++){
            wins[j+k][i][count]=true;
        }
        count++;
    }
}
//斜着5个
for(var i=0; i<11; i++){
    for(var j=0; j<11;j++){
        for(var k=0; k<5;k++){
            wins[i+k][j+k][count]=true;
        }
        count++;
    }
}
//反斜着5个
for(var i=0; i<11; i++){
    for(var j=14; j>3;j--){
        for(var k=0; k<5;k++){
            wins[i+k][j-k][count]=true;
        }
        count++;
    }
}
console.log(count);
for(var i=0; i<count; i++){
    myWin[i]=0;
    computerWin[i]=0;
}
context.strokeStyle='#bfbfbf';
var oImg=new Image();
oImg.src='images/bg.png';
oImg.onload=function(){
    context.drawImage(oImg,0,0,450,450);
    drawChessBox();
};


//下棋
chess.onclick=function(e){
    if(over){
        return;
    }
    if(!me){
        return;
    }
    var x= e.offsetX;
    var y= e.offsetY;
    var i=Math.floor(x/30);
    var j=Math.floor(y/30);
    if(chessBoard[i][j]==0) {
        oneStep(i, j, me);
        chessBoard[i][j] = 1;
    }
    for(var k=0; k<count; k++){
        if(wins[i][j][k]){
            myWin[k]++;
            computerWin[k]=6;
            if(myWin[k]==5){
                alert('你赢了！');
                over=true;
            }
        }
    }
    if(!over){
        me=!me;
        computerAI();
    }
};
function computerAI(){
    var myScore=[];
    var computerScore=[];
    var max=0;
    var u=0;
    var v=0;
    for(var i=0; i<15; i++){
        myScore[i]=[];
        computerScore[i]=[];
        for(var j=0; j<15; j++){
            myScore[i][j]=0;
            computerScore[i][j]=0;
        }
    }
    for(var i=0; i<15; i++){
        for(var j=0; j<15; j++){
            if(chessBoard[i][j]==0){
                for(var k=0; k<count; k++){
                    if(wins[i][j][k]){
                        if(myWin[k]==1){
                            myScore[i][j]+=200;
                        }else if(myWin[k]==2){
                            myScore[i][j]+=400;
                        }else if(myWin[k]==3){
                            myScore[i][j]+=2000;
                        }else if(myWin[k]==4){
                            myScore[i][j]+=10000;
                        }
                        if(computerWin[k]==1){
                            computerScore[i][j]+=220;
                        }else if(computerWin[k]==2){
                            computerScore[i][j]+=420;
                        }else if(computerWin[k]==3){
                            computerScore[i][j]+=2100;
                        }else if(computerWin[k]==4){
                            computerScore[i][j]+=20000;
                        }
                    }
                }
                if(myScore[i][j]>max){
                    max=myScore[i][j];
                    u=i;
                    v=j;
                }else if(myScore[i][j]==max){
                    if(computerScore[i][j]>computerScore[u][v]){
                        u=i;
                        v=j;
                    }
                }
                if(computerScore[i][j]>max){
                    max=computerScore[i][j];
                    u=i;
                    v=j;
                }else if(computerScore[i][j]==max){
                    if(myScore[i][j]>myScore[u][v]){
                        u=i;
                        v=j;
                    }
                }
            }
        }
    }
    oneStep(u,v,false);
    chessBoard[u][v]=2;
    for(var k=0; k<count; k++){
        if(wins[u][v][k]){
            computerWin[k]++;
            myWin[k]=6;
            if(computerWin[k]==5){
                alert('你输了！');
                over=true;
            }
        }
    }
    if(!over){
        me=!me;
    }
}
//画棋盘 15*15
function drawChessBox(){
    for(var i=0; i<15; i++){
        //竖向
        context.moveTo(15+30*i,15);
        context.lineTo(15+30*i,435);
        context.stroke();
        //横向
        context.moveTo(15,15+30*i);
        context.lineTo(435,15+30*i);
        context.stroke();
    }
}
//画棋子
function oneStep(i,j,me){
    context.beginPath();
    context.arc(15+30*i,15+30*j,13,0,2*Math.PI);
    context.closePath();
    var gradient=context.createRadialGradient(15+30*i+2,15+30*j-2,13,15+30*i+2,15+30*j-2,0);
    if(me){//黑棋
        gradient.addColorStop(0,'#0a0a0a');
        gradient.addColorStop(1,'#636766');
    }else{
        gradient.addColorStop(0,'#d1d1d1');
        gradient.addColorStop(1,'#f9f9f9');
    }
    context.fillStyle=gradient;
    context.fill();
}