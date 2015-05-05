/**
 * @author kamy
 */
window.onload=function(){
				waterfall('wrap','box');
				var picData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"22.jpg"},{"src":"12.jpg"},{"src":"4.jpg"},{"src":"21.jpg"}]};
				window.onscroll=function(){
					if(checkLoad()){
						var oParent=document.getElementById('wrap');
						for (var i=0;i<picData.data.length;i++){
							var oBox=document.createElement('div');
							oBox.className='box';
							oParent.appendChild(oBox);
							var oPic=document.createElement('div');
							oPic.className='pic';
							oBox.appendChild(oPic);
							var oImg=document.createElement('img');
							oImg.src="../../images/"+picData.data[i].src;
							oImg.style.height='auto';
							oPic.appendChild(oImg);
							
						}
						waterfall('wrap','box');
					}
				}
			}
			function waterfall(parent,child){
				
				var oParent=document.getElementById(parent);
				var oBoxs=getChildren(oParent,child);
				var cols=Math.floor(document.documentElement.clientWidth/oBoxs[0].offsetWidth);
				oParent.style.cssText='width:'+oBoxs[0].offsetWidth*cols+'px;margin:0px auto;';
				var hArray=new Array();
				for(var i=0;i<oBoxs.length;i++)
				{
					if(i<cols){
						hArray.push(oBoxs[i].offsetHeight);
					}else{
						var minH=Math.min.apply(null,hArray);
						var minIndex=getMinIndex(hArray,minH);
						oBoxs[i].style.position='absolute';
						oBoxs[i].style.top=minH+'px';
						oBoxs[i].style.left=oBoxs[i].offsetWidth*minIndex+'px';
						hArray[minIndex] += oBoxs[i].offsetHeight;
						
					}
				}
				
			}
			
			function  getChildren(parent,childname) {
			  var boxAr=new Array();
			  var aElement= new Array();
			  aElement=parent.getElementsByTagName('*');
			  for(var i=0;i<aElement.length;i++)
			  {
			  	if(aElement[i].className==childname){
			  		boxAr.push(aElement[i]);
			  	}
			  }
			  return boxAr;
			}
			
			function getMinIndex(arr,minH){
				for(var i=0;i<arr.length;i++){
					if(arr[i]==minH){
						return i;
					}
				}
			}
			function checkLoad(){
				var oParent=document.getElementById('wrap');
				var oBoxs=getChildren(oParent,'box');
				var oDeadLine = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
				var scrollHt=document.body.scrollTop||document.documentElement.scrollTop;
				var clientHt=document.body.clientHeight||document.documentElement.clientHeight;
				return (scrollHt+clientHt>oDeadLine)?true:false;
			}