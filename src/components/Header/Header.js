import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import CartIcon from '../Cart-Icon/Cart-Icon';

import { ReactComponent as Logo} from '../../assets/crown.svg';

import './Header.scss';
import CartDropdown from '../Cart-Dropdown/Cart-Dropdown';

const Header = ({currentUser, hidden}) => {
    return (
        <div className ="header">
           <Link to ="/" className ="logo-container">
               <Logo className ="logo" />
            </Link>  
            <div className ="options">
                <Link className ="option" to ="/shop">SHOP</Link>
                <Link className ="option" to ="/contact">CONTACT</Link>
                {
                    currentUser ? <div className ='option' onClick ={() => auth.signOut()}>SIGN OUT</div> : <Link className ='option' to ='/signin'>SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {
                hidden ? null : <CartDropdown/>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
