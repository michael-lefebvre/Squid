
var Backbone = require('Backbone')

module.exports = Profile = Backbone.Model.extend(
{
    defaults : 
    {
        name:         null
      , public_repos: null
      , avatar_url:   null
      , email:        null
    }

  , getProfileUrl: function()
    {
      return this.get('html_url')
    }
})
