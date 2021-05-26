import React, { useState, useEffect } from "react";
import { gapi } from 'gapi-script';

// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;

// Array of API discovery doc URLs for APIs
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.install https://www.googleapis.com/auth/drive.apps.readonly https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.activity https://www.googleapis.com/auth/drive.activity.readonly https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.scripts';

const config = {
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  discoveryDocs: DISCOVERY_DOCS,
  scope: SCOPES,
};

const TestGAPI = () => {
  const [ gapiLoaded, setGapiLoaded ] = useState(false);

  useEffect(() => {
    gapi.load("client:auth2", initClient);
  }, []);

  const initClient = () => {
    console.log('init');

    gapi.client.init(config).then(() => {
      console.log('then');
      const auth2 = gapi.auth2.getAuthInstance();
      console.log(auth2);
      auth2.isSignedIn.listen(handleSigninStatusChange);

      const currentUser = auth2.currentUser.get();
      const authResponse = currentUser.getAuthResponse(true);
      if (authResponse && currentUser) {
        // save access token
        console.log('save access token 0');
        console.log(authResponse);
        console.log(currentUser.getBasicProfile());
        // listFiles();
      }
      setGapiLoaded(true);
    });
  };

  const handleSigninStatusChange = (isSignedIn) => {
    const auth2 = gapi.auth2.getAuthInstance();
    if (isSignedIn) {
      const currentUser = auth2.currentUser.get();
      const authResponse = currentUser.getAuthResponse(true);
      if (authResponse) {
        // save access token
        console.log('save access token');
      }
    }
  };

  const loadGapi = () => {
    console.log('load');
    gapi.load("client:auth2", initClient);
  }

  const listFiles = (searchTerm = null) => {
    // setIsFetchingGoogleDriveFiles(true);
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
        q: searchTerm,
      })
      .then(function (response) {
        const res = JSON.parse(response.body);
        console.log(res.files);
      });
  };

  const out = () => {
    console.log('out');
    gapi.auth2.getAuthInstance().signOut();
  }

  return gapiLoaded ? (
    <div>
      <div>Loaded</div>
      <div onClick={listFiles}>adasd</div>
      <div onClick={out}>Out</div>

    </div>
  ) : (
    <>
      <div onClick={loadGapi}>adasd</div>
      <div>Please provide clientId in the config</div>
    </>
  );
}

export default TestGAPI;
