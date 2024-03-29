// pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  showStory(event) {
    // const data = event.currentTarget.dataset;
    const id = this.data.story.id;

    wx.navigateTo({
      url: `/pages/post_comment/post_comment?id=${id}`
    });
  },

  getResult(res) {
    // console.log(res)
    this.setData({
      story: res.data
    })
  },

  getComments(res) {
    // console.log(res)
    this.setData({
      comments: res.data.objects
    })
  },

  deleteComment(event) {
    const data = event.currentTarget.dataset;

    // make a DELETE request
    // wx.request({
    //   url: `https://cloud.minapp.com/oserve/v1/table/85188/record/${data.id}`,
    //   method: 'DELETE',
    //   header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' }, // API key from Above

    //   success() {
    //     // no need for response data
    //     // redirect to index page when done
    //     wx.redirectTo({
    //       url: '/pages/index/index'
    //     });
    //   }
    // });

    // 删除 tableName 为 'comments' 的数据表中 recordID 的数据项
    let tableName = 'comments'
    let recordID = data.id

    let Comment = new wx.BaaS.TableObject(tableName)
    Comment.delete(recordID).then(wx.redirectTo({
      url: '/pages/index/index'
    }))
  },

  voteComment(event) {
    const page = this;

    const data = event.currentTarget.dataset;
    let votes = data.votes;
    // console.log(votes)
    // const new_votes = { votes: votes + 1 }

    // make a PUT request
    // wx.request({
    //   url: `https://cloud.minapp.com/oserve/v1/table/85188/record/${data.id}`,
    //   method: 'PUT',
    //   header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' }, // API key from Above
    //   data: new_votes,

    //   success(res) {
    //     // new comment from response
    //     const new_comment = res.data

    //     // all the page comments
    //     let comments = page.data.comments

    //     // find the comment from page comments to update based on unique id
    //     let comment = comments.find(comment => comment._id == new_comment.id)

    //     // update comment
    //     comment.votes = new_comment.votes

    //     // update the page comments
    //     page.setData({ comments: comments })
    //   }
    // });
    // 更新 tableName 为 'comments' 的数据表中 id 的数据行的 votes 字段
    let tableName = 'comments'
    let recordID = data.id // 数据行 id

    let Comment = new wx.BaaS.TableObject(tableName)
    let comment = Comment.getWithoutData(recordID)

    comment.set('votes', votes + 1)
    comment.update().then(function(res) {
      // new comment from response
      const new_comment = res.data

      // all the page comments
      let comments = page.data.comments

      // find the comment from page comments to update based on unique id
      let comment = comments.find(comment => comment._id == new_comment.id)

      // update comment
      comment.votes = new_comment.votes

      // update the page comments
      page.setData({ comments: comments })
    })
  },

  devoteComment(event) {
    const page = this;

    const data = event.currentTarget.dataset;
    let votes = data.votes;
    // const new_votes = { votes: votes - 1 }

    // make a PUT request
    // wx.request({
    //   url: `https://cloud.minapp.com/oserve/v1/table/85188/record/${data.id}`,
    //   method: 'PUT',
    //   header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' }, // API key from Above
    //   data: new_votes,

    //   success(res) {
    //     // new comment from response
    //     const new_comment = res.data

    //     // all the page comments
    //     let comments = page.data.comments

    //     // find the comment from page comments to update based on unique id
    //     let comment = comments.find(comment => comment._id == new_comment.id)

    //     // update comment
    //     comment.votes = new_comment.votes

    //     // update the page comments
    //     page.setData({ comments: comments })
    //   }
    // });

    let tableName = 'comments'
    let recordID = data.id // 数据行 id

    let Comment = new wx.BaaS.TableObject(tableName)
    let comment = Comment.getWithoutData(recordID)

    comment.set('votes', votes - 1)
    comment.update().then(function(res) {
      // new comment from response
      const new_comment = res.data

      // all the page comments
      let comments = page.data.comments

      // find the comment from page comments to update based on unique id
      let comment = comments.find(comment => comment._id == new_comment.id)

      // update comment
      comment.votes = new_comment.votes

      // update the page comments
      page.setData({ comments: comments })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    // const request = {
    //   url: `https://cloud.minapp.com/oserve/v1/table/84988/record/${id}`,
    //   method: 'GET',
    //   header: {'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'},
    //   success: this.getResult
    // }

    let tableName = 'stories'
    let Story = new wx.BaaS.TableObject(tableName)
    let recordID = id // e.g. '59897882ff650c0477f00485'
    Story.get(recordID).then(this.getResult)

    //in request json for all the comments
    // const requestComments = {
    //   url: 'https://cloud.minapp.com/oserve/v1/table/85188/record/',
    //   method: 'GET',
    //   header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
    //   data: {
    //     where: { // filtering comments for a specific story
    //       "story_id": { "$eq": id } // story id
    //     }
    //   },
    //   //... Don't forget to set the page data to comments from the response
    //   success: this.getComments
    // }

    let commentsTableName = 'comments'
    let Comments = new wx.BaaS.TableObject(commentsTableName)
    let query = new wx.BaaS.Query()
    query.compare('story_id', '=', id)
    Comments.setQuery(query).find().then(this.getComments)

    // Save reference to page
    // let page = this;

    // Your code from above defining the request JSON
    // wx.request(request);
    // wx.request(requestComments);
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