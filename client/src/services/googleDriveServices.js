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
