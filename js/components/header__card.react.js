
var React             = require('react')
  , SquidActions      = require('../actions/SquidActions')
  , RepositoriesStore = require('../stores/RepositoriesStore')
  , Repos             = require('./header__repos.react')

var Card = React.createClass(
{
    _searchClicked: false

  , toggleSearch: function()
    {
      var _searchStatus = ( !this.props.searchStatus )
      
      SquidActions.updateSearchVisible( _searchStatus )
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
              Hi {user.getName()},
            </div>
            <Repos repositories={this.props.repositories} />
          </div>
          <div className="header__search" onClick={this.toggleSearch}></div>
        </div>
      )
    }
})

module.exports = Card
