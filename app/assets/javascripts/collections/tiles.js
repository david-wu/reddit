Wreddit.Collections.Tiles = Backbone.Collection.extend({
  getMore: function(subrs, callback){
    var that = this;
    var subs = subrs.join('+');
    console.log("tiles#getMore");

    $.getJSON(
      "http://www.reddit.com/r/"+subs+".json?limit=25&jsonp=?", function foo(data){
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
            if (that._isUnique(tile)){
              that.add(tile);
            }


          }
        )
        callback();
      }
    )




  },
  initialize: function (){

  },
  _isUnique: function(candidateTile){

    this.each(function(tile){
      if(tile.get('url') === candidateTile.get('url')){
        return false;
      }
    })
    return true;
  }
})