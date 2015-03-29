
;(function (window, undefined) 
{
  'use strict';

  // Prepare our Variables
  var document      = window.document
    , $             = window.jQuery
    , $document     = $( document )
    , $window       = $( window )
    , $body         = $( document.body )
    , AppRouter     = false
    , gui           = require('nw.gui')
    , win           = gui.Window.get()

// var nw = require('nw.gui').Window.get()
// // nw.showDevTools()

// var nativeMenuBar = new gui.Menu({ type: "menubar" });
// nativeMenuBar.createMacBuiltin("My App");
// win.menu = nativeMenuBar;