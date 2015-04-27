/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')

module.exports = UpdaterUi = React.createClass(
{    // Initialize

    componentDidMount: function()
    {
      this.holder = document.getElementById('footer__updater__holder')
      
      var self = this

      PubSub.subscribe( 'squid::updateInvite', function( msg, versionId )
      {
        document.getElementById('js-invite-update').innerHTML = 'Squid <strong>' + versionId + '</strong> is available, udpate?'

        self.holder.classList.add('available')
      })

      PubSub.subscribe( 'squid::updateInstalling', function( msg, versionId )
      {
        self.holder.classList.remove('download')
        self.holder.classList.add('installing')
      })

      global.updaterInst.checkRemote( PubSub )
      
      var wait    = document.getElementById('js-installing')
        , text    = 'Installing new version'
        , maxSize = text.length + 3

      var dots = window.setInterval( function() 
      {
        if ( wait.innerHTML.length > maxSize ) 
          wait.innerHTML = text
        else 
            wait.innerHTML += '.'
      }, 200)
    }

  , startDownload: function()
    {
      this.holder.classList.remove('available')
      this.holder.classList.add('download')

      var self = this

      global.updaterInst.update( function( err )
      {
        if (!err) console.log('App has been updated!')

        self.holder.classList.remove('installing')
        self.holder.classList.add('restart')
      })
    }

  , restartApp: function()
    {
      var child
        , child_process = window.require('child_process')
        , gui           = window.require('nw.gui')
        , win           = gui.Window.get()

      child = child_process.spawn('open', ['-n', '-a', window.process.execPath.match(/^([^\0]+?\.app)\//)[1]], {detached:true})

      child.unref()
      win.hide()
      gui.App.quit()
    }

  , render: function()
    {
      return (
        <div className="footer__updater__holder" id="footer__updater__holder">
          <p id="js-invite-update" onClick={this.startDownload}></p>
          <div className="footer__updater__progress">
            <div id="js-update-progress"></div>
          </div>
          <p id="js-installing">Installing new version.</p>
          <p id="js-invite-restart" onClick={this.restartApp}>Update done, <strong>restart?</strong></p>
        </div>
      )
    }
})
