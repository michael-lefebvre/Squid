/* @jsx React.DOM */

var React  = require('react')
  , Gui    = window.require('nw.gui')
  , Footer = require('./src/js/components/footer.jsx')
  , Squid  = require('./src/js/squid.js')
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
React.render( <Footer />, document.getElementById('squid-footer') )

onload = function() 
{
  if( Gui.App.manifest.debug )
    Gui.Window.get().showDevTools()

  Squid.init()

  if( Squid.isLogin() )
    showRepositories()
}