Wreddit.Routers.Tiles = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.rootEl;
  },
  routes: {
    "": "index"
  },
  index: function(){
    console.log("router#index")
    var tiles = new Wreddit.Collections.Tiles();
    var tileIndexView = new Wreddit.Views.TileIndex({
      collection: tiles
    })
    this._appendView(tileIndexView);

    tiles.getMore(function(){
      tileIndexView.render();
    });
  },

  //these won't actually do the rendering
  _swapView: function (view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
  },
  _appendView: function (view){
    this.$rootEl.append(view.$el);
  }

})