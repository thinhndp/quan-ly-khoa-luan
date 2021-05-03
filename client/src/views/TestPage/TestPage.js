import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const TestPage = () => {
  useEffect(() => {
    console.log(process.env.REACT_APP_API_KEY);
  }, []);

  const handleLogin = (googleData) => {
    axios.post('/auth/google', { token: googleData.tokenId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
    <GoogleLogin
      clientId={process.env.REACT_APP_API_KEY}
      buttonText="Log in with Google"
      onSuccess={handleLogin}
      onFailure={handleLogin}
      cookiePolicy={'single_host_origin'}
    />
    </div>
  );
}

export default TestPage;
