
var AppDispatcher  = require('../dispatcher/AppDispatcher')
  , EventEmitter   = require('events').EventEmitter
  , SquidConstants = require('../constants/SquidConstants')
  , SquidActions   = require('../actions/SquidActions')
  , Squid          = require('../utils/squid')
  , _              = require('underscore')

// _private
var _profile   = false
  , _auth      = false
  , _authError = false

var _setProfile = function( profile )
{
  _profile = profile
  _auth    = _.isObject( _profile )
}

var _setOrgs = function( orgs )
{
  _profile.orgs = orgs
}

// Extend User Store with EventEmitter to add eventing capabilities
var UserStore = _.extend( {}, EventEmitter.prototype, 
{
    getProfile: function()
    {
      return _profile
    }

  , getOrgs: function()
    {
      return _profile.orgs || []
    }

  , isAuth: function()
    {
      return _auth
    }

  , hasAuthError: function()
    {
      return _authError
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

              _authError = false

              if( response.json.length )
              {
                _setOrgs( response.json )
              }
              
              SquidActions.updateUserLogin( _profile )
            })
            .catch( function( response )
            {
              console.warn('orgs error')
              console.log( response )

              SquidActions.updateUserLogin( _profile )
            })
        })
        .catch( function( response )
        {
          console.warn('Login error')
          console.log( response )

          _authError = true

          // Remove Credentials
          Squid.logout()
          // SquidActions.errorUserLogin( response.json )
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
      _setOrgs( action.orgs )
      break

    default:
      return true
  }

  // If action was responded to, emit change event
  UserStore.emitChange()

  return true

})

module.exports = UserStore
