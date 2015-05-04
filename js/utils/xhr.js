
var Gui   = window.require('nw.gui')
  , _     = require('underscore')

module.exports = Xhr = function( options ) 
{
  // check response status
  var _isSuccessStatus = function ( status )
  {
    return status >= 200 && status < 300 || status == 304
  }

  if( _.isUndefined( options.url ) )
    throw 'XHR need an URL'

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
