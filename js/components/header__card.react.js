
var React  = require('react')
  , Repos  = require('./header__repos.react')

var Card = React.createClass(
{
    _searchOpen: false

  , toggleSearch: function()
    {
      document.getElementsByTagName('body')[0]
        .classList.toggle('context_search')

      this._searchOpen = ( !this._searchOpen )

      // if( this._searchOpen )
      //   PubSub.publish( 'squid::displaySearch' )
      // else
      //   PubSub.publish( 'squid::hideSearch' )
    }

  , render: function()
    {
      if( !this.props.user.isLogged() )
        return (<div className="card u-cf" />)

      var user = this.props.user
      
      return (
        <div className="card u-cf">
          <div className="card__picture">
            <img src={user.getAvatar()} width="34"/>
          </div>
          <div className="card__profile">
            <div className="card__name">
              Hi {user.get('name')},
            </div>
            <Repos repositories={this.props.repositories} />
          </div>
          <div className="header__search" onClick={this.toggleSearch}></div>
        </div>
      )
    }
})

module.exports = Card
