
var React             = require('react')
  , ClassNames        = require('classNames')
  , UserStore         = require('../stores/UserStore')
  , RepositoriesStore = require('../stores/RepositoriesStore')
  , SquidHeader       = require('./header.react')
  , SquidFooter       = require('./footer.react')

// Method to retrieve state from Stores
function getAppState() 
{
  return {
      user:         UserStore.get()
    , repositories: RepositoriesStore.get()
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

    // Add change listeners to stores
  , componentDidMount: function() 
    {
      UserStore.addChangeListener( this._onChange )
    }

    // Remove change listers from stores
  , componentWillUnmount: function() 
    {
      UserStore.removeChangeListener( this._onChange )
    }

    // Render our child components, passing state via props
  , render: function() 
    {
      var classes = ClassNames(
      {
          'context_logged':  this.state.user.isLogged()
        , 'context_search':  false
        , 'context_offline': false
        , 'container':       true
      })

    	return (
        <div className={classes} ref="containerNode">
          <div className="header" id="squid-header">
            <SquidHeader 
              user={this.state.user} 
              repositories={this.state.repositories} />
          </div>
          <div className="footer">
            <div className="footer__content" id="squid-footer">
              <SquidFooter 
                user={this.state.user}
                repositories={this.state.repositories} />
            </div>
          </div>
          <div className="repositories" id="squid-repositories"></div>
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
