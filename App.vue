<script>
	export default {
		globalData:{
			//全局赋值取值方法
			// 赋值：
			// getApp().globalData.text = 'test'
			// 取值：
			// console.log(getApp().globalData.text)
			getzhishuapi:'https://api.***.com/api.php',
			//your api.php;
			useropenid:''
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
