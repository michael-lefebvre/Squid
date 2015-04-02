/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')
  // , Squid  = require('../squid')

module.exports = Item = React.createClass(
{
    render: function()
    {
      var avatar = this.props.repo.owner.avatar_url + '&s=34'
      return (
        <li>
          <span className="repo__avatar">
            <img src={avatar} width="34"/>
          </span>
          <span className="repo__label">
            <span>
              <span className="repo__org">{this.props.repo.owner.login}/</span><span className="repo__name">{this.props.repo.name}</span>
              <span className="repo__desc">{this.props.repo.description}</span>
            </span>
          </span>
        </li>
      )
    }
})
