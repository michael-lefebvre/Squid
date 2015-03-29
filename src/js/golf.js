
var GolfCore = function()
{
  // APP'S Constants
  // -------------

  // Current version of the library.
  this._VERSION           = '0.1.0'

  // App state
  this._isVisible         = false

  // Pub/Sub channel,
  // extends the original `Backbone.Events`
  this._event  = _.extend( {}, Backbone.Events )

  // current user's 'model
  this._user              = false

  // current user's credentials
  this._credentials       = false

  // system tray
  this._tray              = new tray()

  // window position on display
  this._winPos            = ( ( gui.App.manifest.window.width / 2 ) - 15 )

  // return Golf reference
  return this
}

//  App Starter point
GolfCore.prototype.init = function()
{
  console.info( 'Initialize App router' )

  // Events
  this._tray._tray.on( 'click', _.bind( this.show, this ) )

  win.on('blur', _.bind( this.hide, this ) )

  return this
}

// APP DISPLAY
//-------------------------------

// Display App
GolfCore.prototype.show = function( event )
{
console.log('call show')
  if( this._isVisible )
  {
    this.hide()
    return    
  }

  win.moveTo( ( event.x - this._winPos ), event.y )

  win.show()
  win.focus()

  this._isVisible = true
}

// Hide App
GolfCore.prototype.hide = function()
{
  if( !this._isVisible )
    return

  console.log('hideWindow')
  win.hide()
  win.blur()

  this._isVisible = false
}


// EVENTS
//-------------------------------

// Backbone's events shortcuts

// Bind an event to a `callback` function. Passing `"all"` will bind
// the callback to all events fired.
// 
//      @param   {string}   event's name
//      @param   {function} the callback
//      @param   {function} scope context
//      @return  {void}
//
GolfCore.prototype.on = function( name, callback, context )
{
  this._event.on( name, callback, context )
}

// Bind an event to only be triggered a single time. After the first time
// the callback is invoked, it will be removed.
// 
//      @param   {string}   event's name
//      @param   {function} the callback
//      @param   {function} scope context
//      @return  {void}
//
GolfCore.prototype.once = function( name, callback, context )
{
  this._event.once( name, callback, context )
}


// Remove one or many callbacks. If `context` is null, removes all
// callbacks with that function. If `callback` is null, removes all
// callbacks for the event. If `name` is null, removes all bound
// callbacks for all events.
//
//      @return  {void}
//

GolfCore.prototype.off = function( name, callback, context )
{
  this._event.off( name, callback, context )
}

// Trigger one or many events, firing all bound callbacks. Callbacks are
// passed the same arguments as `trigger` is, apart from the event name
// (unless you're listening on `"all"`, which will cause your callback to
// receive the true name of the event as the first argument).
// 
//      @return  {void}
//
// TODO: `args1... oh my god ! need to find a better solution
GolfCore.prototype.trigger = function( args1, args2, args3, args4, args5, args6, args7 )
{
/*
var args = [].slice.call( arguments, 1 )
console.log( arguments )
this._event.trigger.apply( this, arguments )
*/

  this._event.trigger( args1, args2, args3, args4, args5, args6, args7 )
}


// COOKIES
//-------------------------------


// get Cookie
//
//      return  {mixed}
//
GolfCore.prototype.getCookie = function( cookieName )
{
  console.groupCollapsed( 'get cookie: ' + cookieName )

  if( !document.cookie )
  {
    console.warn('no cookie for this domain')
    console.groupEnd()
    return false
  }

  // retrive data from cookies
  var data = decodeURIComponent( 
    document.cookie.replace( 
      new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent( cookieName ).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1"
    )
  ) || null
  
  console.log( document.cookie )
  console.log( data )
  
  if( data === 'null' )
  {
    console.warn('cookie "' + cookieName + '" found but data are null')
    console.groupEnd()

    return false
  }

  console.groupEnd()
  return data
}

// set Cookie
//
//      return  {void}
//
GolfCore.prototype.setCookie = function( cookieName, value, expire )
{
  document.cookie = cookieName + '=' + value + '; path=/'
}


// CREDENTIALS / LOGIN
//-------------------------------


// Set user credentials.
// Load user settings and locales
//
//      @param   {string}   `Basic Auth` encoded string
//      @return  {void}
//
GolfCore.prototype.setCredentials = function( credentials )
{
  console.info('Set user credentials')

  this._credentials = credentials

  this.setCookie( this._CREDENTIALSCOOKIE, this._credentials )
}

// Return current user `Basic Auth` encoded credentials
//
//      @return  {object}
//
GolfCore.prototype.getCredentials = function()
{
  if( !this._credentials )
    throw new Error( 'User credentials are not set' )

  return this._credentials
}

// Check if current user is logged in
// If `true`, trigger `user::loggedIn` event
//
//      @return  {boolean}
//
GolfCore.prototype.isLogin = function()
{
  var credentials = this.getCookie( this._CREDENTIALSCOOKIE )

  if( !credentials )
    return false

  return true
}

// Unset user credentials. 
// Trigger `user::login` event
//
//      @return  {void}
//
GolfCore.prototype.logout = function()
{
  console.info( 'user logout' )

  this._credentials = false

  this.setCookie( this._CREDENTIALSCOOKIE, null )

  this.trigger( 'user::login' )
}


// API
//-------------------------------


// Call a service protected by closure
//
//      @params  {string}  service name
//      @params  {object}  service arguments
//      @return  {mixed}
//
GolfCore.prototype.api = function( serviceName, args )
{
  var service = Helpers.getNested( Components, serviceName, false )
    , args    = args || null

  if( !service )
    throw new Error( 'Golf API do not include ' + serviceName )

  // if it's a Backbone's element ( a.k.a. a model, collection or view)
  // we create a new instance
  if( _.isFunction( service ) )
    return new service( args )

  return service
}

// Global Init

console.groupCollapsed( 'Golf Global Init' )

window.Golf = new GolfCore()

