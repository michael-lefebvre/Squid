
var xhrCall = function( options )
{
  var _void    = function(){}

  var defaults = {
      type:        'GET'
    , dataType:    'json'
    , data:        {}
    , cache:       false
    , queryString: false
    , setAuth:     false
    , success:     function( data, textStatus, jqXHR )
      {
        if( settings.onSuccess && _.isFunction( settings.onSuccess ) )
          settings.onSuccess( data, textStatus, jqXHR )
      }
    , error:       function( jqXHR, textStatus, errorThrown )
      {
        if( settings.onError && _.isFunction( settings.onError ) )
          settings.onError( jqXHR, textStatus, errorThrown )
      }
  }

  options = options || {}

  if( !options.url )
    throw new Error('no URL provided')

  options.url = Squid.formatUrl( options.url )

  var settings = $.extend( {}, defaults, options )

  if( settings.queryString )
  {
    for( var key in settings.queryString )
    {
      url += '&' + key + '=' + settings.queryString[ key ]
    }
  }

  if( settings.setAuth )
    settings.headers = this.getAuth()

  var xhr = $.ajax( settings )

  return xhr
}

xhrCall.prototype.getAuth = function()
{
  return {
    Authorization: 'Basic ' + Squid.getCredentials()
  }
}