/**
 * @jsx React.DOM
 */

var React  = require('react')
  , Login  = require('./footer__login')
  , Gears  = require('./footer__gears')

module.exports = Footer = React.createClass(
{
    render: function(){
      return (
        <div className="login">
          <Gears />
          <Login />
        </div>
      )
    }
})
