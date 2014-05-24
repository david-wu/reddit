Wreddit.Views.Wall = Backbone.View.extend({
  template: JST['wall/index'],
  addTile: function(tile) {
    this.collection.add(tile);
    var renderedContent = JST['wall/tile']({
      tile: tile,
      divId: this.sub
    })
    this.$el.append(renderedContent);
  },
  loadMore: function(){
    if(this.sub.substring(0,3) === '_r_'){
      var that = this;
      this.collection.getMore(this.sub.substring(3).split(' '),
      function(newTiles){
        that.loading = false;
        for(var $i = 0; $i < newTiles.length; $i++){
          that.addTile(newTiles[$i])
        }
      })
    }else{
    }
  },
  render: function () {
    var that = this;
    this.$el.html(JST['wall/mason']({
      divId: this.sub,
      view: this
    }))
    this.collection.each(function(tile){
      that.addTile(tile);
    })
    return this;
  },
  initialize: function (options) {
    this.sub = options.sub;
    this.loading = false;
  },
})