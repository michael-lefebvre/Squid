/*

           MMM.           .MMM
           MMMMMMMMMMMMMMMMMMM
           MMMMMMMMMMMMMMMMMMM      _______________________
          MMMMMMMMMMMMMMMMMMMMM    |                      |
         MMMMMMMMMMMMMMMMMMMMMMM   | Respect the Octocat! |
        MMMMMMMMMMMMMMMMMMMMMMMM   |_   __________________|
        MMMM::- -:::::::- -::MMMM    |/
         MM~:~   ~:::::~   ~:~MM
    .. MMMMM::. .:::+:::. .::MMMMM ..
          .MM::::: ._. :::::MM.
             MMMM;:::::;MMMM
      -MM        MMMMMMM
      ^  M+     MMMMMMMMM
          MMMMMMM MM MM MM
               MM MM MM MM
               MM MM MM MM
            .~~MM~MM~MM~MM~~.
         ~~~~MM:~MM~~~MM~:MM~~~~
        ~~~~~~==~==~~~==~==~~~~~~
         ~~~~~~==~==~==~==~~~~~~
             :~==~==~==~==~~
*/

global.document  = window.document
global.navigator = window.navigator

var React       = require('react')
  , Gui         = window.require('nw.gui')
  , Squid       = require('./utils/squid')
  , SquidApp    = require('./components/app.react')
  , updaterOpts = {}

if( Gui.App.manifest.debug )
  updaterOpts = Gui.App.manifest.updater

// App Updater
var updater = new Updater( updaterOpts )


onload = function() 
{
  if( Gui.App.manifest.debug )
    Gui.Window.get().showDevTools()

  Squid.init()

  // Mount App Controller View
  React.render(
    <SquidApp updater={updater} />,
    document.getElementById('squid-app')
  )

  // Hide App if user click 
  // outside panel
  var _body = document.getElementsByTagName('body')[0]

  _body.addEventListener( 'click', function( event )
  {
    if( event.target !== _body )
      return

    Squid.hide()
  })
}
