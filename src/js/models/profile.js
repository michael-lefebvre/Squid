
var Backbone = require('Backbone')

models.profile = Backbone.Model.extend(
{
    defaults : 
    {
        name:         null
      , public_repos: null
      , avatar_url:   null
      , email:        null
    }
})
