Wreddit.Views.Wall = Backbone.View.extend({
  template: JST['wall/index'],
  addTile: function(tile) {
    var renderedContent = JST['wall/tile']({
      tile: tile
    })
    this.$el.append(renderedContent);
  },
  render: function () {
    console.log('Wall#render')
    var that = this;
    this.$el.html(JST['wall/mason']({
      divId: this.divId
    }))
    this.collection.each(function(tile){
      that.addTile(tile);
    })
    return this;
  },
  initialize: function (options) {
    this.divId = options.divId;
  },
})