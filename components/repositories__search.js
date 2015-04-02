/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')
  // , Squid  = require('../squid')

module.exports = Search = React.createClass(
{
    handleChange: function() 
    {
      this.props.onUserInput(
          this.refs.filterTextInput.getDOMNode().value
      )
    }

  , render: function()
    {
      return (
        <input 
          type="text" 
          id="search-query" 
          className="input" 
          placeholder="Search a repository…" 
          ref="filterTextInput" 
          value={this.props.filterText}
          onChange={this.handleChange} />
      )
    }
})
