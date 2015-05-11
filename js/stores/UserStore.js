
var AppDispatcher  = require('../dispatcher/AppDispatcher')
  , EventEmitter   = require('events').EventEmitter
  , Backbone       = require('Backbone')
  , SquidConstants = require('../constants/SquidConstants')
  , SquidActions   = require('../actions/SquidActions')
  , Squid          = require('../utils/squid')
  , _              = require('underscore')

var Profile = Backbone.Model.extend(
{
    _authError: false

  , defaults : 
    {
        name:         null
      , public_repos: null
      , avatar_url:   null
      , email:        null
      , orgs:         []
    }

  , getName: function()
    {
      if( !_.isUndefined( this.get('name') ) )
        return this.get('name')

      return this.get('login')
    }

  , getProfileUrl: function()
    {
      return this.get('html_url')
    }

  , getAvatar: function()
    {
      return this.get('avatar_url') + '&s=34'
    }

  , setOrgs: function( orgs )
    {
      this.set( 'orgs', orgs )
    }

  , setAuthError: function( value )
    {
      this._authError = value
    }

  , hasAuthError: function()
    {
      return this._authError
    }

  , isLogged: function()
    {
      return !_.isUndefined( this.id )
    }
})


// _private
var _profile   = new Profile()

var _setProfile = function( profile )
{
  if( profile )
  {
    _profile.setAuthError( false )
    _profile.set( profile )
  }
  else
  {
    Squid.logout()
    _profile.clear()
  }
}

// Extend User Store with EventEmitter to add eventing capabilities
var UserStore = _.extend( {}, EventEmitter.prototype, 
{
    get: function()
    {
      return _profile
    }

  , requestUserApi: function()
    {
      var self = this
        , xhr  = Squid.api( 'user' )

      // Get User profile
      xhr.get()
        .then( function( response )
        {
          console.info('Login succeeded')
          _setProfile( response.json )

          // Nested Request:
          // if we succeeded auth 
          // we ask the user Orgs.
          // It's a little dirty but
          // we have no alternative
          xhr.setUrl( Squid.formatUrl( 'user/orgs') )
            .get()
            .then( function( response )
            {
              console.info('Orgs succeeded')

              if( response.json.length )
              {
                _profile.set( 'orgs', response.json )
              }
              
              SquidActions.updateUserLogin( _profile )
              SquidActions.requestRepositories()
            })
            .catch( function( response )
            {
              console.warn('orgs error')
              console.log( response )

              SquidActions.updateUserLogin( _profile )
              SquidActions.requestRepositories()
            })
        })
        .catch( function( response )
        {
          console.warn('Login error')
          console.log( response )

          // Remove Credentials
          Squid.logout()
          _profile.setAuthError( true )
          SquidActions.updateUserLogin( false )
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
    // Respond to USER_LOGIN action
    case SquidConstants.USER_LOGIN:
      _setProfile( action.profile )
      break

    // Respond to USER_ORGS action
    case SquidConstants.USER_ORGS:
      _profile.set( 'orgs', action.orgs )
      break

    default:
      return true
  }

  // If action was responded to, emit change event
  UserStore.emitChange()

  return true

})

module.exports = UserStore
