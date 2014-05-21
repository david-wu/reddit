Wreddit.Collections.Tiles = Backbone.Collection.extend({
  getMore: function(callback){
    var that = this;
    console.log("tiles#getMore");

    $.getJSON(
      "http://www.reddit.com/r/aww.json?count=25&jsonp=?", function foo(data){
        $.each(
          data.data.children.slice(0, 25),
          function (i, post) {
            var tile = new Wreddit.Models.Tile(post.data)

            //set tile.imgSrc and stores into this collection
            //albums not working
            url = tile.get('url')
            var lastFour = url.substring(url.length-4, url.length)
            var picFormats = ['.jpg', '.png', '.gif']
            var imgDomains = ['imgur.com', 'm.imgur.com', 'i.imgur.com']
            if (picFormats.indexOf(lastFour) !== -1) {
              tile.set('imgSrc', tile.get('url'));
            } else {
              if (imgDomains.indexOf(tile.get("domain")) !== -1){
                tile.set('imgSrc', tile.get('url')+".jpg")
              }else{
                tile.set('imgSrc', 'http://pagepeeker.com/thumbs.php?size=x&url='+tile.get('url'))
              }
            }
            that.add(tile);

          }
        )
        callback();
      }
    )




  },
  initialize: function (){

  }
})