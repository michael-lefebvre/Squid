var React  = require('react')
  , Item   = require('./repositories__item.react')

var Repositories = React.createClass(
{
    render: function()
    {
      var rows = []
        , searched = this.props.filterText.toLowerCase()
        , klass    = 'repositories__list'

        if( !this.props.repositories )
          klass += ' loading'

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
        <div className={klass}>
          <ul>
            {rows}
          </ul>
        </div>
      )
    }
})

module.exports = Repositories
