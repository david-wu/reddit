Wreddit.Views.TileIndex = Backbone.View.extend({
  template: JST['tiles/index'],
  render: function () {
    console.log('TileIndex#render')
    var renderedContent = this.template({
      tiles: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  },
  initialize: function () {
    //this.listenTo(this.collection, "add", this.render);
  },

})