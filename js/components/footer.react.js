
var React = require('react')
  , Login = require('./footer__login.react')
  , Gears = require('./footer__gears.react')
  // , Offline = require('./footer__offline')


// Squid footer view
var Footer = React.createClass(
{
    // Render view
    render: function() 
    {
      return (
        <div className="login">
          <Gears user={this.props.user} />
          <Login user={this.props.user} />
        </div>
      )
    }

})

module.exports = Footer
