/**
 * @jsx React.DOM
 */

var React  = require('react')
  , PubSub = require('pubsub-js')

module.exports = Login = React.createClass(
{
    // Initialize

    componentDidMount: function()
    {
      this._feedbackNode = document.getElementById('js-login-feedback')
      this._loginEmail   = document.getElementById('input-username')
      this._loginPass    = document.getElementById('input-password')
      this._parent       = document.getElementById('squid-login')

      this._loginEmail.focus()

      this._parent.addEventListener( 'webkitAnimationEnd', function() 
      {
        this._parent.classList.remove('shake')
      }.bind( this ))
    }

    // Valid inputs

  , handleKey: function( event ) 
    {
      this._feedbackNode.innerHTML = ''

      if ( 
          event.keyCode == 13  
          && !this.isEmpty( event.target.value )
        )
          this.tryLogin()
    }

  , isEmpty: function( value )
    {
      value = value.trim()

      return ( !value || 0 === value.length )
    }

  , validInput: function( event )
    {
      var target = event.target
        , value  = target.value

      if( this.isEmpty( value ) )
      {
        event.preventDefault()

        target.classList.add('warning')
        return
      }
    }

    // Manage Loading

  , showLoading: function()
    {
      this._parent.classList.add('loading')
      this._loginEmail.disabled = true
      this._loginPass.disabled  = true

      this._loginEmail.blur()
      this._loginPass.blur()
    }

  , hideLoading: function()
    {
      this._parent.classList.remove('loading')
      this._loginEmail.disabled = false
      this._loginPass.disabled  = false
    }

    // Submit Form

  , tryLogin: function()
    {
      this.showLoading()

      var username = this._loginEmail.value
        , password = this._loginPass.value
        , encode   = window.btoa( unescape( encodeURIComponent( [ username, password ].join(':') ) ) )
        , self     = this

      var resetState = function()
      {
        self.hideLoading()
        self._loginEmail.focus()
      }

      var obj = {
          hash:    encode
        , success: function( response )
          {
            self._loginEmail.value = ''
            self._loginPass.value  = ''
            resetState()
          }
        , error:   function( response )
          {
            self._parent.classList.add('shake')

            // Display Error message
            var text = document.createTextNode( response )
            self._feedbackNode.appendChild( text )

            resetState()
          }
      }

      PubSub.publish( 'squid::userAuth', obj )
    }

  , render: function(){
      return (
        <div className="footer__login" id="squid-login">
          <div className="footer__login__warning" id="js-login-feedback"></div>
          <p className="form-control">
            <input type="text" id="input-username" className="input" placeholder="Your username or email"
              onKeyDown={this.handleKey}
              onBlur={this.validInput} />
          </p>
          <p className="form-control">
            <input type="password" id="input-password" className="input" placeholder="Your password" 
              onKeyDown={this.handleKey}
              onBlur={this.validInput} />
          </p>
          <p>
            We don’t store your credentials. But of course, we just need them to access your repositories.
          </p>
        </div>
      )
    }
})
