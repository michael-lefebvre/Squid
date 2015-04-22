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

    // TODO: refactor request repos

  , requestAllRepos: function()
    {
      var pagination = Gui.App.manifest.repoPagination
        , serviceUrl = 'user/repos?per_page='+ pagination
        , next       = false
        , self       = this
        , results    = []

      // pagination stolen from Github.js by Michael Aufreiter
      ;(function iterate() 
      {
        Squid.api( serviceUrl, 
        {
          success: function( response, xhr )
          {
            results.push.apply( results, response )

            var links = (xhr.getResponseHeader('link') || '').split(/\s*,\s*/g)
              , next  = _.find( links, function( link ) { return /rel="next"/.test( link ) })

            if (next)
              next = (/<(.*)>/.exec(next) || [])[1]

            if (!next)
            {
              var user = Squid.getUser()
                , orgs = user.get('orgs')

              if( !orgs.length )
                self.handleRepositoriesLoaded( new Collection( results ) )
              else
                self.requestAllOrgsRepos( results, orgs )
            }
            else 
            {
              serviceUrl = next
              iterate()
            }
          }
        })
      })()
    }

  , requestAllOrgsRepos: function( results, orgs )
    {
      var total      = orgs.length
        , done       = 0
        , pagination = Gui.App.manifest.repoPagination
        , self       = this

      orgs.forEach( function( org )
      {
        var serviceUrl = org.repos_url + '?per_page='+ pagination
          , next       = false

        ;(function iterate() 
        {
          Squid.api( serviceUrl, 
          {
            success: function( response, xhr )
            {
              results.push.apply( results, response )

              var links = (xhr.getResponseHeader('link') || '').split(/\s*,\s*/g)
                , next  = _.find( links, function( link ) { return /rel="next"/.test( link ) })

              if (next)
                next = (/<(.*)>/.exec(next) || [])[1]

              if (!next)
              {
                self.handleRepositoriesLoaded( new Collection( results ) )
              }
              else 
              {
                serviceUrl = next
                iterate()
              }
            }
          })
        })()
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
