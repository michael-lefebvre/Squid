
var Gui   = window.require('nw.gui')
  , _     = require('underscore')

module.exports = Xhr = function()
{
  // Per page results
  this._pagination  = Gui.App.manifest.repoPagination
}

Xhr.prototype.get = function( options ) 
{
  // check response status
  var _isSuccessStatus = function ( status )
  {
    return status >= 200 && status < 300 || status == 304
  }

  if( _.isUndefined( options.url ) )
    throw 'XHR need an URL'

  options = _.extend( options || {}, {
    headers:  {
        'Authorization': 'Basic ' + options.credentials
      , 'Accept':        'application/vnd.github.v3+json'
      , 'Content-Type':  'application/json;charset=UTF-8'
    }
  })
  
  var xhr   = new XMLHttpRequest()
    , done  = false
    , async = options.hasOwnProperty('async') ? options.async : true

  xhr.open( options.method || 'GET', options.url, async )
  xhr.dataType = 'json'

  xhr.onreadystatechange = function()
  {
    if( done ) return
    if( this.readyState != 4 ) return

    done = true

    if( _isSuccessStatus( this.status ) )
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

Xhr.prototype.getAll = function( options )
{
  var pagination = options.pagination || 20
    , serviceUrl = options.url + '?per_page='+ pagination
    , next       = false
    , self       = this
    , results    = []

  // pagination stolen from Github.js by Michael Aufreiter
  ;(function iterate() 
  {
    self.get( serviceUrl, 
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
            options.onComplete()
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
