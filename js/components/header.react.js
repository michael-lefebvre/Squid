var React        = require('react')
  , SquidActions = require('../actions/SquidActions')

// Squid header view
var Header = React.createClass(
{
    logourUser: function()
    {
      SquidActions.updateUserLogin( false )
    }

    // Render view
  , render: function() 
    {
      var self = this
        , str  = 'please login'

      if( this.props.user )
      {
        console.log( this.props.user )
        str = this.props.user.name
      }

      return (
        <div>
          {str}
          <button onClick={this.logourUser}>logout</button>
        </div>
      )
    }

})

module.exports = Header
