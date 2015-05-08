
var React      = require('react')
  , Search     = require('./repositories__search.react')
  , List       = require('./repositories__list.react')
  , Gui        = window.require('nw.gui')
  , Squid      = require('../utils/squid')
  , _          = require('underscore')

var Repositories = React.createClass(
{
    getInitialState: function() 
    {
      return {
          filterText:   ''
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
            repositories={this.props.repositories}
            filterText={this.state.filterText} />
        </div>
      )
    }
})

module.exports = Repositories
