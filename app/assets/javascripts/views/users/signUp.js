Wreddit.Views.SignUp = Backbone.View.extend({
  template: JST['users/signUp'],
  render: function () {
    console.log('UserNew#render')
    var renderedContent = this.template({
    });
    this.$el.html(renderedContent);
    return this;
  },
})