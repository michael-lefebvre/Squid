
var Backbone = require('Backbone')

module.exports = Repository = Backbone.Model.extend(
{
    defaults : 
    {
        name:         null
      , full_name:    null
      , private:      false
      , html_url:     null
    }
    
  , getAvatar: function()
    {
      var owner = this.get('owner')

      return owner.avatar_url + '&s=34'
    }

  , getUrl: function()
    {
      return this.get('html_url')
    }

  , getDesc: function()
    {
      return this.get('description')
    }

  , searchable: function()
    {
      return this.get('full_name').toLowerCase()
    }
})
