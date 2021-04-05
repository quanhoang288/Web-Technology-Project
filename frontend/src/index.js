import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import auth from './store/reducers/auth'
import thunk from 'redux-thunk'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import  {composeWithDevTools} from 'redux-devtools-extension'


const rootReducer = combineReducers({
    
    authReducer: auth,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
export { store }
