/**
 * @jsx React.DOM
 */

var React = require('react')
  , Gui   = window.require('nw.gui')
  , Squid = require('../methods/squid')

module.exports = Gears = React.createClass(
{
    // Initialize

    componentDidMount: function()
    {
      // Create an empty menu
      this._settingsDropDown = menu = new Gui.Menu();

      // Add some items
      menu.append(new Gui.MenuItem({
          label: 'Profile'
        , click: function() 
          {
            console.log("I'm clicked")
          }
      }))
      menu.append(new Gui.MenuItem({
          label: 'Logout'
        , click: function() 
          {
            console.log("I'm clicked")
          }
      }))
      menu.append(new Gui.MenuItem({ type: 'separator' }))
      menu.append(new Gui.MenuItem({
          label: 'Quit'
        , click: function() 
          {
            console.log("I'm clicked")
          }
      }))
    }

  , handleClick: function( event )
    {
      var element   = event.target
        , xPosition = 0
        , yPosition = 0
    
      while( element )
      {
        xPosition += ( element.offsetLeft - element.scrollLeft + element.clientLeft )
        yPosition += ( element.offsetTop - element.scrollTop + element.clientTop )
        element = element.offsetParent
      }

      // +16 to display popup
      // on bottom/right
      var position = { 
          x: ( xPosition + 16 )
        , y: ( yPosition + 16 ) 
      }

      // Popup as context menu
      this._settingsDropDown.popup( position.x, position.y )

    }

  , render: function(){
      return (
        <div className="footer_logged u-cf">
          <div className="footer__gears" onClick={this.handleClick}></div>
        </div>
      )
    }
})
