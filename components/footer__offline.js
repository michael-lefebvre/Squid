/**
 * @jsx React.DOM
 */

var React = require('react')

module.exports = Offline = React.createClass(
{
    render: function()
    {
      return (
        <div className="footer_offline">
          <p>Sorry dude, you need to be online to access to your repositories</p>
        </div>
      )
    }
})
