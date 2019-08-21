import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
import { connect } from 'react-redux';
import { afterSignIn, afterSignOut } from '../redux/actions';
/*
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
*/

class LogIn extends React.Component {
	componentDidUpdate(){
		let { user } = this.props;
		/*if(user) {
			this.props.signIn(user);
		}
		else {
			this.props.signOut();
		}*/
	}
	render() {
		console.log(this.props)
		const {
			user,
			signOut,
			signInWithGoogle,
		} = this.props;
		return (
			<div className="App">
				<header className="App-header">
					{
						user
							? <p>Hello, {user.displayName}</p>
							: <p>Please sign in.</p>
					}
					{
						user
							? <button onClick={signOut}>Sign out</button>
							: <button onClick={signInWithGoogle}>Sign in with Google</button>
					}
				</header>
			</div>
		);
	}
}

/* const withFirebase = withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(LogIn);
*/
const mapStateToProps = (state) => {
	return state;
}
const mapDispatchToProps = {
	afterSignIn,
	afterSignOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);