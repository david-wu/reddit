Wreddit.Routers.Tiles = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.rootEl;
    this.$minorEl = options.minorEl;
    this.subs = {};
    this.feeds = {};
  },
  routes: {
    "r/:sub": "visitSubWall",
    "f/:feed": "visitFeed",
    "showUser/:id": "showUser",
    "newUser": "signUp",
    "newSession": "signIn",
  },
  visitSubWall: function(subName){
    if(!this.subs[subName]){
      this._createWall(subName, 'sub');
      this.subs[subName].view.render();
    }
    this._swapWall(this.subs[subName]);
  },
  visitFeed: function(feedName){
    if(!this.feeds[feedName]){
      this._createWall(feedName, 'feed');
      this.feeds[feedName].view.render();
    }
    this._swapWall(this.feeds[feedName]);
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
  _createWall: function (wallName, type) {
    if (type === 'sub'){
      var $parentOfLinkToWall = $('#allWall-links')
      var typeId = 'r/'
      var wall = this.subs[wallName] = {};
    }else if (type === 'feed'){
      var $parentOfLinkToWall = $('#allFeed-links')
      var typeId = 'f/'
      var wall = this.feeds[wallName] = {};
    }

    wall['name'] = wallName;
    wall['collection'] = new Wreddit.Collections.Tiles();
    wall['view'] = new Wreddit.Views.Wall({
      collection: wall['collection'],
      tagName: "div class='wall "+wallName+"'",
      wallName: wallName,
      type: type
    })
    $('#allWalls').append(wall['view'].$el);

    $parentOfLinkToWall.prepend('<li ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" id=_link'+wallName+'> <a href="#'+typeId+wallName+'" id="all-wall-link">'+wallName+'</a></li>');
  },

  //hide all walls, then show showWall
  _swapWall: function (showWall){

    console.log("_swapWall("+showWall.name+")")
    this.$minorEl.hide();
    this.$rootEl.show();

    subsArr = Object.keys(this.subs);
    for(var $i = 0; $i < subsArr.length; $i++){
      this.subs[subsArr[$i]].view.$el.hide();
    }
    feedsArr = Object.keys(this.feeds);
    for(var $i = 0; $i < feedsArr.length; $i++){
      this.feeds[feedsArr[$i]].view.$el.hide();
    }
    showWall.view.$el.show();

    //keep calling loadMore() until page is full
    function initialLoadMore () {
      if($(document).height() > $(window).height()*1.4){
        return false;
      } else if(!showWall.view.loading){
        showWall.view.loading = true;
        showWall.view.loadMore();
      }
      window.setTimeout(initialLoadMore, 250)
    }
    initialLoadMore();
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