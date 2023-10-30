import React, {useState} from 'react'
import './Login.css';
import { Link, useHistory} from 'react-router-dom';
import { logo } from '../asssets';
import {createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../../firebase';

function Login  () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
 


    const signIn = (e) =>{
        // no refreshing
        e.preventDefault();

        // firebase code login
        signInWithEmailAndPassword(auth, email, password)
        .then((auth) => {
            history.push('/')
        })
        .catch((error) => {
                alert(error.message);
            });

    }

    const register = (e )=>{
        e.preventDefault();

        //firebase register
 
        createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
            if(auth){
                history.push('/')
            }
            }).catch((error) => {
                alert(error.message);
            });
    };

  return (
    <div className='login'>
        <Link to='/'>
            <img className="login__logo" 
            src={logo}
            alt=''/>
        </Link>

        <div className='login__container'>
            <h1>Sign-in</h1>

            <form>
                <h5>E-mail</h5>
                <input type='text'  value={email} onChange={(e )=> setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button className='login__signInButton' type='submit' onClick={signIn}>Sign-In</button>
            </form>

            <p>
                By continuing, you agree to Amazon's Fake Conditions of Use and Privacy Notice.
            </p>

            <button className='login__registerButton' onClick={register}> Create your Amazon Account</button>

        </div>
        
    </div>
  )
}

export default Login