// pages/post/post.js
// const create_endpoint = 'https://cloud.minapp.com/oserve/v1/table/84988/record/'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formSubmit: function (event) {
    // console.log(event)
    let data = event.detail.value
    const page = this;

    // wx.request({
    //   url: create_endpoint,
    //   method: 'POST',
    //   header: {'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'},
    //   data: data,
    //   success() {
    //     // no need for response data
    //     // reload index page when done
    //     // page.submitSuccess
    //     wx.showToast({
    //       title: 'Sucess',
    //       icon: 'sucess'
    //     })
    //     wx.reLaunch({
    //       url: '/pages/index/index',
    //     })
    //   }
    // })

    let tableName = 'stories'
    let Story = new wx.BaaS.TableObject(tableName)
    let story = Story.create()
    story.set(data).save().then(this.submitSuccess)
  },

  submitSuccess(res) {
    // console.log(res)
    if (res.statusCode === 201) {
      wx.showToast({
        title: 'Sucess',
        icon: 'sucess'
      })
      // wx.reLaunch({
      //   url: '/pages/index/index',
      // })
      wx.navigateBack()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})