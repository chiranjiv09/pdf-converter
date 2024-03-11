import React, {useState, useEffect} from 'react';

import './App.css';
import './home.css';

import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';


function App() {
  const [pageChange, setPageChange] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setPageChange(false)
    }, 1500);
  },[]);

  return (
    
      <div className="App">
        {pageChange ?(
          <LandingPage />
        ):(
          <HomePage />
        )}

      </div>
  );
}

export default App;
