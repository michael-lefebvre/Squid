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

      this.props.repos.forEach(function( repo )
      {
        if ( repo.name.toLowerCase().search( searched ) === -1 )
          return

        rows.push( <Item repo={repo} key={repo.id} />)
      }.bind(this))

      return (
        <div className="repositories__list -loading">
          <ul>
            {rows}
          </ul>
        </div>
      )
    }
})
