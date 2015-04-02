/**
 * @jsx React.DOM
 */

var React  = require('react')
  , Squid  = require('../squid')
  , PubSub = require('pubsub-js')

module.exports = Gears = React.createClass(
{
    render: function(){
      return (
        <div class="footer_logged u-cf">
          <div class="footer__gears"></div>
        </div>
      )
    }
})
