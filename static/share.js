export default {
	data() {
		return {

		}
	},
	onLoad: function() {
		wx.showShareMenu({
			withShareTicket: true,
			menus: ["shareAppMessage", "shareTimeline"]
		})
	},
	onShareAppMessage(res) {
		let that = this;
		let imageUrl = that.shareUrl || '';
		if (res.from === 'button') {
		//这块需要传参，不然链接地址进去获取不到数据
			let path = `/` + that.$scope.route + `?item=` + that.$scope.options.item;
			return {
				title: '小智取名',
				path: path,
				imageUrl: imageUrl
			};
		}
		if (res.from === 'menu') {
			return {
				title: '小智取名',
				path: '/pages/tabBarPro/index/index',
				imageUrl: imageUrl
			};
		}
	},
	// 分享到朋友圈
	onShareTimeline() {
		return {
			title: '小智取名',
			path: '/pages/index/index',
			imageUrl: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
		};
	},
	methods: {

	}
}

