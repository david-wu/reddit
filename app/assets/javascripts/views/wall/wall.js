//initialize
//render
//loadMore or addTile

Wreddit.Views.Wall = Backbone.View.extend({
  template: JST['wall/index'],
  addTile: function(tile) {
    this.collection.add(tile);
    var renderedContent = JST['wall/tile']({
      tile: tile,
      wallName: this.wallName
    })
    this.$el.append(renderedContent);
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
      //
      // receive: function (event, ui) {
      //           event.preventDefault();
      //   console.log("receive", event, ui);
      // },
      stop: function (event, ui) {
                event.preventDefault();
        console.log("stop", event, ui);
      },
    })

    $('.wall-link').sortable({
      items: ".wall-link",
      tolerance: 'pointer',
      placeholder: '#nothing',
      connectWith: ".wall-link",
      // receive: function (event, ui) {
      //           event.preventDefault();
      //   console.log("receive", event, ui);
      // },
      // stop: function (event, ui) {
      //           event.preventDefault();
      //   console.log("stop", event, ui);
      // },
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