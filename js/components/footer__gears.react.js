
var React             = require('react')
  , Gui               = window.require('nw.gui')
  , Win               = Gui.Window.get()
  , Squid             = require('../utils/squid')
  , _                 = require('underscore')
  , SquidActions      = require('../actions/SquidActions')
  , UserStore         = require('../stores/UserStore')
  , RepositoriesStore = require('../stores/RepositoriesStore')
  , UpdaterUi         = require('./footer__updater.react')

module.exports = Gears = React.createClass(
{
    // Initialize

    componentDidMount: function()
    {
      // Create an empty menu
      this._settingsDropDown = menu = new Gui.Menu()

      // Add items
      
      menu.append(new Gui.MenuItem({
          label: 'Profile'
        , click: _.bind( this.goToProfile, this )
      }))

      menu.append(new Gui.MenuItem({
          label: 'Log out'
        , click: _.bind( this.userLogout, this )
      }))

      menu.append(new Gui.MenuItem({ type: 'separator' }))

      menu.append(new Gui.MenuItem({
          label: 'Quit'
        , click: _.bind( this.quitApp, this )
      }))
    }

    // Clicks
    // --------------------

    // Go to user profile
  , goToProfile: function()
    {
      if( !this.props.user.isLogged() )
      {
        alert('not logged in')
        return
      }
      
      // Open URL with default browser.
      Gui.Shell.openExternal( this.props.user.getProfileUrl() )
    }

  , userLogout: function()
    {
      SquidActions.updateUserLogin( false )
      SquidActions.resetRepositories()
    }

  , quitApp: function()
    {
      Win.close()
    }

  , handleClick: function( event )
    {
      // Popup as context menu
      this._settingsDropDown.popup( 330, 420 )

    }

  , render: function(){
      return (
        <div className="footer_logged u-cf">
          <div className="footer__updater">
            <UpdaterUi
             updater={this.props.updater} />
          </div>
          <div className="footer__gears" onClick={this.handleClick}></div>
        </div>
      )
    }
})
