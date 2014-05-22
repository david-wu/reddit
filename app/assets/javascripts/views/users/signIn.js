Wreddit.Views.SignIn = Backbone.View.extend({
  template: JST['users/signIn'],
  render: function () {
    console.log('UserNew#render')
    var renderedContent = this.template({
    });
    this.$el.html(renderedContent);
    return this;
  },
})