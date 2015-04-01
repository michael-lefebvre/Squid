
var Gui  = window.require('nw.gui')

function isSuccessStatus( status )
{
  return status >= 200 && status < 300 || status == 304
}

module.exports = xhrCall = function( options )
{
  var xhr   = new XMLHttpRequest()
    , done  = false
    , async = options.hasOwnProperty('async') ? options.async : true

  xhr.open( options.method || 'GET', options.url, async )

  xhr.onreadystatechange = function()
  {
    if( done ) return
    if( this.readyState != 4 ) return

    done = true

    if( isSuccessStatus( this.status ) )
    {
      if( options.success )
        options.success( JSON.parse( this.response ) )

      return
    }

    if( options.error )
      options.error.call( this )
  }

  Object.keys( options.headers || {} )
    .forEach( function( key )
    {
      xhr.setRequestHeader( key, options.headers[ key ] )
    })

  xhr.send( options.data || null )

  return xhr
}
