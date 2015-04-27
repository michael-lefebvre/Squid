/**
 * @jsx React.DOM
 */

var React     = require('react')
  , Gui       = window.require('nw.gui')
  , Win       = Gui.Window.get()
  , PubSub    = require('pubsub-js')
  , Squid     = require('../methods/squid')
  , _         = require('underscore')
  , UpdaterUi = require('./footer__updater')

module.exports = Gears = React.createClass(
{
    // Initialize

    componentDidMount: function()
    {
      // Create an empty menu
      this._settingsDropDown = menu = new Gui.Menu()

      // Add items
      
      menu.append(new Gui.MenuItem({
          label: 'profile'
        , click: _.bind( this.goToProfile, this )
      }))

      menu.append(new Gui.MenuItem({
          label: 'logout'
        , click: _.bind( this.userLogout, this )
      }))

      menu.append(new Gui.MenuItem({ type: 'separator' }))

      menu.append(new Gui.MenuItem({
          label: 'quit'
        , click: _.bind( this.quitApp, this )
      }))
    }

    // Clicks
    // --------------------

    // Go to user profile
  , goToProfile: function()
    {
      if( !Squid.getUser )
      {
        alert('not logged in')
        return
      }
      
      // Open URL with default browser.
      Gui.Shell.openExternal( Squid.getUser().getProfileUrl() )
    }

  , userLogout: function()
    {
      PubSub.publish( 'squid::userLogout' )
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
            <UpdaterUi />
          </div>
          <div className="footer__gears" onClick={this.handleClick}></div>
        </div>
      )
    }
})
