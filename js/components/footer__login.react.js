
var React        = require('react')
  , SquidActions = require('../actions/SquidActions')
  , UserStore    = require('../stores/UserStore')
  , Squid        = require('../utils/squid')

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

      // Store encoded user's 'creadentials
      Squid.setCredentials( encode )

      // Call Github API
      UserStore.requestUserApi()      
    }

  , render: function()
    {
      // console.log( 'this.props.hasAuthError', this.props.isAuth )
      // console.log( 'this.props.isAuth', this.props.hasAuthError )

      var feedbackTxt = ''

      if( this.props.isAuth )
      {
        this._loginEmail.value = ''
        this._loginPass.value  = ''

        this._loginEmail.focus()
      }

      if( this.props.hasAuthError )
      {
        this._parent.classList.add('shake')
        feedbackTxt = 'Try again, you gloupsed it up!'
      }

      if( 
          this.props.isAuth ||
          this.props.hasAuthError )
      {
        this.hideLoading()
        this._loginEmail.focus()
      }

      return (
        <div className="footer__login" id="squid-login">
          <div className="footer__login__warning" id="js-login-feedback">{feedbackTxt}</div>
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
