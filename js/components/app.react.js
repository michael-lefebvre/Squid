
var React             = require('react')
  , ClassNames        = require('classNames')
  , UserStore         = require('../stores/UserStore')
  , RepositoriesStore = require('../stores/RepositoriesStore')
  , SquidHeader       = require('./header.react')
  , SquidFooter       = require('./footer.react')
  , SquidRepositories = require('./repositories.react')
  , _                 = require('underscore')
  , Squid             = require('../utils/squid')


// Method to retrieve state from Stores
function getAppState() 
{
  return {
      user:         UserStore.get()
    , repositories: RepositoriesStore.get()
    , searchStatus: RepositoriesStore.getSearch()
    , isOnline:     navigator.onLine
  }
}

// Define main Controller View
var SquidApp = React.createClass(
{
    // Get initial state from stores
    getInitialState: function() 
    {
      return getAppState()
    }

    // data binding
    // ----------------------

    // Add change listeners to stores
  , componentDidMount: function() 
    {
      // Auto login
      var isLogin = Squid.isLogin()

      if( isLogin )
      {
        Squid.setCredentials( isLogin )

        // Call Github API
        UserStore.requestUserApi()
      }

      UserStore.addChangeListener( this._onChange )
      RepositoriesStore.addChangeListener( this._onChange )

    }

    // Remove change listers from stores
  , componentWillUnmount: function() 
    {
      UserStore.removeChangeListener( this._onChange )
      RepositoriesStore.removeChangeListener( this._onChange )
    }

    // Render
    // ----------------------

    // Render our child components, passing state via props
  , render: function() 
    {
      var classes = ClassNames(
      {
          'context_logged':  this.state.user.isLogged()
        , 'context_search':  this.state.searchStatus
        , 'context_offline': ( !this.state.isOnline )
        , 'container':       true
      })

      this.props.updater.checkRemote()

    	return (
        <div className={classes} ref="containerNode">
          <div className="header" id="squid-header">
            <SquidHeader 
              user={this.state.user} 
              repositories={this.state.repositories}
              searchStatus={this.state.searchStatus} />
          </div>
          <div className="footer">
            <div className="footer__content" id="squid-footer">
              <SquidFooter 
                user={this.state.user}
                repositories={this.state.repositories}
                updater={this.props.updater} />
            </div>
          </div>
          <div className="repositories" id="squid-repositories">
            <SquidRepositories 
              user={this.state.user}
              repositories={this.state.repositories} />
          </div>
        </div>
    	)
    }

    // Method to setState based upon Store changes
  , _onChange: function()
    {
      this.setState( getAppState() )
    }

})

module.exports = SquidApp
