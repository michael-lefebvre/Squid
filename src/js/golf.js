
var GolfCore = function()
{
  // APP'S Constants
  // -------------

  // Current version of the library.
  this._VERSION           = '0.1.0'

  // return Golf reference
  return this
}

//  App Starter point
GolfCore.prototype.init = function()
{
  console.info( 'Initialize App router' )
}

// Global Init

console.groupCollapsed( 'Golf Global Init' )

window.Golf = new GolfCore()

