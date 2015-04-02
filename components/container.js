/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')
  , Header = require('./header')
  , Footer = require('./footer')
  , Repo   = require('./repositories')
  // , Squid  = require('../squid')

module.exports = Container = React.createClass(
{
    render: function(){
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
