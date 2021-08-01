import React from 'react';
import { Provider } from 'react-redux'
import generateStore from './redux/store'
import Router from './components/router';

function App() {
  
    const store = generateStore()
  return (
    <Provider store={store}>
       <React.StrictMode>
          <Router />
        </React.StrictMode>  
    </Provider>
  );
 
}

export default App;
