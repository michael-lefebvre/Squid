
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

    // Receive inital repositories data
  , requestRepositories: function() 
    {
        AppDispatcher.handleAction({
            actionType:   SquidConstants.REPO_CALL
        })
    }

    // Clear repositories list
  , resetRepositories: function() 
    {
        AppDispatcher.handleAction({
            actionType:   SquidConstants.REPO_CLEAR
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
  , updateSearchVisible: function( state ) 
    {
        AppDispatcher.handleAction({
            actionType:  SquidConstants.SEARCH_VISIBLE
          , state:       state
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

    // dispatch auth error
  , errorUserLogin: function( response ) 
    {
        AppDispatcher.handleAction({
            actionType: SquidConstants.USER_LOGIN_ERROR
          , response:   response
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
