Wreddit.Routers.Tiles = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.rootEl;
    this.$minorEl = options.minorEl;

    //tiles collection and view won't be removed
    this.tiles = new Wreddit.Collections.Tiles();
    this.tileIndexView = new Wreddit.Views.TileIndex({
      collection: this.tiles
    })
    this.$rootEl.html(this.tileIndexView.$el);
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


    this.tiles.getMore(function(){
      that.tileIndexView.render();
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