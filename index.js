global.document = window.document;
global.navigator = window.navigator;

var React     = require('react')
  , Gui       = window.require('nw.gui')
  , Squid     = require('./methods/squid.js')
  , Container = require('./components/container')
  , PubSub    = require('pubsub-js')


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
React.render( <Container /> , document.getElementById('squid-window') )

onload = function() 
{
  if( Gui.App.manifest.debug )
    Gui.Window.get().showDevTools()

  Squid.init()

  if( Squid.isLogin() )
    showRepositories()
}