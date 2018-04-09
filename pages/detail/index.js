const articleInfo = {
  title:'特斯拉卡车发布',
  category:'科技',
  poster:'/images/car.png',
  content:'特斯拉卡车发布',
  created_at:'2017-11-11'
}
Page({
  data:{
    article:{},
  },

  onLoad:function(option){
    this.getArticle(option.id)
  },

  getArticle: function(id){
    this.setData({article: articleInfo})
  },
})






