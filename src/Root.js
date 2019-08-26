import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home, Input, LogIn, Trainings, Training } from './screens/Screens';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import root from './redux/reducers';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';


const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
	googleProvider: new firebase.auth.GoogleAuthProvider(),
};
const store = createStore(root);

class Root extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}

	}
	render() {
		let props = this.props;
		console.log(props);
		return (
			<Provider store={store}>
				<div className="App">
					<Router>
						<div>
							<nav className="navbar">

								<div>
									<div style={{ float: 'left', marginLeft: '8%', color: '#F2F2FC' }}>
										<h1 className="title"><Link to="/">ProGress Tracker</Link></h1>
									</div>
									<ul>

										<li>
											<NavLink exact to="/login/">Log In</NavLink>
										</li>

										<li>
											<NavLink exact to="/input/">Add</NavLink>
										</li>
										<li>
											<NavLink to="/trainings">Trainings</NavLink>
										</li>
										<li>
											<NavLink exact to="/">Home</NavLink>
										</li>
									</ul>
								</div>
							</nav>

							<Route path="/" exact render={() => <Home user={props.user} />} />
							<Route path="/input/" render={() => <Input { ...props} />} />
							<Route path="/login/" render={() => <LogIn {...props} />} />
							<Route path="/trainings" exact render={() => <Trainings user={props.user} />} />
							<Route path="/trainings/:timestamp" render={(routeProps) => <Training {...props} { ...routeProps} />} />
						</div>
					</Router>
				</div>
			</Provider>
		);
	}
}

export default withFirebaseAuth({
	providers,
	firebaseAppAuth,
})(Root);