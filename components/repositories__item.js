/**
 * @jsx React.DOM
 */

var React  = require('react')
  , Gui    = window.require('nw.gui')

module.exports = Item = React.createClass(
{
    goToRepository: function()
    {
      // Open URL with default browser.
      Gui.Shell.openExternal( this.props.repo.getUrl() )
    }

  , render: function()
    {
      return (
        <li onDoubleClick={this.goToRepository}>
          <span className="repo__avatar">
            <img src={this.props.repo.getAvatar()} width="34"/>
          </span>
          <span className="repo__label">
            <span>
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
