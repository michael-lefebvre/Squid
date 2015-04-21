/**
 * @jsx React.DOM
 */

var React  = require('react')
  , _      = require('underscore')

module.exports = Card = React.createClass(
{
    // Initialize

    componentDidMount: function()
    {
      var self = this

      // PUB/SUB
      // PubSub.subscribe( 'squid::repoLoad', function( msg, data )
      // {
      //   self.handleRepoUpdate( data )
      // })
    }

  , render: function()
    {
      var text
      
      if( _.isNull( this.props.totalRepos ) )
      {
        text = 'loading repositories'
      }
      else
      {
        text = ( !this.props.totalRepos )
               ? 'no repositories found'
               : 'You have <strong>' + this.props.totalRepos + ' ' + ( ( this.props.totalRepos > 1 ) ? 'repositories' : 'repository' )  + '</strong> available'
      }

      return (
        <div className="card__repos">
          <span dangerouslySetInnerHTML={{__html: text}} />
        </div>
      )
    }
})
