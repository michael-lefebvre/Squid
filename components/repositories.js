/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')
  , Search = require('./repositories__search')
  , List   = require('./repositories__list')
  , Repos  = require('./fixture-repos.json')

module.exports = Repositories = React.createClass(
{
    // Initialize

    componentDidMount: function()
    {
      var self = this

      // PUB/SUB
      PubSub.subscribe( 'squid::userLogged', function( msg, data )
      {
        self.handleRepositoriesLoaded( [] )
      })
    }

  , getInitialState: function() 
    {
      return {
          filterText:   ''
        , repositories: []
      }
    }

    // User events

  , handleUserInput: function( filterText ) 
    {
      this.setState({
          filterText: filterText
      })
    }

  , handleRepositoriesLoaded: function( repositories ) 
    {
      this.setState({
          repositories: repositories
      })
    }

    // Render

  , render: function()
    {
      return (
        <div className="repositories__content">
          <div className="repositories__search">
            <Search
              filterText={this.state.filterText}
              onUserInput={this.handleUserInput} />
          </div>
          <List 
            repositories={this.state.repositories}
            filterText={this.state.filterText} />
        </div>
      )
    }
})
