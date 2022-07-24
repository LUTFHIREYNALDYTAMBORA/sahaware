import React, { Component } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import axios from 'axios';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { ENV } from '../../../configs';

const btnLogin = {
  marginTop: '40px',
  textTransform: 'capitalize',
}

class Register extends Component {
  state = {
    showPass: false,
    fullName: '',
    email: '',
    errorMessageEmail: false,
    password: '',
    errorMessagePassword: false,
    phone: '',
    successRegister: false,
    errorRegister: false
  }

  _handleChangeInput = (e) => {
    const { password, email } = this.state;
    const validEmail = email.match(/@/);
    this.setState({ [e.target.name]: e.target.value, errorRegister: false });
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

  _handleRegister = () => {
    const { email, password, fullName, phone } = this.state;
    const url = `${ENV.base_url}/api/auth/register`;
    axios.post(url, {
      "name": fullName,
      "email": email,
      "password": password,
      "phone": phone
    })
      .then(() => {
        this.setState({ successRegister: true });
      })
      .catch(() => {
        this.setState({ errorRegister: true });
      });
  }

  _handleShowPass = () => {
    this.setState({ showPass: !this.state.showPass });
  }

  render() {
    const { isLoginFromRegister } = this.props;
    const { showPass, email, password, phone, successRegister,
      errorMessageEmail, errorMessagePassword, fullName, errorRegister
    } = this.state;
    return (
      <React.Fragment>
        {successRegister &&
          <div className="wrapper-success-register">
            <InfoRoundedIcon color="success" />
            Registration is Successful, Please Login
          </div>
        }
        {errorRegister &&
          <div className="wrapper-failed-register">
            <CancelRoundedIcon color="error" />
            Registration is Failed, Please Try Again
          </div>
        }
        <h2>Create Account</h2>
        <div className="wrapp-title-login">Have an account?&nbsp;
          <span className="wrapp-create-account" onClick={isLoginFromRegister}>Login</span>
        </div>
        <div className="container-fields">
          <p>Fullname</p>
          <input
            className="field"
            name="fullName"
            onChange={this._handleChangeInput}
            type="email"
            placeholder="Entry your fullname"
            value={fullName}
          />
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
          <p>Phone</p>
          <input
            className="field"
            name="phone"
            onChange={this._handleChangeInput}
            type="number"
            placeholder="Entry your phone"
            value={phone}
          />
        </div>
        <Button
          className='button-login'
          color='error'
          onClick={this._handleRegister}
          sx={btnLogin}
          variant='contained'
        >
          Create Account
        </Button>
      </React.Fragment>
    );
  }
}

export default Register;