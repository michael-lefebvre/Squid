
var React = require('react')
  , Squid = require('../utils/squid')
  , _     = require('underscore')

module.exports = UpdaterUi = React.createClass(
{
    // Initialize
    componentDidMount: function()
    {
      this.holder = document.getElementById('footer__updater__holder')

      // Check if App update is available
      this.props.updater.checkRemote( _.bind( this.inviteUpdate, this ) )
    }

  , inviteUpdate: function( versionId )
    {
      if( !navigator.onLine )
        return

      Squid._tray.set( 'anchor-notif-black' )

      document.getElementById('js-invite-update').innerHTML = 'Squid <strong>' + versionId + '</strong> is available, udpate?'

      this.holder.classList.add('available')
    }

  , startDownload: function()
    {
      if( !navigator.onLine )
        return

      this.holder.classList.remove('available')
      this.holder.classList.add('download')

      this.props.updater.update( _.bind( this.startInstall, this ) )
    }

  , startInstall: function( err )
    {
      if( !err )
      {
        console.log('App has been updated!')
        return
      }

      this.holder.classList.remove('download')
      this.holder.classList.add('installing')

      this.props.updater.install( function()
      {
        this.holder.classList.remove('installing')
        this.holder.classList.add('restart')
      }.bind( this ) )

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
          <p id="js-installing">Installing new version<i className="ellipsis"><i>.</i><i>.</i><i>.</i></i></p>
          <p id="js-invite-restart" onClick={this.restartApp}>Update done, <strong>restart?</strong></p>
        </div>
      )
    }
})
