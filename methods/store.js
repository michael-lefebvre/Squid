
var AppDispatcher = require('./dispatcher')
  , EventEmitter  = require('events').EventEmitter
  // , TodoConstants = require('../constants/TodoConstants')
  , assign        = require('object-assign')
  , Squid         = require('./squid')

var CHANGE_EVENT  = 'change'

var APP_STATES    = {
    isUserLogged:   false
  , isSearchOpened: false
}


var userAuth = function( obj ) 
{
  Squid.setCredentials( obj.hash )

  var myXHR = Squid.api( 'user', 
  {
      success : function( response )
      {
        console.info('Login succeeded')
        console.log( response )

        Squid.setUser( response )

        // PubSub.publish( 'squid::userLogged' )

        // self.showRepositories()

        if( _.isFunction( obj.success ) )
          obj.success( response )
      }
    , error : function( response )
      {
        console.warn('error')
        console.log( response )

        // Remove Credentials
        Squid.logout()

        if( _.isFunction( obj.error ) )
          obj.error( response )
      }
  })
}

var userLogout = function()
{
  Squid.logout()
}



var SquidStore = assign({}, EventEmitter.prototype, 
{
    emitChange: function() 
    {
      this.emit( CHANGE_EVENT )
    }

    /**
     * @param {function} callback
     */
  , addChangeListener: function( callback )
    {
      this.on( CHANGE_EVENT, callback )
    }

    /**
     * @param {function} callback
     */
  , removeChangeListener: function( callback )
    {
      this.removeListener( CHANGE_EVENT, callback )
    }
})

// Register callback to handle all updates
AppDispatcher.register( function( action )
{
  var text

  switch( action.actionType )
  {

    case 'login':
      userAuth( action )
      SquidStore.emitChange()
      break;

    default:
      // no op
  }
})

module.exports = SquidStore
