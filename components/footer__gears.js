/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')
  // , Squid  = require('../squid')

module.exports = Gears = React.createClass(
{
    render: function(){
      return (
        <div className="footer_logged u-cf">
          <div className="footer__gears"></div>
        </div>
      )
    }
})
