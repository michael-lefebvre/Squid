/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')
  // , Squid  = require('../squid')

module.exports = Item = React.createClass(
{
    render: function(){
      return (
        <li>
          <span className="repo__avatar">
            <img src="src/fixtures/org-efounders.png" width="34"/>
          </span>
          <span className="repo__label">
            <span>
              <span className="repo__org">efounders/</span><span className="repo__name">efounders-website</span>
            </span>
          </span>
        </li>
      )
    }
})
