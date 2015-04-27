
var Gui     = window.require('nw.gui')
  , Win     = Gui.Window.get()
  , _       = require('underscore')
  , Tray    = require('./tray')
  , Xhr     = require('./xhr')
  , Profile = require('./profile')

var Squid = function()
{
  // APP'S Constants
  // -------------

  // Current version of the library.
  this._VERSION     = '0.1.0'

  // User credentials localStorage's item name
  this._CREDENTIALS = 'SquidCredentials'

  // test instance uniqueness
  this._UID         = _.uniqueId('squid_')

  // Github API base url
  this._API_URL     = Gui.App.manifest.serviceUrl

  // API per page requested results
  this._pagination  = Gui.App.manifest.repoPagination

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
Squid.prototype.init = function()
{
  console.info('debug mode: ' + Gui.App.manifest.debug )

  // Minimal Menu bar item
  var nativeMenuBar = new Gui.Menu({ type: 'menubar' })
  
  nativeMenuBar.createMacBuiltin('Squid')

  Win.menu = nativeMenuBar

  // Register window events
  this._tray.get().on( 'click', _.bind( this.show, this ) )

  if( !Gui.App.manifest.debug )
    Win.on('blur', _.bind( this.hide, this ) )

  return this
}

// WINDOW DISPLAY
//-------------------------------

// Display App
Squid.prototype.show = function( event )
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
Squid.prototype.hide = function()
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
Squid.prototype.setCredentials = function( credentials )
{
  console.info('Store user encoded credentials')

  this._credentials = credentials

  window.localStorage[ this._CREDENTIALS ] = credentials
}

// Return current user `Basic Auth` encoded credentials
//
//      @return  {object}
//
Squid.prototype.getCredentials = function()
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
Squid.prototype.isLogin = function()
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
Squid.prototype.logout = function()
{
  console.info( 'user logout' )

  this._credentials = false
  this._user        = false

  delete window.localStorage[ this._CREDENTIALS ]
}


// User model
//-------------------------------

Squid.prototype.setUser = function( user )
{
  this._user = new Profile( user )

  return this._user
}


Squid.prototype.getUser = function()
{
  return this._user
}


// API
//-------------------------------


// Format full URL to API service
//
//      @params  {string}  service's URL
//      @return  {string}
//
Squid.prototype.formatUrl = function( fragment )
{
  if( !fragment )
    throw new Error( 'Squid need a Github API method' )

  var url = fragment.indexOf('//') >= 0 ? fragment : this._API_URL + fragment

  return url + ( (/\?/).test( url ) ? '&' : '?' ) + ( new Date() ).getTime()
}


// Call a single Github service page, eg `user`
//
//      @params  {string}  service url
//      @params  {object}  xhr options
//      @return  {mixed}
//
Squid.prototype.apiGet = function( service, options )
{
  options = options || {}

  try
  {
    options.url = this.formatUrl( service )
  }
  catch( e )
  {
    console.warn( e.message )

    return false
  }

  try 
  {
    var credentials = this.getCredentials()
  }
  catch( e ) 
  {
    console.warn( e.message )

    return false
  }

  options = _.extend( options || {}, {
    headers:  {
        'Authorization': 'Basic ' + credentials
      , 'Accept':        'application/vnd.github.v3+json'
      , 'Content-Type':  'application/json;charset=UTF-8'
    }
  })

  var xhr = new Xhr( options )

  return xhr
}

// Iterate over Github service pagination, eg `repos`
//
//      @params  {string}  service url
//      @params  {object}  xhr options
//      @return  {mixed}
//
Squid.prototype.apiGetPages = function( service, options, results )
{
  var serviceUrl = service + '?per_page='+ this._pagination
    , next       = false
    , self       = this
    , results    = results || []

  // pagination stolen from Github.js by Michael Aufreiter
  ;(function iterate() 
  {
    self.apiGet( serviceUrl, 
    {
      success: function( response, xhr )
      {
        results.push.apply( results, response )

        var links = ( xhr.getResponseHeader('link') || '' ).split(/\s*,\s*/g)
          , next  = _.find( links, function( link ) { return /rel="next"/.test( link ) })

        if( next )
          next = (/<(.*)>/.exec(next) || [])[1]

        if( !next )
        {
          if( _.isFunction( options.onComplete ) )
            options.onComplete( results )
          else
            return results
        }
        else 
        {
          serviceUrl = next
          iterate()
        }
      }
    })
  })()
}

// Call a Github service
//
//      @params  {string}  service url
//      @params  {object}  xhr options
//      @return  {mixed}
//
Squid.prototype.api = function( service, options )
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
        'Authorization': 'Basic ' + encoded
      , 'Accept':        'application/vnd.github.v3+json'
      , 'Content-Type':  'application/json;charset=UTF-8'
    }
  })
  
  var xhr   = new XMLHttpRequest()
    , done  = false
    , async = options.hasOwnProperty('async') ? options.async : true

  xhr.open( options.method || 'GET', url, async )
  xhr.dataType = 'json'

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
        options.success( JSON.parse( this.response ), this )

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

// Init 
// ----------

module.exports = new Squid()
