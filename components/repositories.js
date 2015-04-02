/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')
  , Search = require('./repositories__search')
  , List   = require('./repositories__list')
  , Repos  = require('./fixture-repos.json')
  // , Squid  = require('../squid')

module.exports = Repositories = React.createClass(
{
    getInitialState: function() 
    {
        return {
            filterText: ''
        }
    }

  , handleUserInput: function( filterText ) 
    {
      this.setState({
          filterText: filterText
      })
    }

  , render: function(){
      return (
        <div className="repositories__content">
          <div className="repositories__search">
            <Search
              filterText={this.state.filterText}
              onUserInput={this.handleUserInput} />
          </div>
          <List 
            repos={Repos} 
            filterText={this.state.filterText} />
        </div>
      )
    }
})
