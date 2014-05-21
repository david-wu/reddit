window.Wreddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#allTiles')
    new Wreddit.Routers.Tiles({
      rootEl: $rootEl
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Wreddit.initialize();
});
