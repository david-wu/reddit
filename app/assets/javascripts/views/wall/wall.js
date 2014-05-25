//initialize
//render
//loadMore or addTile

Wreddit.Views.Wall = Backbone.View.extend({
  template: JST['wall/index'],
  addTile: function(tile) {

      console.log('adding tile1')

      var that = this;
      that.collection.add(tile);
      var renderedContent = JST['wall/tile']({
        tile: tile,
        wallName: that.wallName,
        stealthAdd: false
      })

      that.$el.append(renderedContent);
    // }
  },
  addTile2: function(tile) {
          var that = this;

    if(that.collection._isUnique(tile)){

      console.log('adding tile2')


      that.collection.add(tile);
      var renderedContent = JST['wall/tile']({
        tile: tile,
        wallName: that.wallName,
        stealthAdd: true,
      })
      that.$el.append(renderedContent);
    }
  },
  loadMore: function(){
    this.loading = true;
    var that = this;

    if(this.type === 'sub'){

      this.collection.getMore(this.wallName.split(' '),
        function(newTiles){
          that.loading = false;
          for(var $i = 0; $i < newTiles.length; $i++){
            that.addTile(newTiles[$i])
          }
      })
    } else if(this.type === 'feed'){
      this.collection.fetch({
        success: function(){
          console.log("david, work on rails. serious")
        },
      })
    }
  },
  render: function () {
    var that = this;

    this.collection.each(function(tile){
      that.addTile(tile);
    })

    $('.wall.'+this.wallName).sortable({
      items: ".tile",
      tolerance: 'pointer',
      connectWith: ".wall-link",
      placeholder: '#nothing',
      start: function(event, ui) {
        event.preventDefault;
      },
      receive: function(event, ui) {
        event.preventDefault;
      },
      stop: function (event, ui) {
        event.preventDefault();

        var sentModel = window.Wreddit.router.subs[ui.item[0].classList[0]].collection.get(ui.item[0].id);
        var targetView = window.Wreddit.router.feeds[event.toElement.firstChild.data].view;

        // console.log(sentModel, targetView);
        targetView.addTile2(sentModel);
      },
    })

    $('.wall-link').sortable({
      items: ".wall-link",
      tolerance: 'pointer',
      connectWith: ".wall-link",
      start: function(event, ui) {
        event.preventDefault;
      },
      receive: function(event, ui) {
        event.preventDefault;
      },
      stop: function(event, ui) {
        event.preventDefault;
      },

    })

    return this;
  },
  initialize: function (options) {
    this.type = options.type;
    this.wallName = options.wallName;
    this.loading = false;

    this.$el.html(JST['wall/mason']({
      wallName: this.wallName,
      view: this,
    }))



  },
})