/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')
  , Search = require('./repositories__search')
  , Item   = require('./repositories__item')
  // , Squid  = require('../squid')

module.exports = Repositories = React.createClass(
{
    render: function(){
      return (
        <div className="repositories__content">
          <div className="repositories__search">
            <Search />
          </div>
          <div className="repositories__list -loading">
            <ul>
              <Item />
            </ul>            
          </div>
        </div>
      )
    }
})
