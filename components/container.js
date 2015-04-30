/**
 * @jsx React.DOM
 */

var React  = require('react')
  , Header = require('./header')
  , Footer = require('./footer')
  , Repo   = require('./repositories')
  , Squid  = require('../methods/squid')
  , Gui    = window.require('nw.gui')
  , _      = require('underscore')
  , PubSub = require('pubsub-js')

module.exports = Container = React.createClass(
{
    // Initialize

    componentDidMount: function()
    {
      var self = this 

      // UI elemnets
      this._body = document.getElementsByTagName('body')[0]

      // listen for connection changes
      window.addEventListener('online',  _.bind( this.setOnline,  this), false)
      window.addEventListener('offline', _.bind( this.setOffline, this), false)

      // PUB/SUB
      PubSub.subscribe( 'squid::userAuth', function( msg, data )
      {
        self.handleUserAuth( data )
      })

      PubSub.subscribe( 'squid::userLogout', function( msg, data )
      {
        self.handleUserLogout( data )
      })


      var isLogin = Squid.isLogin()

      if( isLogin )
      {
        Squid.setCredentials( isLogin )

        this.handleUserAuth({
          hash: isLogin
        })
      }
    }

    // State
    // ----------------------

  , handleUserAuth: function( obj ) 
    {
      Squid.setCredentials( obj.hash )

      var self  = this

      var myXHR = Squid.api( 'user', 
      {
          success : function( response )
          {
            console.info('Login succeeded')
            console.log( response )

            Squid.setUser( response )

            PubSub.publish( 'squid::userLogged' )

            self.getUserOrgs()

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

  , getUserOrgs: function()
    {
      var self  = this

      var myXHR = Squid.api( 'user/orgs', 
      {
          success : function( response )
          {
            // console.info('user orgs succeeded')
            // console.log( response )

            if( response.length )
            {
              var user = Squid.getUser()
              user.setOrgs( response )
            }

            self.showRepositories()
          }
        , error : function( response )
          {
            console.warn('error')
            console.log( response )
          }
      })      
    }

  , handleUserLogout: function()
    {
      Squid.logout()
      this.hideRepositories()
    }

    // Connection Behaviors
    // ----------------------

  , setOnline: function()
    {
      if( Squid.isLogin() )
        this.showRepositories()

      this._body.classList.remove( 'context_offline' )
    }

  , setOffline: function()
    {
      this.hideRepositories()
      this._body.classList.add( 'context_offline' )
    }

    // Container Behaviors
    // ----------------------

  , showRepositories: function()
    {
      this._body.classList.add( 'context_logged' )
    }

  , hideRepositories: function()
    {
      this._body.classList.remove( 'context_logged' )
    }

    // Render
    // ----------------------

  , render: function()
    {
      return (
        <div className="container">
          <div className="header" id="squid-header">
            <Header/>
          </div>
          <div className="footer">
            <div className="footer__content" id="squid-footer">
              <Footer/>
            </div>
          </div>
          <div className="repositories" id="squid-repositories">
            <Repo/>
          </div>
        </div>
      )
    }
})