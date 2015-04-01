
var Tray = require('./helpers/tray')
  , Xhr  = require('./helpers/xhr')
  , Gui  = window.require('nw.gui')
  , Win  = Gui.Window.get()
  , _    = require('./helpers/underscore')

var SquidCore = function()
{
  // APP'S Constants
  // -------------

  // Current version of the library.
  this._VERSION           = '0.1.0'

  // App state
  this._isVisible         = false

  // Pub/Sub channel,
  // extends the original `Backbone.Events`
  // this._event  = _.extend( {}, Backbone.Events )

  // current user's 'model
  this._user              = false

  // current user's credentials
  this._credentials       = false

  // system tray
  this._tray              = new Tray()

  // window position on display
  this._winPos            = ( ( Gui.App.manifest.window.width / 2 ) - 11 )

  // return Squid reference
  return this
}

//  App Starter point
SquidCore.prototype.init = function()
{
  // console.info( 'Initialize App router' )

  // Minimal Menu bar item
  var nativeMenuBar = new Gui.Menu({ type: "menubar" })
  
  nativeMenuBar.createMacBuiltin('Squid')

  Win.menu = nativeMenuBar

  // Events
  this._tray.get().on( 'click', _.bind( this.show, this ) )

  Win.on('blur', _.bind( this.hide, this ) )

  try {
    this.getCredentials()
  }
  catch( e ) {
    console.warn(  e.message )
  }

  var credentials  = 
      {
          username: 'michael@scenedata.com'
        , password: 'test'
      }
    , encode       = window.btoa( unescape( encodeURIComponent( [ credentials.username, credentials.password ].join(':') ) ) )

var myXHR = Xhr(
{
    url: this.formatUrl( 'user/repos' )
  , headers: 
    {
      Authorization: 'Basic ' + encode
    }
  , success : function( response )
    {
      console.log('success')
      console.log( response )
    }
  , error : function( response, status )
    {
      console.warn('error')
      console.log( this )
    }
})

  return this
}

// WINDOW DISPLAY
//-------------------------------

// Display App
SquidCore.prototype.show = function( event )
{
  if( this._isVisible )
  {
    this.hide()
    return    
  }

  Win.moveTo( ( event.x - this._winPos ), event.y )

  Win.show()
  Win.focus()

  this._isVisible = true
}

// Hide App
SquidCore.prototype.hide = function()
{
  if( !this._isVisible )
    return

  Win.hide()
  Win.blur()

  this._isVisible = false
}


// EVENTS
//-------------------------------


// CREDENTIALS / LOGIN
//-------------------------------


// Set user credentials.
// Load user settings and locales
//
//      @param   {string}   `Basic Auth` encoded string
//      @return  {void}
//
SquidCore.prototype.setCredentials = function( credentials )
{
  console.info('Set user credentials')

  this._credentials = credentials

  window.localStorage[ this._CREDENTIALSCOOKIE ] = credentials
}

// Return current user `Basic Auth` encoded credentials
//
//      @return  {object}
//
SquidCore.prototype.getCredentials = function()
{
  this._credentials = window.localStorage[ this._CREDENTIALSCOOKIE ]

  if( !this._credentials )
    throw new Error( 'User credentials are not set' )

  return this._credentials
}

// Check if current user is logged in
// If `true`, trigger `user::loggedIn` event
//
//      @return  {boolean}
//
SquidCore.prototype.isLogin = function()
{
  var credentials = this.getCredentials()

  if( !credentials )
    return false

  return true
}

// Unset user credentials. 
// Trigger `user::logout` event
//
//      @return  {void}
//
SquidCore.prototype.logout = function()
{
  console.info( 'user logout' )

  this._credentials = false

  delete window.localStorage[ this._CREDENTIALSCOOKIE ]
}


// API
//-------------------------------


// Format full URL to API service
//
//      @params  {string}  service's URL
//      @return  {string}
//
SquidCore.prototype.formatUrl = function( fragment )
{
  if( !fragment )
    throw new Error( 'Squid need a Github API method' )

  return Gui.App.manifest.serviceUrl + fragment
}

// Call a service protected by closure
//
//      @params  {string}  service name
//      @params  {object}  service arguments
//      @return  {mixed}
//
SquidCore.prototype.xhr = function( serviceName, args )
{
  var service = Helpers.getNested( Components, serviceName, false )
    , args    = args || null

  if( !service )
    throw new Error( 'Squid API do not include ' + serviceName )

  // if it's a Backbone's element ( a.k.a. a model, collection or view)
  // we create a new instance
  if( _.isFunction( service ) )
    return new service( args )

  return service
}

// Global Init

// console.groupCollapsed( 'Squid Global Init' )

module.exports = Squid = new SquidCore()

