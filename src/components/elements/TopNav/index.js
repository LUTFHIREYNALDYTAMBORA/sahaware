import { Button } from '@mui/material';
import React, { Component } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './style.css';

const menus = [
  { title: 'Home' },
  { title: 'Article' },
  { title: 'Create' },
];

class TopNav extends Component {

  _handleRoutes = (name) => () => {
    if (name === 'Home') {
      window.location = '/Home';
    } else if (name === 'Article') {
      window.location = '/Article';
    } else {
      window.location = '/Create';
    }
  }

  render() {
    const { showLogin, showMenu, isShowMenu, isLogin } = this.props;
    return (
      <div className='container-topNav'>
        <div className='wrapp-logo'>
          <div className='logo-sahaware' />
          <ul className='list-menu'>
            {menus.map((val, idx) => {
              return (
                <li
                  className={window.location.pathname === `/${val.title}` ? 'active' : 'nonActive'}
                  key={idx}
                  onClick={this._handleRoutes(val.title)}
                >
                  {val.title}
                </li>
              );
            })}
          </ul>
        </div>
        <Button
          className='btn-login'
          onClick={showLogin}
          variant='text'
        >
          {isLogin ? 'Logout' : 'Login'}
        </Button>
        {
          isShowMenu ?
            <IconButton className='menu-icon' onClick={showMenu}>
              <CloseIcon />
            </IconButton> :
            <IconButton className='menu-icon' onClick={showMenu}>
              <MenuIcon />
            </IconButton>
        }
      </div >
    );
  }
}

export default TopNav;