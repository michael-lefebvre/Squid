module.exports = Xhr = function( url, options )
{ 
  options = options || {}
      
  // Un exemple d'objet
  var core = 
  {
      setUrl: function( _url )
      {
        url = _url

        return this
      }

    , error: function( message )
      {
        this.name    = 'Squid Xhr'
        this.message = message || 'XHR has failed'
        this.url     = url
        this.options = options
      }

      // La méthode qui effectue la requête AJAX
    , ajax : function( method, url, args ) 
      {
        // On établit une promesse en retour
        var promise = new Promise( function ( resolve, reject )
        {
          // Instantiate XMLHttpRequest client
          var client = new XMLHttpRequest()
            , uri    = url

          client.open( method, uri )
          client.dataType = 'json' || options.dataType

          // Set headers
          Object.keys( options.headers || {} )
            .forEach( function( key )
            {
              client.setRequestHeader( key, options.headers[ key ] )
            })

          // This is called even on 404 etc
          client.onload = function() 
          {
            // so check the status
            if ( this.status == 200 ) 
            {
              resolve({
                  json: JSON.parse( this.response )
                , xhr:  this
              })
            }
            else
            {
              reject({
                  message: this.statusText
                , status:  this.status
                , xhr:     this
              })
            }
          }

          // Handle network errors
          client.onerror = function()
          {
            throw new core.error({
                message: this.statusText
              , status:  this.status
              , xhr:     this
            })
          }

          // Make the request
          client.send( options.data || null )
        })

        // Return the promise
        return promise
      }
  }

  // Pattern adaptateur
  return {
      'get': function( args ) 
      {
        return core.ajax( 'GET', url, args )
      }
    , 'post': function( args ) 
      {
        return core.ajax( 'POST', url, args )
      }
    , 'put': function( args ) 
      {
        return core.ajax( 'PUT', url, args )
      }
    , 'delete': function( args ) 
      {
        return core.ajax( 'DELETE', url, args )
      }
    , 'setUrl': core.setUrl
  }
}
