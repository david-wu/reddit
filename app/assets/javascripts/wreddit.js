window.Wreddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#allTiles')
    var $minorEl = $('#allOthers')
    new Wreddit.Routers.Tiles({
      rootEl: $rootEl,
      minorEl: $minorEl,
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Wreddit.initialize();
});
