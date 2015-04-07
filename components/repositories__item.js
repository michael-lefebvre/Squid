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
      Gui.Shell.openExternal( this.props.repo.html_url )
    }

  , render: function()
    {
      var avatar = this.props.repo.owner.avatar_url + '&s=34'
      return (
        <li onDoubleClick={this.goToRepository}>
          <span className="repo__avatar">
            <img src={avatar} width="34"/>
          </span>
          <span className="repo__label">
            <span>
              <span className="repo__org">
                {this.props.repo.owner.login}/
              </span>
              <span className="repo__name">
                {this.props.repo.name}
              </span>
              <span className="repo__desc">
                {this.props.repo.description}
              </span>
            </span>
          </span>
        </li>
      )
    }
})
