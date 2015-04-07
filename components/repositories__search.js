/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')

module.exports = Search = React.createClass(
{
    // Initialize

    componentDidMount: function()
    {
      var self = this

      // PUB/SUB
      PubSub.subscribe( 'squid::displaySearch', function( msg, data )
      {
        self.refs.filterTextInput.getDOMNode().focus()
      })

      PubSub.subscribe( 'squid::hideSearch', function( msg, data )
      {
        self.refs.filterTextInput.getDOMNode().value = ''
        self.handleChange()
      })
    }

  , handleChange: function() 
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
