import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home, Input } from './screens/Screens';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import root from './redux/reducers';

const store = createStore(root);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/input/">Add</Link>
                </li>
              </ul>
            </nav>

            <Route path="/" exact component={Home} />
            <Route path="/input/" component={Input} />

          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
