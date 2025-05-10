import React from 'react';
import Header from '../components/Header';

function Home() {
  return (
   <>
   <div className='home'>
    <Header/>
      <h1>Welcome to the URL Shortener</h1>
      <p>Register or login to start shortening your URLs!</p>
    </div>
    </>
  );
  
}

export default Home;
