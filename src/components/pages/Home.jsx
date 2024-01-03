import React, { useEffect, useState } from 'react'
import CookieConsent from '../CookieConsent'




const Home = () => {


  const [showCookieConsent, setShowCookieConsent] = useState(true);

  useEffect(() => {
    // Check local storage for user's choice
    const userChoice = localStorage.getItem('cookieConsent');

    if (userChoice === 'accepted') {
      setShowCookieConsent(false);
    }
  }, []);

  const handleAccept = () => {
    // Save user's choice in local storage
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  const handleReject = () => {
    // Save user's choice in local storage (optional)
    localStorage.setItem('cookieConsent', 'rejected');
    setShowCookieConsent(false);
  };



  return (
    <>

<div className="app">
      {/* Your main content */}

      {/* Conditionally render CookieConsent */}
      {showCookieConsent && (
        <CookieConsent onAccept={handleAccept} onReject={handleReject} />
      )}
    </div>



        <div className='container'>
            <h3>home</h3>
        </div>
    </>
  )
}

export default Home