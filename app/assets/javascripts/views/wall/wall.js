//initialize
//render
//loadMore or addTile

Wreddit.Views.Wall = Backbone.View.extend({
  template: JST['wall/index'],
  addTile: function(tile) {
    this.collection.add(tile);
    var renderedContent = JST['wall/tile']({
      tile: tile,
      wallName: this.wallName
    })
    this.$el.append(renderedContent);
  },
  loadMore: function(){
    this.loading = true;
    var that = this;

    if(this.type === 'sub'){

      this.collection.getMore(this.wallName.split(' '),
        function(newTiles){
          that.loading = false;
          for(var $i = 0; $i < newTiles.length; $i++){
            that.addTile(newTiles[$i])
          }
      })
    } else if(this.type === 'feed'){
      this.collection.fetch();
    }
  },
  render: function () {
    var that = this;
    this.$el.html(JST['wall/mason']({
      wallName: this.wallName,
      view: this,
    }))
    this.collection.each(function(tile){
      that.addTile(tile);
    })

    return this;
  },
  initialize: function (options) {
    this.type = options.type;
    this.wallName = options.wallName;
    this.loading = false;
  },
})