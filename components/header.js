/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')
  , Squid  = require('../methods/squid')
  , Card   = require('./header__card')

module.exports = Header = React.createClass(
{
    _searchOpen: false

    // Initialize

  , componentDidMount: function()
    {
      var self = this

      // PUB/SUB
      PubSub.subscribe( 'squid::userLogged', function( msg, data )
      {
        self.handleUserLogged()
      })
    }

  , getInitialState: function() 
    {
      return {
          userLogged: false
      }
    }


    // User events

  , handleUserLogged: function() 
    {
      this.setState({
          userLogged: true
      })
    }

  , render: function()
    {
      return (
        <div className="header__content">
          <div className="header__welcome">
            <div className="logo"></div>
            <h1>Welcome to Squid</h1>
            <p>
              Squid gives you a quick access to all your Github repositories. Browse, search and clone to your desktop using Github for Mac.
            </p>
          </div>
          <div className="header__connected">
            <Card userLogged={this.state.userLogged} />
          </div>
        </div>
      )
    }
})
