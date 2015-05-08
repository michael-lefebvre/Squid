
var React             = require('react')
  , RepositoriesStore = require('../stores/RepositoriesStore')

// Method to retrieve state from Stores
function getAppState() 
{
  return {
      searchStatus: RepositoriesStore.getSearch()
  }
}

var Search = React.createClass(
{
    // Get initial state from stores
    getInitialState: function() 
    {
      return getAppState()
    }

    // Add change listeners to stores
  , componentDidMount: function() 
    {
      RepositoriesStore.addChangeListener( this._onChange )
    }

    // Remove change listers from stores
  , componentWillUnmount: function() 
    {
      RepositoriesStore.removeChangeListener( this._onChange )
    }

  , componentDidUpdate: function()
    {
      if( this.state.searchStatus )
        document.getElementById('search-query').focus()
    }

  , handleChange: function() 
    {
      this.props.onUserInput(
          this.refs.filterTextInput.getDOMNode().value
      )
    }

  , render: function()
    {
      return (
        <input 
          type="search" 
          id="search-query" 
          className="input" 
          placeholder="Search a repository…" 
          ref="filterTextInput" 
          value={this.props.filterText}
          onChange={this.handleChange} />
      )
    }

    // Method to setState based upon Store changes
  , _onChange: function()
    {
      var _newState = getAppState()

      // if field is visible and user close it
      // we clear the search file to restore list
      if( this.state.searchStatus && !_newState.searchStatus )
        this.props.onUserInput('') 

      this.setState( _newState )
    }

})

module.exports = Search
