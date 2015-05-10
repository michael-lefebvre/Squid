
var React   = require('react')
  , Login   = require('./footer__login.react')
  , Gears   = require('./footer__gears.react')
  , Network = require('./footer__network.react')


// Squid footer view
var Footer = React.createClass(
{
    // Render view
    render: function() 
    {
      return (
        <div className="login">
          <Gears
            user={this.props.user}
            updater={this.props.updater} />
          <Login
            user={this.props.user} />
          <Network />
        </div>
      )
    }

})

module.exports = Footer
