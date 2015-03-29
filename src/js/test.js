
$('div.logo').add('div.card__picture').on('click', function()
{
  $body.toggleClass('context_logged')
})


$('div.header__search').on('click', function()
{
  $body.toggleClass('context_search')
})
// var hires = function() {
//   // starts with default value for modern browsers
//   var dpr = window.devicePixelRatio ||

//   // fallback for IE
//       (window.screen.deviceXDPI / window.screen.logicalXDPI) ||

//   // default value
//       1;

//   return !!(dpr > 1);
// }

// var nw = require('nw.gui').Window.get()
//   , visible = false
// nw.showDevTools()

// var gui = require('nw.gui');
// var win = gui.Window.get();
var nativeMenuBar = new gui.Menu({ type: "menubar" });
nativeMenuBar.createMacBuiltin("My App");
win.menu = nativeMenuBar;

// var winWidth = ( ( gui.App.manifest.window.width / 2 ) - 15 )

// var icon = ( hires() ) ? 'Icon-@2x.png' : 'Icon.png'


// // Create a tray icon
// var tray = new gui.Tray({ title: '', icon: icon })

// var showWindow = function( event )
// {
//   console.log( event )
//   if( !visible )
//   {
//     win.moveTo( ( event.x - winWidth ), event.y )

//     win.show()
//     win.focus()
//     visible = true
//     return
//   }

//   hideWindow()
// }

// var hideWindow = function () 
// {
//   if( !visible )
//     return

//   console.log('hideWindow')
//   win.hide()
//   win.blur()
//   visible = false
// }

// tray.on('click', showWindow )

// win.on('blur', hideWindow )

// win.show()

// win.showDevTools()