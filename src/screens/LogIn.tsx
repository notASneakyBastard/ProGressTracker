import React from 'react'

import { connect } from 'react-redux'
import { afterSignIn, afterSignOut } from '../redux/actions'
/*
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
*/

interface Props {
  user?: { displayName: string },
  signOut?: VoidFunction,
  signInWithGoogle?: VoidFunction
}

const LogIn: React.FunctionComponent<Props> = ({ user, signOut, signInWithGoogle }: Props) => {

  if (user)
    return (
      <div className="App">
        <header className="App-header">
          <p>Hello, {user.displayName}</p>
          <button onClick={signOut}>Sign out</button>
        </header>
      </div>
    )

  return (
    <div className="App">
      <header className="App-header">
         <p>Please sign in.</p>
         <button onClick={signInWithGoogle}>Sign in with Google</button>
      </header>
    </div>
  );
}

/* const withFirebase = withFirebaseAuth({
          providers,
          firebaseAppAuth,
})(LogIn);
*/
const mapStateToProps = (state: any) => {
  return state
}
const mapDispatchToProps = {
  afterSignIn,
  afterSignOut
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);