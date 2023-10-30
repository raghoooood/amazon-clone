import React from 'react'
import logo from '../asssets/amazon_logo.png';
import  './Header.css';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SearchIcon from '@mui/icons-material/Search';

import {Link} from "react-router-dom"
import { useStateValue } from '../StateProvider';
import { auth } from '../../firebase';


function Header () {

  const [{basket, user}, dispatch] = useStateValue();
  console.log(user?.email);

  const handleAuthentication = () => {
    if(user) {
      auth.signOut();
    }
  }
  return (
    <div className='header'>
      <Link to="/">
        <img className="header__logo" src={logo} />
      </Link>

        <div className="header__search">
            <input  className="header__searchInput" 
            text="text"/>

            <SearchIcon className="header__searchIcon" />
        </div>

        <div className="header__nav">
          <Link to={!user &&'/login'}>

      <div onClick={handleAuthentication} className="header__option">
        <span className="header_optionLineOne">
            Hello {user ? `${user.email}` : "Guest"}
        </span>
        <span className="header_optionLineTwo">
           {user ? 'Sign Out' : 'Sign In'} 
        </span>

      </div>
          </Link>

          <Link to='/orders'>

      <div className="header__option">
        <span className="header_optionLineOne">
            Returns
        </span>
        <span className="header_optionLineTwo">
            & Orders
        </span>

      </div>
          </Link>

      <div className="header__option">
        <span className="header_optionLineOne">
            Your
        </span>
        <span className="header_optionLineTwo">
            Prime
        </span>

      </div>

      <Link to='/checkout'>
      <div className="header__optionBaset">

        <ShoppingBasketIcon />
        <span className="header_optionLineTwo header__basketCount">
           {basket?.length}
        </span>
      </div>
      </Link>
        </div>


    </div>
  )
}

export default Header