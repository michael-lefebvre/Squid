
var tray = function()
{
  this._hires = this.hires()

  var icon = ( this._hires ) ? 'Icon-@2x.png' : 'Icon.png'

  // Create a tray icon
  this._tray = new gui.Tray({ title: '', icon: icon })

  return this
}

//  test for retina / high resolution / high pixel density.
tray.prototype.hires = function() 
{
  // starts with default value for modern browsers
  var dpr = window.devicePixelRatio ||

  // fallback for IE
      (window.screen.deviceXDPI / window.screen.logicalXDPI) ||

  // default value
      1;

  return !!(dpr > 1);
}

// Set new icon
tray.prototype.set = function( icon ) 
{
  if( this._hires )
    icon = icon + '-@2x'
  
  this._tray.icon = 'icons/' + icon + '.png'
}
