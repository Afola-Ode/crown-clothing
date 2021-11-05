import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Shop from './pages/Shop/Shop';
import SignInAndSignUp from './pages/Sign-in-and-Sign-up/Sign-in-and-Sign-Up';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';

import './App.css';

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
      <Router>
        <Header />
        <Switch>
          <Route exact path ="/" component = {Home} />
          <Route path ="/shop" component = {Shop} />
          <Route path ="/signin" component = {SignInAndSignUp} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
