global.document = window.document;
global.navigator = window.navigator;

var React  = require('react')
  , Gui    = window.require('nw.gui')
  , Squid  = require('./methods/squid.js')
  , Window = require('./components/window')
  , PubSub = require('pubsub-js')


// UI elemnets
var _body = document.getElementsByTagName('body')[0]

// UI interactions

var showRepositories = function( msg, data )
{
  console.info( 'user is logged in, show repositories' )

  _body.classList.add( 'context_logged' )
}

var hideRepositories = function( msg, data )
{
  console.info( 'hide repositories' )
  
  _body.classList.remove( 'context_logged' )
}

// PUB/SUB
PubSub.subscribe( 'squid::showRepositories', showRepositories )

// Mount Rect components
React.render( <Window />, document.getElementById('squid-window') )

onload = function() 
{
  if( Gui.App.manifest.debug )
    Gui.Window.get().showDevTools()

  Squid.init()

  if( Squid.isLogin() )
    showRepositories()
}