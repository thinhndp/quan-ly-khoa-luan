import React, { useState, useEffect } from 'react';
import { gapi, loadAuth2 } from 'gapi-script'
import { Button } from "shards-react";

import './styles.css';

// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;

// Array of API discovery doc URLs for APIs
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

const config = {
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  discoveryDocs: DISCOVERY_DOCS,
  scope: SCOPES,
  cookiepolicy: 'single_host_origin',
};

const GoogleLogin  = ({ onSuccess, onFailure }) => {
  // let auth2;

  useEffect(() => {
    console.log('load');
    gapi.load("auth2", () => {
      const auth2 = gapi.auth2.init(config);
      attachSignin(document.getElementById('customBtn'), auth2);
    });
  }, []);

  function attachSignin(element, auth2) {
    console.log('element');
    console.log(element);
    console.log(element.id);
    auth2.attachClickHandler(element, {},
      function(googleUser) {
        // document.getElementById('name').innerText = "Signed in: " +
        //     googleUser.getBasicProfile().getName();
        // console.log()
        onSuccess({
          accessToken: auth2.currentUser.get().getAuthResponse().id_token
        });
        // auth2.grantOfflineAccess()
        //   .then((res) => {
        //     onSuccess({
        //       refreshToken: res.code,
        //       accessToken: auth2.currentUser.get().getAuthResponse().id_token
        //     });
        //   })
      }, function(error) {
        onFailure(error);
      });
  }

  // const signOut = () => {
  //   const auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(() => {
  //     setUser(null);
  //     console.log('User signed out.');
  //   });
  // }

  return (
    <Button id="customBtn" class="customGPlusSignIn">
      <img src="https://avatars.githubusercontent.com/u/7378196?s=200&v=4" class="icon"/>
      <span class="buttonText">Đăng nhập bằng tài khoản Google</span>
    </Button>
  );
}

export default GoogleLogin;
