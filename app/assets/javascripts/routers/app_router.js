Wreddit.Routers.Tiles = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.rootEl;
    this.$minorEl = options.minorEl;
    this.walls = {};
  },
  routes: {
    "feed": "feed",
    "showUser/:id": "showUser",
    "newUser": "signUp",
    "newSession": "signIn",
    "r/:sub": "visitSubWall",
    "f/:feed": "visitFeed"
  },
  visitSubWall: function(sub){
    var sub = "_r_"+sub;
    if(!this.walls[sub]){
      this._createWall(sub, 'sub');
      var wall = this.walls[sub]
      wall.collection.getMore(sub.substring(3).split(' '),function(){
        wall.view.render();
      });
    }
   this._swapWall(this.walls[sub]);
  },
  visitFeed: function(feed){
    var feed = "_f_"+feed;
    if(!this.walls[feed]){
      this._createWall(feed, 'feed');
      var wall = this.walls[feed]
      wall.collection.fetch({
        success: function(){
          wall.view.render();
        }
      });
    }

   this._swapWall(this.walls[feed]);
  },
  signUp: function () {
    if(!this.newUserView){
      this.newUserView = new Wreddit.Views.SignUp({})
    }
    this.newUserView.render();
    this._swapView(this.newUserView);
  },
  signIn: function () {
    if(!this.newSessionView){
      this.newSessionView = new Wreddit.Views.SignIn({})
    }
    this.newSessionView.render();

    this._swapView(this.newSessionView);
  },
  showUser: function (user_id) {
    console.log("router#showUser:"+user_id)
    this.$rootEl.show()
  },


  //this creates a tileView and stores into this.tileViews
  _createWall: function (name, type) {
    if (type === 'sub'){
      var $parentOfLinkToWall = $('#allWall-links')
      var type = 'r/'
    }else{
      var $parentOfLinkToWall = $('#allFeed-links')
      var type = 'f/'
    }

    var wall = this.walls[name] = {};
    wall['name'] = name;
    wall['collection'] = new Wreddit.Collections.Tiles();
    wall['view'] = new Wreddit.Views.Wall({
      collection: wall['collection'],
      tagName: "div id='"+name+"'",
      sub: name,
    })
    $('#allWalls').append(wall.view.$el);
    $parentOfLinkToWall.prepend('<li ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" id=_link'+name+'> <a href="#'+type+name.substring(3)+'" id="all-wall-link">'+name.substring(3)+'</a></li>');
  },

  //hide all walls, then show showWall
  _swapWall: function (showWall){

    console.log("_swapWall("+showWall.name+")")
    this.$minorEl.hide();
    this.$rootEl.show();
    wallsArr = Object.keys(this.walls);
    for(var $i = 0; $i < wallsArr.length; $i++){
      this.walls[wallsArr[$i]].view.$el.hide();
    }
    showWall.view.$el.show();
  },

  _swapView: function (view){
    console.log("_swapView("+view+")")
    this.$minorEl.show();
    this.$rootEl.hide();
    this.$minorEl.html(view.$el);
  },

  _swapMinorView: function (view){
    this._minorView && this._minorView.remove();
    this._minorView = view;
    this.$minorEl.html(view.$el);
  },

})