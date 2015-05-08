
var React = require('react')

var Network = React.createClass(
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

module.exports = Network
