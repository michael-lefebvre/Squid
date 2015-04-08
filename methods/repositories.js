
var Backbone   = require('Backbone')
  , Repository = require('./repository')

module.exports = Repositories = Backbone.Collection.extend(
{
    model: Repository

  , comparator: function( model )
    {
        return model.get('name').charAt(0).toLowerCase()
    }
    
})