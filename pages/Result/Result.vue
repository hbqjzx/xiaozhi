<template>
	<view class="content">
		<view class="">
			<!-- <image class="hotimg" src="../../static/message.png" mode=""></image>	 -->
			<p v-if="showtips!=''" class="showtips">{{ showtips }}</p>			
		</view>
		<view v-if="showgg!=''" class="myname">
		<view class="namestyle" v-for="(message, index) in childnames" :key="index">
		    <view class="question" ref="1question" @longpress="copyText(message.myname)">		
			{{ message.myname }}		
		  </view>
		  </view>			
		</view>
		
		<view class="askbutton">
	<button v-if="showgg!=''" class="button" @click="gopage('/pages/index/index')">再取一个</button>
	
	<!-- <button v-if="showgg!=''" class="button2" @tab="onShare()">分享好友</button>	 -->
	
	<!--分享给好友-->
<view id="buttonContainer">
  <navigator hover-class="none">
    <button open-type="share" type="primary" v-if="showgg!=''" class="button2">分享好友</button>
	<!-- <button open-type="share" type="primary">分享好友</button> -->
  </navigator> 
  
  <button v-if="showback===''" class="button" @click="gopage('/pages/index/index')">返回首页</button>
  
</view>
	
		<!-- <button class="shareBtn" type="default" data-name="shareBtn" open-type="share"> 
					<u-icon name="zhuanfa"></u-icon>分享	<button> -->

	
	<!-- <button class="askquestion" @click="handleClick2()">测试问题</button> -->
	<view class="showgg">{{ showgg }}</view>
	
		</view>
		<!-- 广告开始 -->
		<view class="myad5">
			<ad unit-id="adunit-e235afcba7fe39be" ad-type="video" ad-theme="white"></ad>
		</view>
		<!-- 广告结束 -->
		
	</view>
</template>

<script>
	export default {		
		data() {
			return {				
				prompt:'',//prompt,
				nameprompt:'',
				name:'',
				sex:'',
				//childname[]:'孩子名字',
				showtips:'AI小智正在分析起名中……',
				showgg:'',
				showback:'',
				childnames: [ { myname: "" }]
			}
		},
		 mounted() {
		   // this.currentPath = this.$route.path;		   
		   this.toask();
		  },
		onLoad(options){
			//this.refresh();			
			this.name=options.msg;	
			this.sex=options.sex;			
			console.log(this.sex);
			if(this.sex===''){
				this.gopage('/pages/index/index');
			}
		},
		methods: {			
			// onShare() {
			//       uni.share({
			//         provider: 'weixin',
			//         scene: 'WXSceneSession',
			//         type: 0,
			//         title: 'AI小智起名',
			// 		//path:`/pages/index/index`,
			//         //imageUrl: '/static/logo.png',
			//         success() {
			//           console.log('分享成功');
			//         },
			//         fail() {
			//           console.log('分享失败');
			//         }
			//       });
			//     },
			 //分享函数
			 // uni.shareAppMessage({
			 //   title: 'AI小智起名',
			 //   path: '/pages/index/index'
			 // }),
			 onShareAppMessage:({	   
			     title: 'AI小智起名',
			     path: '/pages/index/index',
			     //imageUrl: 'https://www.aierleshop.com/images/sharexiaozhi.jpg'
			 }),
			  // onShareAppMessage: function (res) {
			  //   if (res.from === 'button') {
			  //     console.log(res.target, res)
			  //   }
			  //   return {
			  //     title: 'AI小智起名',
			  //     path: 'pages/index/index',
			  //     imageUrl: 'https://www.aierleshop.com/images/sharexiaozhi.jpg'
			  //   }
			  // },
			
			//长按复制
			copyText(text) {
			    uni.setClipboardData({
			      data: text,
			      success() {
			        uni.showToast({
			          title: '已复制',
			          icon: 'none'
			        })
			      }
			    })
			  },
			 gopage(url) {				  
				    uni.navigateTo({
				     //url: '/pages/index/index',
					 url:url
				     });				  				 
			    },
			//开始提问，如有回答，加入保存提问数据			 
	 //从API获得描述
	 getprompt(){
		 //var namepr='孩儿取3个字的名字，并解析名字的含义，可以从诗经，论语，楚辞，周易上进行解读,名字要取得大气,有美好的祝愿，输出时将姓名放在最前面，标上拼音，字数不要超过150字。';
		 uni.request({
		 		  //url: 'https://chat.aierleshop.com/message/index.php',
		 		  url: 'https://www.aierleshop.com/api/getprompt.php',
		 		  method: 'POST', //get
		 			   header: {
		 				  'Content-Type': 'application/json'
		 				},
		 		  data: JSON.stringify(
		 		  {
		 			 // msg: this.prompt,// 'value' ,
		 			  
		 		  }),					  
		 		  success: (res) => {						
		 			console.log(res.data)
		 			if(res.data.code===200 && res.data.nameprompt!=null){
		 				//console.log("取名成功");		 				
		 				//转发分享显示出来
						//取到了描述
		 				return res.data.namepromt;
		 			}else{
		 				console.log('返回错误，失败。')		 						 				
		 			}
		 		  },
		 		})	
		 
	 },		
	 toask(){	
		 //这里的说明从api中获得
     //const nameprompt='孩儿取3个字的名字，并解析名字的含义，可以从诗经，论语，楚辞，周易上进行解读,名字要取得大气,有美好的祝愿，输出时将姓名放在最前面，标上拼音，字数不要超过150字。';
			//this.prompt='父亲姓邓，为男孩子取一个3个字的名字，并解析一下名字的含义。';
			//this.nameprompt=this.getprompt();
			this.prompt='父亲姓' + this.name + '，为' + this.sex;// + this.nameprompt;
			console.log(this.name);
			console.log(this.prompt);
			//console.log('this is prompt');
			//this.buttonname='思考中';					
			uni.request({
					  //url: 'https://chat.aierleshop.com/message/index.php',
					  url: 'https://www.aierleshop.com/api/api.php',
					  method: 'POST', //get
						   header: {
							  'Content-Type': 'application/json'
							},
					  data: JSON.stringify(
					  {
						  msg: this.prompt,// 'value' ,
						  //增加多个信息
						  father:this.name,
						  //mother:this.mother,
						  sex:this.sex,
						  token:'4000'
					  }),					  
					  success: (res) => {						
						console.log(res.data)
						if(res.data.code===200 && res.data.resmsg!=null){
							//console.log("取名成功");
							this.showtips="为您的宝宝取好了名字";
							this.showgg='如果您喜欢，请转发分享给好朋友！';
							this.showback='1';
							//转发分享显示出来
							
							this.childnames.push(
									 {"myname":res.data.resmsg}									 									 
									 //{"myname":res.data.resmsg.replace(/(\r\n|\n|\r)/gm, '')}
									 //{"myname":res.data.resmsg}
								)
						}else{
							console.log('返回错误，失败。')
							// this.buttonname='提问';
							// this.buttonDisabled=false;
							 this.childnames.push(							 
							 		 {"myname":'可能发生了网络故障，请重试！'}
							 	)
						}
					    //console.log(res.data)					
					  },
					})								
				},					
		}
	}
