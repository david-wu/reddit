Wreddit.Routers.Tiles = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.rootEl;
    this.$minorEl = options.minorEl;
    this.walls = {};
  },
  routes: {
    "index": "index",
    "feed": "feed",
    "showUser/:id": "showUser",
    "newUser": "signUp",
    "newSession": "signIn",
  },
  index: function(){
    console.log("router#index")
    this.$rootEl.show();
    this.$minorEl.html('');

    $('#index-wall').show()

    if(!this.walls['index']){
      this._createWall('index');
    }
    var that = this;
    var wall = this.walls['index'];

    //this will only be run the first time
    if(wall.collection.length === 0){
      wall.collection.getMore(['all'],function(){
        wall.view.render();
      });
    }

   // this._swapWall(wall);
  },
  feed: function(){
    console.log("router#index")
    this.$rootEl.show();
    this.$minorEl.html('');


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


  //shows showWall, hides all other walls
  _swapWall: function (showWall){

    this.walls.each(function(wall){
      console.log(wall)
      if(wall !== showWall){
        $('#'+wall.name).hide();
      }
    })
    $('#'+showWall.name).show();
  },
  _swapView: function (view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
  },
  _swapMinorView: function (view){
    this._minorView && this._minorView.remove();
    this._minorView = view;
    this.$minorEl.html(view.$el);
  },
  //this creates a tileView and stores into this.tileViews
  _createWall: function (name) {
    var wall = this.walls[name] = {};
    //tiles collection and view won't be removed
    wall['name'] = name;
    wall['collection'] = new Wreddit.Collections.Tiles();
    wall['view'] = new Wreddit.Views.Wall({
      collection: wall['collection'],
      tagName: "div id='"+name+"'",
      divId: name,
    })
    this.$rootEl.html(wall.view.$el);
  }
})