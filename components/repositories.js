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
  , _          = require('underscore')

module.exports = Repositories = React.createClass(
{
    // Initialize

    componentDidMount: function()
    {
      var self = this

      // PUB/SUB
      PubSub.subscribe( 'squid::userLogged', function( msg, data )
      {
        self.requestAllRepos()
      })
    }

  , requestAllRepos: function()
    {
      var self = this

      Squid.apiPages( 'user/repos', {
        onComplete: function( results )
        {
          var user = Squid.getUser()
            , orgs = user.get('orgs')

          if( !orgs.length )
            self.handleRepositoriesLoaded( new Collection( results ) )
          else
            self.requestAllOrgsRepos( results, orgs )
        }
      })
    }

  , requestAllOrgsRepos: function( repos, orgs )
    {
      var total      = orgs.length
        , done       = 0
        , self       = this

      orgs.forEach( function( org )
      {
        Squid.apiPages( org.repos_url, 
        {
            onComplete: function( results )
            {
              ++done

              repos.push.apply( repos, results )

              if( done === total )
                self.handleRepositoriesLoaded( new Collection( repos ) )
            }
        })
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

      PubSub.publish( 'squid::repoLoad', repositories.length )
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
