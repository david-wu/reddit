Wreddit.Routers.Tiles = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.rootEl;
    this.$minorEl = options.minorEl;
  },
  routes: {
    "index": "index",
    "showUser/:id": "showUser",
    "newUser": "signUp",
    "newSession": "signIn"
  },
  index: function(){
    console.log("router#index")
    this.$rootEl.show();
    this.$minorEl.html('');
    var that = this;


    var tiles = new Wreddit.Collections.Tiles();
    var tileIndexView = new Wreddit.Views.TileIndex({
      collection: tiles
    })
    this._appendView(tileIndexView);

    tiles.getMore(function(){
      tileIndexView.render();
      // that._restartMasonry();
    });

  },

  signUp: function () {
    console.log("router#signUp:")
    this.$rootEl.hide();
    this.$minorEl.show();

    var newUserView = new Wreddit.Views.SignUp({})
    this._swapMinorView(newUserView);
    newUserView.render();

  },

  signIn: function () {
    console.log("router#signIn:")
    this.$rootEl.hide();
    this.$minorEl.show();

    var newUserView = new Wreddit.Views.SignIn({})
    this._swapMinorView(newUserView);
    newUserView.render();

  },

  showUser: function (user_id) {
    console.log("router#showUser:"+user_id)
    this.$rootEl.show()

  },

  //these won't actually do the rendering
  _swapView: function (view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
  },
  _toggleTileView: function (){
    if (this._hidden){
      this._hidden = false;
      $('#allTiles').show();
    } else{
      this._hidden = true;
      $('#allTiles').hide();
    }
  },
  _appendView: function (view){
    this._currentView = view
    this.$rootEl.append(view.$el);
  },

  _swapMinorView: function (view){
    this._minorView && this._minorView.remove();
    this._minorView = view;
    this.$minorEl.html(view.$el);
  },


  _restartMasonry: function () {
    var that = this;
    if(this.msnry){
      this.msnry.destroy();
    }
    var container = document.querySelector('#allTiles');
    this.msnry = new Masonry( container, {
      itemSelector: '.tile',
      columnWidth: 375,
    });

  },

  _startMasonry: function(){
    if(!this.msnry){
      var container = document.querySelector('#allTiles');
      this.msnry = new Masonry( container, {
        itemSelector: '.tile',
        columnWidth: 375,
      });
    }
  }
})