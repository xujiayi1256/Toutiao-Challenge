// pages/post_comment/post_comment.js
// const create_endpoint = 'https://cloud.minapp.com/oserve/v1/table/84988/record/'
Page({
  

  /**
   * 页面的初始数据
   */
  data: {

  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    // console.log(id)
    this.setData({story_id:id})
  },

  formSubmit: function (event) {
    // console.log(event)
    let data = {
      name: event.detail.value.name,
      content: event.detail.value.name,
      story_id: this.data.story_id
    }
    const page = this

    let tableName = 'comments'
    let Comment = new wx.BaaS.TableObject(tableName)
    let comment = Comment.create()

    comment.set(data).save().then(res => {
      wx.showToast({
        title: 'Sucess',
        icon: 'sucess'
      }),
        
      wx.reLaunch({
        url: `/pages/show/show?id=${this.data.story_id}`
      })
    })
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