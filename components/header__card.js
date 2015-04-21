/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')
  , Squid  = require('../methods/squid')
  , Repos  = require('./header__repos')

module.exports = Card = React.createClass(
{
    _searchOpen: false

    // Initialize

  , componentDidMount: function()
    {
      var self = this

      // PUB/SUB
      PubSub.subscribe( 'squid::repoLoad', function( msg, data )
      {
        self.handleRepoUpdate( data )
      })
    }

  , getInitialState: function() 
    {
      return {
          totalRepos: null
      }
    }

  , handleRepoUpdate: function( totalRepos ) 
    {
      this.setState({
          totalRepos: totalRepos
      })
    }

  , toggleSearch: function()
    {
      document.getElementsByTagName('body')[0]
        .classList.toggle('context_search')

      this._searchOpen = ( !this._searchOpen )

      if( this._searchOpen )
        PubSub.publish( 'squid::displaySearch' )
      else
        PubSub.publish( 'squid::hideSearch' )
    }

  , render: function()
    {
      if( !this.props.userLogged )
        return (<div className="card u-cf" />)

      var user = Squid.getUser()
      
      return (
        <div className="card u-cf">
          <div className="card__picture">
            <img src={user.getAvatar()} width="34"/>
          </div>
          <div className="card__profile">
            <div className="card__name">
              Hi {user.get('name')},
            </div>
            <Repos totalRepos={this.state.totalRepos} />
          </div>
          <div className="header__search" onClick={this.toggleSearch}></div>
        </div>
      )
    }
})
