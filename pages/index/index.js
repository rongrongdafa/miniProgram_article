const firstPage = [{
  id: '1',
  title: '装修秘诀',
  description: '文艺气息爆棚的精致白色现代家',
  cover: '/images/house.png',
},
{
  id: '2',
  title: 'iReader Ocean 电子书评测',
  description: '国产千元电子书能否复制MIUI的辉煌',
  cover: '/images/reading.png',
},
{
  id: '3',
  title: '特斯拉卡车发布',
  description: '你以为只是发卡车，马斯克却把世界踩在脚下',
  cover: '/images/car.png',
},
{
  id: '4',
  title: '咖啡指南',
  description: '咖啡制作终极指南',
  cover: '/images/coffee.png',
}]

const lastPage=[{
  id :'5',
  title:'超新约全书',
  description : '一个以折磨人为乐趣的上帝',
  cover:'/images/god.jpg'
},
{
  id : '6',
  title :'2001 太空漫游 2001',
  description : '现代科幻电影技术的里程碑',
  cover : '/images/outerspace.jpg'
}]

let isEnd = false
let pageLimit = 4

Page({
  data: {
    articles: [],
    loading: false,
    loadMoreText:'加载更多'
  },
  onLoad: function () {
    this.getArticles(true)
  },
  loadMore:function(event){
    this.getArticles()
  },
  getArticles: function(isFirstPage){
    if(!isEnd && !this.data.loading){  
      this.setData({ loading: true }) 
      setTimeout( () =>{
        if(isFirstPage){ 
          this.setData({
            articles:this.addReadStatus(firstPage), 
            loading: false 
          })
          isFirstPage = false;
        } else{
          this.setData({
            articles: this.addReadStatus(firstPage).concat(addReadStatus(lastPage)),
            loading:false
          })
          if(lastPage.length < pageLimit){
            isEnd=true;
            this.setData({loadMoreText:'已无更多'})
          }
        }
      }, 1000)
    }
  },
  toDetailPage: function(e){
    let id=e.currentTarget.dataset.id //let定义的是局部变量，var是全局变量
    let readedArticles = wx.getStorageSync('READED_ARTICLES')

    if (!readedArticles) { 
      wx.setStorageSync('READED_ARTICLES', [id])
    }else if(readedArticles.indexOf(id) == -1){
      readedArticle.push(id)
      wx.setStorageSync('READED_ARTICLES', readedArticles)
    }
    this.setData({articles:this.addReadStatus(this.data.articles)})
    wx.navigateTo({
      url: '../detail/index?id=${id}'
    })
  },
  addReadStatus:function(articles){
    let readedArticles=wx.getStorageSync('READED_ARTICLES')
    if(!readedArticles){
      return articles
    }
    let newArticles = []
    for(let i=0;i<articles.length;i++){
      let article = Object.assign(articles[i])
      if(readedArticles.indexOf(article.id) != -1){
        article.isReaded = true
      }else{
        article.isReaded = false
      }
      newArticles.push(article)
    }
    return newArticles;
  },
})
