/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')
  // , Squid  = require('../squid')

module.exports = Header = React.createClass(
{
    render: function(){
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
                <img src="src/fixtures/avatar.jpg" width="34"/>
              </div>
              <div className="card__profile">
                <div className="card__name">
                  Hi michael-lefebvre,
                </div>
                <div className="card__repos">
                  You have <strong>30 repositories</strong> available
                </div>
              </div>
              <div className="header__search"></div>
            </div>
          </div>
        </div>
      )
    }
})
