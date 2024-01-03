// CookieConsent.js

import React from 'react';

const CookieConsent = ({ onAccept, onReject }) => {
  return (
    <div className="cookie-consent">
      <p>This website uses cookies. Do you accept?</p>
      <button onClick={onAccept}>Accept</button>
      <button onClick={onReject}>Reject</button>
    </div>
  );
};

export default CookieConsent;
