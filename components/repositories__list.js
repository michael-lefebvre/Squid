/**
 * @jsx React.DOM
 */

var React  = require('react')
  , Item   = require('./repositories__item')

module.exports = Repositories = React.createClass(
{
    render: function()
    {
      var rows = []
        , searched = this.props.filterText.toLowerCase()

      if( this.props.repositories )
      {
        this.props.repositories.forEach(function( repo )
        {
          if ( repo.searchable().search( searched ) === -1 )
            return

          rows.push( <Item repo={repo} key={repo.get('id')} />)
        }.bind(this))
      }

      return (
        <div className="repositories__list -loading">
          <ul>
            {rows}
          </ul>
        </div>
      )
    }
})
