//index.js
//获取应用实例
const app = getApp()
const index_endpoint = 'https://cloud.minapp.com/oserve/v1/table/84988/record/'

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    stories: [],
    title: 'Stories'
  },

  getResult(res) {
    // console.log(res)
    this.setData({
      stories: res.data.objects
    })
  },

  // binded to clicking on a story
  showStory(event) {
    const data = event.currentTarget.dataset;
    const id = data.id;

    wx.navigateTo({
      url: `/pages/show/show?id=${id}`
    });
  },

  onShow: function () {
    // const request = {
    //   url: index_endpoint,
    //   method: 'GET',
    //   header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
    //   success: this.getResult
    // }
    // wx.request(request)
    this.setData({
      title: wx.getStorageSync('story-title') || "Stories"
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    const request = {
      url: index_endpoint,
      method: 'GET',
      header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
      success: this.getResult
    }

    // Save reference to page
    // let page = this;

    // Your code from above defining the request JSON
    wx.request(request);
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
