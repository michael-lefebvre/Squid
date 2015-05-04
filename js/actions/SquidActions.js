
var AppDispatcher  = require('../dispatcher/AppDispatcher')
  , SquidConstants = require('../constants/SquidConstants')

// Define action methods
var SquidActions = 
{
    // Receive inital repositories data
    receiveRepositories: function( repositories ) 
    {
        AppDispatcher.handleAction({
            actionType:   SquidConstants.REPO_LOAD
          , repositories: repositories
        })
    }

    // New app release infos
  , avalaibleAppUpdate: function( data ) 
    {
        AppDispatcher.handleAction({
            actionType: SquidConstants.UPDATE_AVALAIBLE
          , data:       data
        })
    }

    // New app release downloaded
  , downloadedAppUpdate: function( data ) 
    {
        AppDispatcher.handleAction({
            actionType: SquidConstants.UPDATE_DOWNLOADED
          , data:       data
        })
    }

    // New app release installed
  , installedAppUpdate: function( data ) 
    {
        AppDispatcher.handleAction({
            actionType: SquidConstants.UPDATE_INSTALLED
          , data:       data
        })
    }

    // Update search visibility status
  , updateSearchVisible: function( searchVisible ) 
    {
        AppDispatcher.handleAction({
            actionType:    SquidConstants.SEARCH_VISIBLE
          , searchVisible: searchVisible
        })
    }

    // Update search visibility status
  , updateUserLogin: function( profile ) 
    {
        AppDispatcher.handleAction({
            actionType: SquidConstants.USER_LOGIN
          , profile:    profile
        })
    }

    // Append user's Orgs to profile
  , postUserCredentials: function( credentials ) 
    {
        AppDispatcher.handleAction({
            actionType:  SquidConstants.USER_CREDENTIALS
          , credentials: credentials
        })
    }


    // Append user's Orgs to profile
  , addUserOrgs: function( orgs ) 
    {
        AppDispatcher.handleAction({
            actionType: SquidConstants.USER_ORGS
          , orgs:       orgs
        })
    }
}

module.exports = SquidActions
