import React, { useEffect, useState } from 'react';
// import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { Button } from 'shards-react';

import DangKyDTButton from '../../components/post/DangKyDTButton';
import FileSubmitterButton from '../../components/FileSubmitter/FileSubmitterButton';
import GoogleLogin from '../../components/common/GoogleAuthButton/GoogleLogin';

import { gapi } from 'gapi-script';

// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;

// Array of API discovery doc URLs for APIs
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

const TestPage = () => {
  const [user, setUser] = useState(null);
  const [ auth2, setAuth2 ] = useState(null);
  useEffect(() => {
    console.log(process.env.REACT_APP_GOOGLE_LOG_IN_CLIENT_ID);
    gapi.load('client:auth2', initClient);
  }, []);

  const listFiles = (searchTerm = null) => {
    // setIsFetchingGoogleDriveFiles(true);
    // gapi.client.drive.files
    //   .list({
    //     pageSize: 10,
    //     fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
    //     q: "mimeType='image/jpeg'",
    //   })
    //   .then(function (response) {
    //     const res = JSON.parse(response.body);
    //     console.log(res.files);
    //   });
    var fileMetadata = {
      'name': '@@@@@@',
      'mimeType': 'application/vnd.google-apps.folder'
    };
    gapi.client.request({
      'path': 'https://www.googleapis.com/drive/v3/files/',
      'method': 'POST',
      'body': fileMetadata
    }).then((jsonRes, rawRes) => {
      console.log('***');
      console.log(jsonRes);
      console.log(rawRes);
    }).catch((err) => {
      console.log(err);
    });
    // gapi.client.drive.files.create({
    //   resource: fileMetadata,
    //   fields: 'id'
    // }, function (err, file) {
    //   console.log('in');
    //   if (err) {
    //     // Handle error
    //     console.error(err);
    //   } else {
    //     console.log('Folder Id: ', file.id);
    //   }
    // });
  };

  const handleLogin = (googleData) => {
    axios.post('/auth/google', { token: googleData.tokenId })
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  const updateSigninStatus = (isSignedIn) => {
    console.log('isSignedIn');

    if (isSignedIn) {
      // Set the signed in user
      // setSignedInUser(gapi.auth2.getAuthInstance().currentUser.je.Qt);
      console.log('gapi');
      // console.log(gapi.auth2.getAuthInstance().currentUser.je.Qt);
      // setIsLoadingGoogleDriveApi(false);
      // list files if user is authenticated
      listFiles();
    } else {
      // prompt user to sign in
      handleAuthClick();
    }
  };

  /**
   *  Sign in the user upon button click.
   */
  const handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
  };

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  const initClient = () => {
    // console.log('init');
    // console.log(gapi);
    // console.log(gapi.auth2.getAuthInstance());
    // console.log(gapi.auth2.getAuthInstance().currentUser.get());
    // setIsLoadingGoogleDriveApi(true);
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then((res) => {
          // Listen for sign-in state changes.
          console.log(res);
          console.log('listen');
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleClientLoad = () => {
    console.log('in');
    gapi.load('client:auth2', initClient);
  };

  return (
    <div>
      {/* <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_LOG_IN_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
        discoveryDocs={DISCOVERY_DOCS}
        scope={SCOPES}
      /> */}
      <GoogleLogin />
      <DangKyDTButton user={user}/>
      <FileSubmitterButton />
      <Button onClick={handleClientLoad}>Button</Button>
      <Button onClick={listFiles}>Files</Button>
    </div>
  );
}

export default TestPage;
