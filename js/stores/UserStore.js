
var AppDispatcher  = require('../dispatcher/AppDispatcher')
  , EventEmitter   = require('events').EventEmitter
  , SquidConstants = require('../constants/SquidConstants')
  , SquidActions   = require('../actions/SquidActions')
  , Squid          = require('../utils/squid')
  , _              = require('underscore')

// _private
var _profile = false

var _setProfile = function( profile )
{
  _profile = profile
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

  , requestUserApi: function()
    {
      var self = this
        , xhr  = Squid.api( 'user', 
          {
              success : function( response )
              {
                console.info('Login succeeded')
                console.log( response )

                _setProfile( response )
                self.requestOrgsApi()
              }
            , error : function( response )
              {
                console.warn('error')
                console.log( response )

                // Remove Credentials
                Squid.logout()
              }
          })
    }

  , requestOrgsApi: function()
    {
      var myXHR = Squid.api( 'user/orgs', 
      {
          success : function( response )
          {
            // console.info('user orgs succeeded')
            // console.log( response )

            if( response.length )
            {
              _setOrgs( response )
            }

            SquidActions.updateUserLogin( _profile )

            // self.showRepositories()
          }
        , error : function( response )
          {
            console.warn('error')
            console.log( response )
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
