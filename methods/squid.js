
var Tray = require('./helpers/tray')
  , Gui  = window.require('nw.gui')
  , Win  = Gui.Window.get()
  , _    = require('underscore')

var SquidCore = function()
{
  // APP'S Constants
  // -------------

  // Current version of the library.
  this._VERSION     = '0.1.0'

  // User credentials localStorage's item name
  this._CREDENTIALS = 'SquidCredentials'

  // App state
  this._isVisible   = false

  // current user's 'model
  this._user        = false

  // current user's credentials
  this._credentials = false

  // system tray
  this._tray        = new Tray()

  // window position on display
  this._winPos      = ( ( Gui.App.manifest.window.width / 2 ) - 11 )

  // return Squid reference
  return this
}

//  App Starter point
SquidCore.prototype.init = function()
{
  // Minimal Menu bar item
  var nativeMenuBar = new Gui.Menu({ type: "menubar" })
  
  nativeMenuBar.createMacBuiltin('Squid')

  Win.menu = nativeMenuBar

  // Register window events
  this._tray.get().on( 'click', _.bind( this.show, this ) )

  // Win.on('blur', _.bind( this.hide, this ) )

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


// CREDENTIALS / LOGIN
//-------------------------------


// Set user credentials.
//
//      @param   {string}   `Basic Auth` encoded string
//      @return  {void}
//
SquidCore.prototype.setCredentials = function( credentials )
{
  console.info('Store user encoded credentials')

  this._credentials = credentials

  window.localStorage[ this._CREDENTIALS ] = credentials
}

// Return current user `Basic Auth` encoded credentials
//
//      @return  {object}
//
SquidCore.prototype.getCredentials = function()
{
  this._credentials = window.localStorage[ this._CREDENTIALS ]

  if( !this._credentials )
    throw new Error( 'User credentials are not set' )

  return this._credentials
}

// Check if current user is logged in
//
//      @return  {boolean}
//
SquidCore.prototype.isLogin = function()
{
  try {
    return this.getCredentials()
  }
  catch( e ) 
  {
    console.warn(  e.message )

    return false
  }
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

  delete window.localStorage[ this._CREDENTIALS ]
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

// Call a Github service
//
//      @params  {string}  service url
//      @params  {object}  xhr options
//      @return  {mixed}
//
SquidCore.prototype.api = function( service, options )
{
  // check response status
  var isSuccessStatus = function ( status )
  {
    return status >= 200 && status < 300 || status == 304
  }

  try
  {
    var url = this.formatUrl( service )
  }
  catch( e )
  {
    console.warn( e.message )

    return false
  }

  try 
  {
    var encoded = this.getCredentials()
  }
  catch( e ) 
  {
    console.warn( e.message )

    return false
  }

  options = _.extend( options || {}, {
    headers:  {
      Authorization: 'Basic ' + encoded
    }
  })
  
  var xhr   = new XMLHttpRequest()
    , done  = false
    , async = options.hasOwnProperty('async') ? options.async : true

  xhr.open( options.method || 'GET', url, async )

  xhr.onreadystatechange = function()
  {
    if( done ) return
    if( this.readyState != 4 ) return

    done = true

    if( isSuccessStatus( this.status ) )
    {
      // if success and has callback
      // return json parsed response
      if( options.success )
        options.success( JSON.parse( this.response ) )

      return
    }

    if( options.error )
      options.error( this.statusText, this )
  }

  Object.keys( options.headers || {} )
    .forEach( function( key )
    {
      xhr.setRequestHeader( key, options.headers[ key ] )
    })

  xhr.send( options.data || null )

  return xhr
}


// Global Init

module.exports = Squid = new SquidCore()

