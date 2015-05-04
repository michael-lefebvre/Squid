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

var React     = require('react')
  , Gui       = window.require('nw.gui')
  , Squid     = require('./utils/squid')
  , SquidApp  = require('./components/SquidApp.react')


onload = function() 
{
  if( Gui.App.manifest.debug )
    Gui.Window.get().showDevTools()

  Squid.init()

  // Mount SquidApp Controller View
  React.render(
    <SquidApp />,
    document.getElementById('squid-app')
  )
}
