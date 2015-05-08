
var AppDispatcher  = require('../dispatcher/AppDispatcher')
  , EventEmitter   = require('events').EventEmitter
  , SquidConstants = require('../constants/SquidConstants')
  , SquidActions   = require('../actions/SquidActions')
  , Squid          = require('../utils/squid')
  , UserStore      = require('./UserStore')
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
var _repositories   = null
  , _isSearchActive = false

var _setRepositories = function( repositories )
{
  _repositories = repositories
}

var _setSearchVisibility = function( value )
{
  _isSearchActive = value
}

// Extend User Store with EventEmitter to add eventing capabilities
var RepositoriesStore = _.extend( {}, EventEmitter.prototype, 
{
    get: function()
    {
      return _repositories
    }

  , getSearch: function()
    {
      return _isSearchActive
    }

  , request: function()
    {
console.log('request repo')
      var xhr = Squid.apiPages( 'user/repos', {
        onComplete: function( repositories )
        {
          var orgs = UserStore.get().get('orgs')

          if( !orgs.length )
            SquidActions.receiveRepositories( new Repositories( repositories ) )
          else
          {
            var total      = orgs.length
              , done       = 0
              , self       = this

            orgs.forEach( function( org )
            {
              Squid.apiPages( org.repos_url, 
              {
                  onComplete: function( results )
                  {
                    ++done

                    repositories.push.apply( repositories, results.json )

                    if( done === total )
                      SquidActions.receiveRepositories( new Repositories( repositories ) )
                  }
              }, repositories )
            })
          }
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

    // Respond to SEARCH_VISIBLE action
    case SquidConstants.SEARCH_VISIBLE:
      _setSearchVisibility( action.state )
      break

    default:
      return true
  }

  // If action was responded to, emit change event
  RepositoriesStore.emitChange()

  return true

})

module.exports = RepositoriesStore
