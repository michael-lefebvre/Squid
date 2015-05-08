
var React = require('react')
  , Card  = require('./header__card.react')

// Squid header view
var Header = React.createClass(
{
    logourUser: function()
    {
      // SquidActions.updateUserLogin( false )
    }

    // Render view
  , render: function() 
    {
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
            <Card 
              user={this.props.user}
              repositories={this.props.repositories}
              searchStatus={this.props.searchStatus} />
          </div>
        </div>
      )
    }

})

module.exports = Header
