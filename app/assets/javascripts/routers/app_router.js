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

    //creates a wall and populates
    if(!this.walls['index']){
      this._createWall('index');
    }
    var wall = this.walls['index'];
    if(wall.collection.length === 0){
      wall.collection.getMore(['all'],function(){
        wall.view.render();
      });
    }

   this._swapWall(wall);
  },
  feed: function(){
    console.log("router#feed")
    this.$rootEl.show();
    this.$minorEl.html('');

    //creates a wall and populates
    if(!this.walls['feed']){
      this._createWall('feed');
    }
    var wall = this.walls['feed'];
    if(wall.collection.length === 0){
      wall.collection.getMore(['aww'],function(){
        wall.view.render();
      });
    }


   this._swapWall(wall);
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
    console.log("_swapWall("+showWall.name+")")
    //hide all walls, then show showWall
    wallsArr = Object.keys(this.walls);
    for(var $i = 0; $i < wallsArr.length; $i++){
      this.walls[wallsArr[$i]].view.$el.hide();
    }
    showWall.view.$el.show();
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
    this.$rootEl.append(wall.view.$el);
  }
})