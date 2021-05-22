import axios from 'axios';
import { gapi } from 'gapi-script';

const endpoint = 'https://www.googleapis.com/drive/v3/files';

export const createFolder = (name) => {
  var fileMetadata = {
    'name': name,
    'mimeType': 'application/vnd.google-apps.folder'
  };
  return gapi.client.request({
    'path': endpoint,
    'method': 'POST',
    'body': fileMetadata
  })
}

export const setPermission = (id, role = 'writer', type = 'anyone') => {
  return gapi.client.request({
    'path': `${endpoint}/${id}/permissions`,
    'method': 'POST',
    'body': {
      'role': role,
      'type': type
    }
  });
}

export const uploadFileToFolder = (fileMetadata, file) => {
  const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(fileMetadata)], {type: 'application/json'}));
    form.append('file', file);
    // return fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    //   method: 'POST',
    //   headers: new Headers({'Authorization': 'Bearer ' + gapi.auth.getToken().access_token}),
    //   body: form
    // })

    let config = {
      headers: {
        Authorization: 'Bearer ' + gapi.auth.getToken().access_token
      }
    };
    return axios.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', form, config);

    // return gapi.client.request({
    //   'path': 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    //   'method': 'POST',
    //   'headers': new Headers({'Authorization': 'Bearer ' + gapi.auth.getToken().access_token}),
    //   'body': form
    // });
}
