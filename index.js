/* @jsx React.DOM */

var React = require('react')
  , Gui   = window.require('nw.gui')
  , Logo  = require('./components/logo.jsx')
  , Squid = require('./src/js/squid.js');

// React.render(<Logo />, document.getElementById('logo'));

onload = function() 
{
  if( Gui.App.manifest.debug )
    Gui.Window.get().showDevTools()

  Squid.init()
}