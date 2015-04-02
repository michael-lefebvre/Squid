/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')
  // , Squid  = require('../squid')

module.exports = Search = React.createClass(
{
    render: function(){
      return (
        <input type="text" id="search-query" className="input" placeholder="Search a repository…" />
      )
    }
})
