import React, { Component } from 'react';
import './App.css';
import Footer from './components/elements/Footer';
import TopNav from './components/elements/TopNav';
import pages from './pages';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ROUTES } from './configs';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Login from './components/forms/Login';
import Register from './components/forms/Register';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '8px',
  p: 4,
  padding: '50px',

  '@media only screen and (max-width: 700px)': {
    width: '70%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '8px',
    p: 4,
    padding: '50px',
  }
};

const listMenu = [
  { title: 'Home' },
  { title: 'Article' },
  { title: 'Create' },
  { title: 'Login' },
]

export default class App extends Component {
  state = {
    login: false,
    register: false,
    showPass: false,
    showMenu: false,
    succesLogin: false
  }

  _handleLogin = () => {
    this.setState({ login: !this.state.login });
  }

  _handleCheckLogin = () => {
    this.setState({
      login: !this.state.login,
      succesLogin: true
    });
  }

  _handleRegister = () => {
    this.setState({
      login: !this.state.login,
      register: !this.state.register
    });
  }

  _handleCloseRegister = () => {
    this.setState({ register: !this.state.register });
  }

  _handleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  }

  _handleRoutes = (name) => () => {
    if (name === 'Home') {
      window.location = '/Home';
    } else if (name === 'Article') {
      window.location = '/Article';
    } else {
      window.location = '/Create';
    }
    this.setState({ showMenu: !this.state.showMenu });
  }

  _renderModalLogin = () => {
    const { login } = this.state;
    return (
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={login}
        onClose={this._handleLogin}
      >
        <Box sx={style}>
          <Login
            isLogin={this._handleCheckLogin}
            isRegister={this._handleRegister}
          />
        </Box>
      </Modal>
    );
  }

  _renderModalRegister = () => {
    const { register } = this.state;
    return (
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={register}
        onClose={this._handleCloseRegister}
      >
        <Box sx={style}>
          <Register
            isLoginFromRegister={this._handleRegister}
          />
        </Box>
      </Modal>
    );
  }

  _renderMenu = () => {
    return (
      <ul className="container-menu">
        {listMenu.map((val, idx) => {
          if (val.title === 'Login') {
            return (
              <Button
                className='btn-login'
                onClick={this._handleLogin}
                variant='text'
              >
                Login
              </Button>
            )
          }
          return (
            <li
              className={window.location.pathname === `/${val.title}` ? 'active' : 'nonActive'}
              key={idx}
              onClick={this._handleRoutes(val.title)}
            >
              {val.title}
            </li>
          )
        })}
      </ul>
    );
  }

  render() {
    const { showMenu, succesLogin } = this.state;
    return (
      <React.Fragment>
        {this._renderModalLogin()}
        {this._renderModalRegister()}
        <BrowserRouter>
          <TopNav
            isLogin={succesLogin}
            isShowMenu={showMenu}
            showLogin={this._handleLogin}
            showMenu={this._handleMenu}
          />
          {showMenu ? this._renderMenu() :
            <main>
              <Switch>
                <Route component={pages.Home} exact path={ROUTES.HOME()} />
                <Route component={pages.Article} exact path={ROUTES.ARTICLE()} />
                <Route component={pages.ArticleDetails} exact path={ROUTES.ARTICLE_DETAILS(':id')} />
                <Route component={pages.Create} exact path={ROUTES.CREATE()} />
                <Redirect path="*" to={ROUTES.HOME()} />
              </Switch>
            </main>
          }
          {!showMenu && <Footer />}
        </BrowserRouter>
      </React.Fragment>
    );
  }
}