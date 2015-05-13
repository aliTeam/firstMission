/**
 * @author kamy
 */
window.onload=function(){
				waterfall('wrap','box');
				//一组json数据，定义了每次滚动条加载的数据，这个其实是后台从数据库里取的，但是为了效果，写在这了
				var picData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"22.jpg"},{"src":"12.jpg"},{"src":"4.jpg"},{"src":"21.jpg"}]};
				//滚动时，检测位置，然后加载json数据
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
							oImg.src="images/"+picData.data[i].src;
							oImg.style.height='auto';
							oPic.appendChild(oImg);
							
						}
						waterfall('wrap','box');
					}
				}
			}
			//用瀑布流的方式排列图片位置的函数
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
			//取出某个parent元素的所有类名为childname的小孩
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
			//获得数组中的最小值
			function getMinIndex(arr,minH){
				for(var i=0;i<arr.length;i++){
					if(arr[i]==minH){
						return i;
					}
				}
			}
			//检测滚动条是不是移到了指定的位置（要加载下一组图片的位置）
			function checkLoad(){
				var oParent=document.getElementById('wrap');
				var oBoxs=getChildren(oParent,'box');
				var oDeadLine = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
				var scrollHt=document.body.scrollTop||document.documentElement.scrollTop;
				var clientHt=document.body.clientHeight||document.documentElement.clientHeight;
				return (scrollHt+clientHt>oDeadLine)?true:false;
			}