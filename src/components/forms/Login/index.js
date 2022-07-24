import React, { Component } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import axios from 'axios';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { ENV } from '../../../configs';

const btnLogin = {
  marginTop: '40px',
  textTransform: 'capitalize',
}

class Login extends Component {
  state = {
    showPass: false,
    email: '',
    errorMessageEmail: false,
    password: '',
    errorMessagePassword: false,
    errorLogin: false,
  }

  _handleChangeInput = (e) => {
    const { password, email } = this.state;
    const validEmail = email.match(/@/);
    this.setState({ [e.target.name]: e.target.value, errorLogin: false });
    if (e.target.name === 'email' && validEmail === null) {
      this.setState({ errorMessageEmail: true });
    } else if (e.target.name === 'password' && password.length < 7) {
      this.setState({ errorMessagePassword: true });
    } else {
      this.setState({
        errorMessageEmail: false,
        errorMessagePassword: false,
      });
    }
  }

  _handleShowPass = () => {
    this.setState({ showPass: !this.state.showPass });
  }

  _handleLogin = () => {
    const { email, password } = this.state;
    const url = `${ENV.base_url}/api/auth/login`;
    axios.post(url, { "email": email, "password": password })
      .then(() => {
        this.props.isLogin(true);
      })
      .catch(() => {
        this.setState({ errorLogin: true });
      });
  }

  render() {
    const { isRegister } = this.props;
    const { errorLogin, showPass, email, password, errorMessageEmail, errorMessagePassword } = this.state;
    return (
      <React.Fragment>
        {errorLogin &&
          <div className="wrapper-failed-register">
            <CancelRoundedIcon color="error" />
            Login Failed, Please Try Again
          </div>
        }
        <h2>Login</h2>
        <div className="wrapp-title-login">Don’t have an account?&nbsp;
          <span className="wrapp-create-account" onClick={isRegister}>Create Account</span>
        </div>
        <div className="container-fields">
          <p>Email</p>
          <input
            className="field"
            name="email"
            onChange={this._handleChangeInput}
            type="email"
            placeholder="Entry your email"
            value={email}
          />
          {errorMessageEmail &&
            <div className="validation-error">Please enter a valid email address.</div>
          }
          <p>Password</p>
          <div className="wrapp-field-pass">
            <input
              className="field-pass"
              name="password"
              onChange={this._handleChangeInput}
              type={showPass ? 'text' : 'password'}
              placeholder="Entry your password"
              value={password}
            />
            {showPass ?
              <IconButton className='icon-button' onClick={this._handleShowPass}>
                <VisibilityOffIcon className='icon' />
              </IconButton> :
              <IconButton className='icon-button' onClick={this._handleShowPass}>
                <VisibilityIcon className='icon' />
              </IconButton>
            }
          </div>
          {errorMessagePassword &&
            <div className="validation-error">Your password must contain minimun 8 characters</div>
          }
        </div>
        <Button
          className='button-login'
          color='error'
          onClick={this._handleLogin}
          sx={btnLogin}
          variant='contained'
        >
          Log in
        </Button>
      </React.Fragment>
    );
  }
}

export default Login;