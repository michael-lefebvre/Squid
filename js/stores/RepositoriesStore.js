
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
    get: function()
    {
      return _repositories
    }

  , request: function()
    {
      // var self = this
      //   , xhr  = Squid.api( 'user' )

      // // Get User profile
      // xhr.get()
      //   .then( function( response )
console.log('request repo')
      Squid.apiPages( 'user/repos', {
        onComplete: function( results )
        {
console.log( results )
          // var user = Squid.getUser()
          //   , orgs = user.get('orgs')

          // if( !orgs.length )
          //   self.handleRepositoriesLoaded( new Collection( results ) )
          // else
          //   self.requestAllOrgsRepos( results, orgs )
        }
      })
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
    // Respond to REPO_LOAD action
    case SquidConstants.REPO_LOAD:
      _setRepositories( action.repositories )
      break

    // Respond to REPO_CALL action
    case SquidConstants.REPO_CALL:
      RepositoriesStore.request()
      break

    default:
      return true
  }

  // If action was responded to, emit change event
  RepositoriesStore.emitChange()

  return true

})

module.exports = RepositoriesStore
