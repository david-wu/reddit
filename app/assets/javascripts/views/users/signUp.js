Wreddit.Views.SignUp = Backbone.View.extend({
  template: JST['users/signUp'],
  render: function () {
    console.log('UserNew#render')
    var renderedContent = this.template({
    });
    this.$el.html(renderedContent);
    return this;
  },
  events: {
    'click #sign-up-btn': 'signUp'
  },
  signUp: function (event){
    event.preventDefault();
    var attrs = $(event.target.form).serializeJSON();
    console.log(attrs);
  }
})