
var React  = require('react')
  , _      = require('underscore')

var Repos = React.createClass(
{
    render: function()
    {
      var text

      if( _.isNull( this.props.repositories ) )
      {
        text = 'Loading repositories<i class="ellipsis"><i>.</i><i>.</i><i>.</i></i>'
      }
      else
      {
        var _total = this.props.repositories.length
        text = ( !_total )
               ? 'No repositories found'
               : 'You have <strong>' + _total + ' ' + ( ( _total > 1 ) ? 'repositories' : 'repository' )  + '</strong> available'
      }

      return (
        <div className="card__repos">
          <span dangerouslySetInnerHTML={{__html: text}} />
        </div>
      )
    }
})

module.exports = Repos