</script>

<style scoped>
.nav-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #fff;
  border-top: 1px solid #eee;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nav-icon {
  width: 20px;
  height: 20px;
  margin-bottom: 5px;
}

.nav-title {
  font-size: 12px;
  color: #333;
}	
.setcolor{
	color:#000;
	background-color: bisque;
	padding: 15rpx;
}
.beginhot{
	margin-top:0rpx;
}
.toask{
	margin-top:30rpx;
	margin-bottom: 20rpx;
	display: flex;
	text-align: center;
}
.toask_text{
	padding-left:10rpx;
	margin-top:-5rpx;
	
}
.hotcss{
	/* //display: flex; */
	/* align-items: center; */
	/* justify-content: center; */
	padding-left: 10rpx;
	justify-content:flex-end;
	height:60rpx;	 	 	 
	justify-content:space-around;
	flex-direction: row;
	margin-top:60rpx;
}
.hotre{
	text-align: right;
}
.hotimg{
	/* display: flex; */
	width:35rpx;
	height:35rpx;
	font-size: 28rpx;
	float:left;
	margin-left:0rpx;
}
.hotimgright{
	/* display: flex; */
	width:30rpx;
	height:30rpx;
	font-size: 28rpx;
	float:right;
	margin-top:8rpx;
	padding-left: 8rpx;
}
  .content{
	  width:90%;
	  margin: 0 auto;	  
	  margin-top:10rpx;
  }
  .askms{
	  height:200rpx;
	  display: flex;
	  font-size: 26rpx;	
  }
  .askbutton{
	 /* display: flex;	 */
	 /* padding-left: 10rpx; */
	 /* justify-content:flex-end; */
	 height:60rpx;	 	 	 
	 justify-content:space-around;
	 flex-direction: row;
	 margin-top:30rpx;
  }	 
  .askquestion{	
	/* font-size: 28rpx;
	float:right;
	margin-left:15rpx; */
	margin-bottom: 10px;
 }
 .hot{	 
	 /* padding:15rpx; */
	 /* color:royalblue; */
	 /* display: flex; */
	 font-size: 32rpx;
	 float:right;
	 margin-left:15rpx;
 } 
 .hotleft{
	 font-size: 32rpx;
	 float:left;
	 margin-left:15rpx;
 }
 .hot_text{	 
 	 padding:5rpx;
	 padding-top:15rpx;
	 padding-bottom:15rpx;
 }
 .myad{
	 margin:40rpx auto;	 
	 width:90%;	 
 }
 .showtips{
	 text-align: center;
	 padding-top:15px;
	 padding-bottom: 10px;
	 background-color:#D1EEEE;
 }
 .myname{
	 margin-top:15px;
	 height:auto;
	 background-color: antiquewhite;	 
 }
 .namestyle{
	 line-height: 24px;
	 padding-left:10px;
	 padding-right: 10px;
	 /* padding-top: 20px; */
	 padding-bottom: 20px;
 }
 .showgg{
	 text-align: center;
	 margin-top: 20px;
	 margin-bottom: 20px;
 }
 .button {
 	margin-top: 20px;
 	width: 200px;
 	height: 40px;
 	border-radius: 20px;
 	background-color: #ff9800;
 	color: #ffffff;
 	font-size: 16px;
 	display: flex;
 	align-items: center;
 	justify-content: center;
 }
 .button2 {
 	margin-top: 20px;
 	width: 200px;
 	height: 40px;
 	border-radius: 20px;
 	background-color: #1f9800;
 	color: #ffffff;
 	font-size: 16px;
 	display: flex;
 	align-items: center;
 	justify-content: center;
 }
 .myad5{
 	margin-top:240rpx;
 	width:90%;	
 }
</style>
