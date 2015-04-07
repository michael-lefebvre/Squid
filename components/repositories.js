/**
 * @jsx React.DOM
 */

var React      = require('react')
  , PubSub     = require('pubsub-js')
  , Search     = require('./repositories__search')
  , List       = require('./repositories__list')
  , Gui        = window.require('nw.gui')
  , Squid      = require('../methods/squid')
  , Collection = require('../methods/repositories')

module.exports = Repositories = React.createClass(
{
    // Initialize

    componentDidMount: function()
    {
      var self = this

      // PUB/SUB
      PubSub.subscribe( 'squid::userLogged', function( msg, data )
      {
        self.loadRepos()
      })
    }

  , loadRepos: function()
    {
      var pagination = Gui.App.manifest.repoPagination
        , serviceUrl = 'user/repos?per_page='+ pagination
        , self       = this

      // console.log( pagination )
      // console.log( serviceUrl )

      Squid.api( serviceUrl, {
        success: function( response, header )
        {
          self.handleRepositoriesLoaded( new Collection( response ) )
        }
      })
    }

  , getInitialState: function() 
    {
      return {
          filterText:   ''
        , repositories: false
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
