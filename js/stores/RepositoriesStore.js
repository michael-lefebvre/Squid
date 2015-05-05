
var AppDispatcher  = require('../dispatcher/AppDispatcher')
  , EventEmitter   = require('events').EventEmitter
  , SquidConstants = require('../constants/SquidConstants')
  , _              = require('underscore')
  , Backbone       = require('Backbone')

var Repository = Backbone.Model.extend(
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

  , getOwner: function()
    {
      return this.get('owner').login
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

var Repositories = Backbone.Collection.extend(
{
    model: Repository

  , comparator: function( model )
    {
        return model.get('name').charAt(0).toLowerCase()
    }
    
})

// _private
var _repositories = null

var _setRepositories = function( repositories )
{
  _repositories = repositories
}

// Extend User Store with EventEmitter to add eventing capabilities
var RepositoriesStore = _.extend( {}, EventEmitter.prototype, 
{
    getRepositories: function()
    {
      return _repositories
    }

    // Emit Change event
  , emitChange: function() 
    {
      this.emit('change')
    }

    // Add change listener
  , addChangeListener: function( callback ) 
    {
      this.on( 'change', callback )
    }

    // Remove change listener
  , removeChangeListener: function( callback ) 
    {
      this.removeListener( 'change', callback )
    }
})

// Register callback with AppDispatcher
AppDispatcher.register( function( payload )
{
  var action = payload.action
    , text

  switch( action.actionType )
  {
    // Respond to USER_LOGIN action
    case SquidConstants.REPO_LOAD:
      _setRepositories( action.repositories )
      break

    default:
      return true
  }

  // If action was responded to, emit change event
  RepositoriesStore.emitChange()

  return true

})

module.exports = RepositoriesStore
