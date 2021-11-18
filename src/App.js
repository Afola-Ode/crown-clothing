import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'; 
import { selectCurrentUser
 } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import './App.css';

import {persistor} from './redux/store';

import Header from './components/Header/Header';
import Home from './pages/Home';
import Shop from './pages/Shop/Shop';
import SignInAndSignUp from './pages/Sign-in-and-Sign-up/Sign-in-and-Sign-Up';
import Checkout from './pages/checkout/checkout';
import { PersistGate } from 'redux-persist/lib/integration/react';

class App extends Component {
  unsubscribeFromAuth = null 

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
        });
        
      }
      setCurrentUser(userAuth)
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path ="/" component = {Home} />
          <Route path ="/shop" component = {Shop} />
          <Route exact path ="/checkout" component = {Checkout} />
          <Route 
            exact 
            path ="/signin" 
            render = {() => 
              this.props.currentUser ? (
                <Redirect to ='/' />
              ) : (
                <SignInAndSignUp />
              )} />
        </Switch>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(null, mapDispatchToProps)(App);
 