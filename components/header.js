/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')
  // , Squid  = require('../squid')

module.exports = Header = React.createClass(
{
    toggleSearch: function()
    {
      document.getElementsByTagName('body')[0]
        .classList.toggle('context_search')
    }

  , render: function(){
      return (
        <div className="header__content">
          <div className="header__welcome">
            <div className="logo"></div>
            <h1>Welcome to Squid</h1>
            <p>
              Squid gives you a quick access to all your Github repositories. Browse, search and clone to your desktop using Github for Mac.
            </p>
          </div>
          <div className="header__connected">
            <div className="card u-cf">
              <div className="card__picture">
                <img src="https://avatars0.githubusercontent.com/u/279053?v=3&s=34" width="34"/>
              </div>
              <div className="card__profile">
                <div className="card__name">
                  Hi michael-lefebvre,
                </div>
                <div className="card__repos">
                  You have <strong>30 repositories</strong> available
                </div>
              </div>
              <div className="header__search" onClick={this.toggleSearch}></div>
            </div>
          </div>
        </div>
      )
    }
})
