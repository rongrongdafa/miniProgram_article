const articleInfo = {
  title : "特斯拉卡车发布",
  category : "科技",
  poster : "/images/car.png",
  content : "特斯拉卡车发布",
  created_at : "2017-11-11"
}
// 可以定义一个articleInfoes数组，通过传过来的id号显示不同的文章。
Page({
  data:{
    article:{},
  },

  onLoad:function(option){
    this.getArticle(option.id);
  },

  getArticle: function(id){
    this.setData({article: articleInfo});
  },

  onShareAppMessage: function (options) {
    return {
      title: this.data.article.title,
      path: "pages/detail/index?id=${id}",
      imageUrl:this.data.article.poster
    }
  }
})






