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
    if(!this.walls[sub]){
      this._createWall(sub, 'sub');
      var wall = this.walls[sub]
      wall.collection.getMore(sub.split(' '),function(){
        wall.view.render();
      });
    }
   this._swapWall(wall);
  },
  visitFeed: function(feed){
    if(!this.walls[feed]){
      this._createWall(feed, 'feed');
      var feed = this.walls[feed]
      feed.collection.fetch({
        success: function(){
          feed.view.render();
        }
      });
    }
   this._swapWall(feed);
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
  _createWall: function (sub, type) {
    if (type==='sub'){
      $parentOfLinkToWall = $('#allWall-links')
    }else{
      $parentOfLinkToWall = $('#allFeed-links')
    }

    var wall = this.walls[sub] = {};
    //tiles collection and view won't be removed
    wall['name'] = sub;

    wall['collection'] = new Wreddit.Collections.Tiles();
    wall['view'] = new Wreddit.Views.Wall({
      collection: wall['collection'],
      tagName: "div id='"+sub+"'",
      sub: sub,
    })
    $('#allWalls').append(wall.view.$el);
    $parentOfLinkToWall.prepend('<li draggable="true" ondragstart="drag(event)" id='+sub+'-wall-link> <a href="#r/'+sub+'"id="all-wall-link">'+sub+'</a></li>');
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