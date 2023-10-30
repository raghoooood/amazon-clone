import React, { useEffect } from 'react';
import './App.css';
import Header  from './components/Header/Header';
import Home from './components/home/Home';
import Checkout from './components/checkoutComponents/Checkout';
import Login from './components/login/Login';
import Orders from './components/orders/Orders';
import {auth} from './firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useStateValue } from './components/StateProvider';
import Payment from './components/payment/Payment';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


function App() {

  const [{} , dispatch] = useStateValue();

  const promise = loadStripe("pk_test_51N21YYKMl3kfoJMxAHwECWkW1u8pyyNfN1KYSs8rUoFD0QrnuFSou6BAOxeAeCZnUavdBJ4yzaTDXPUA2cJsfYSR00QKt9H4R1")
  useEffect(() => {
    // will only run when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      //console.log('THE USER IS>>', authUser);
     
      if(authUser){
        dispatch({
          type: "SET_USER",
          user: authUser,

        });
      } else{
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  },[]);

  return (

    <Router>
      <div className="App">
      <Switch>
        <Route path="/orders">
         < Header />

          <Orders/>
        </Route>

        <Route path="/login">
          <Login/>
        </Route>
        <Route Route path = "/checkout">
          < Header />

          <Checkout/>

        </Route>
        < Route Route path = "/payment" >
          
          <Header />
          
          <Elements stripe={promise}>

          <Payment />

          </Elements>


          </Route>

       

        <Route path="/">
          < Header />
            < Home />
        </Route>

        
      </Switch>
    </div>
    </Router>
     
     
  );
}

export default App;
