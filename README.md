# Group Final

For this assessment students will work in a group(s) to write a full stack application. This will incorporate everything we 
learned in the classroom. Students will be given tasks across the full stack to ensure everyone works on all pieces of the 
application. The application will be managed in a simulated kan ban agile style and will make use of Github issues and Zenhub. 
During the first day of the assessment students will gather requirements with their techlead from stakeholders and begin 
designing and setting up the structure of their application. The target for the first week is to finish version 1.0 of their 
application and be ready for more requirements for week 2. The cut off for the project will be noon on Wednesday of week 2. 
That afternoon students will put together their presentations and each group will do at minimum 1 practice run. Thursday 
morning students will present their final projects.

### File
```javascript
{
    fileinfo: 'FileInfo'
    data: 'byte[]'
}
```

### FileInfo
```javascript
{
    filename: 'string'
    id: 'integer'
}
```

### Folder
```javascript
{
    foldername: 'string'
    id: 'integer'
}
```

## API Endpoints

### `GET /files/{id}`
Gets a specific file

#### Response
```javascript
'FileInfo'
```

### `GET /files`
Gets all the files at the root

#### Response
```javascript
['FileInfo']
```

### `GET /folders/{id}`
Gets all the files of a specific folder

#### Response
```javascript
['FileInfo']
```

### `GET /folders`
Gets all the folders

#### Response
```javascript
['Folder']
```

### `GET /files/{id}/download`
Downloads a specific file

#### Response
```javascript
'File'
```

### `GET /folders/{id}/download`
Downloads a specific folder

#### Response
```javascript
['File']
```

### `GET /trash`
Gets all trash

#### Response
```javascript
['File']
['Folder']
```

### `POST /files`
Uploads a file at the root

#### Request
```javascript
{
    filename: 'string'
    data: 'byte[]'
}
```

#### Response
```javascript
'File'
```
HTTP Status 201 if successful
HTTP Status 500 if unsuccessful

### `POST /folders/{id}`
Uploads a file to a specific folder

#### Request
```javascript
{
    filename: 'string'
    data: 'byte[]'
}
```

#### Response
HTTP Status 201 if successful
HTTP Status 500 if unsuccessful

### `POST /folders`
Uploads a folder

#### Request
```javascript
{
    foldername: 'string'
    ['File']
}
```

#### Response
HTTP Status 201 if successful
HTTP Status 500 if unsuccessful

### `PATCH /files/{id}`
Moves file to another folder

#### Request
```javascript
{
    folder: 'Folder'
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful

### `PATCH /files/{id}/trash`
Moves file to trash or restores folder

#### Request
```javascript
{
    fileinfo: 'FileInfo'
    isTrash: 'boolean'
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful

### `PATCH /folders/{id}/trash`
Moves folder to trash or restores folder

#### Request
```javascript
{
    folder: 'Folder'
    isTrash: 'boolean'
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful

### `DELETE /files/{id}/trash`

#### Request
```javascript
{
    fileinfo: 'FileInfo'
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful

### `DELETE /folders/{id}/trash`

#### Request
```javascript
{
    folder: 'Folder'
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful
