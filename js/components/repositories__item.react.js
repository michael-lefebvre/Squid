
var React  = require('react')
  , Gui    = window.require('nw.gui')

var Item = React.createClass(
{
    goToRepository: function()
    {
      // Open URL with default browser.
      Gui.Shell.openExternal( this.props.repo.getUrl() )
    }

  , render: function()
    {
      var klass = ( this.props.repo.get('private') )
                  ? 'private'
                  : ''

      return (
        <li onDoubleClick={this.goToRepository} className={klass}>
          <span className="repo__avatar">
            <img src={this.props.repo.getAvatar()} width="34" height="34" />
          </span>
          <span className="repo__label">
            <span>
              <span className="repo__privacy"></span>
              <span className="repo__org">
                {this.props.repo.getOwner()}/
              </span>
              <span className="repo__name">
                {this.props.repo.get('name')}
              </span>
              <span className="repo__desc">
                {this.props.repo.getDesc()}
              </span>
            </span>
          </span>
        </li>
      )
    }
})

module.exports = Item
