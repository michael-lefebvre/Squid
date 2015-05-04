
var keyMirror = require('react/lib/keyMirror')

// Define action constants
module.exports = keyMirror(
{
    REPO_LOAD:         null
  , UPDATE_AVALAIBLE:  null
  , UPDATE_DOWNLOADED: null
  , UPDATE_INSTALLED:  null
  , SEARCH_VISIBLE:    null
  , USER_LOGIN:        null
  , USER_LOGIN_ERROR:  null
  , USER_CREDENTIALS:  null
  , USER_RECEIVE:      null
  , USER_ORGS:         null
})
