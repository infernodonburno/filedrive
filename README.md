# Group Final

For this assessment students will work in a group(s) to write a full stack application. This will incorporate everything we 
learned in the classroom. Students will be given tasks across the full stack to ensure everyone works on all pieces of the 
application. The application will be managed in a simulated kan ban agile style and will make use of Github issues and Zenhub. 
During the first day of the assessment students will gather requirements with their techlead from stakeholders and begin 
designing and setting up the structure of their application. The target for the first week is to finish version 1.0 of their 
application and be ready for more requirements for week 2. The cut off for the project will be noon on Wednesday of week 2. 
That afternoon students will put together their presentations and each group will do at minimum 1 practice run. Thursday 
morning students will present their final projects.

## API Endpoints

### `GET /home`

#### Response
```javascript
{
    ['File']
    ['Folder']
}
```

### `GET /home/{filename}`

#### Response
```javascript
{
    filename: 'string'
    data: 'byte[]'
}
```

### `GET /home/folders/{folder}`

#### Response
```javascript
['File']
```

### `GET /home/folders/{folder}/{filename}`

#### Response
```javascript
{
    filename: 'string'
    data: 'byte[]'
}
```

### `GET /home/download/folders/{folder}`

#### Response
```javascript
['File']
```

### `GET /home/download/{filename}`

#### Response
```javascript
{
    filename: 'string'
    data: 'byte[]'
}
```

### `GET /home/download/folders/{folder}/{filename}`

#### Response
```javascript
{
    filename: 'string'
    data: 'byte[]'
}
```

### `GET /home/trash`

#### Response
```javascript
[`Folder`]
['File']
```

### `POST /home`

#### Request
```javascript
{
    filename: 'string'
    data: 'byte[]'
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful


### `POST /home/folders`

#### Request
```javascript
{
    foldername: 'string'
    ['File']
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful

### `POST /home/folders/{folder}`

#### Request
```javascript
{
    filename: 'string'
    data: 'byte[]'
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful

### `DELETE /home/trash/{filename}`

#### Request
```javascript
{
    filename: 'string'
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful

### `DELETE /home/trash/folders/{folder}`

#### Request
```javascript
{
    foldername: 'string'
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful

### `DELETE /home/trash/folders/{filename}`

#### Request
```javascript
{
    filename: 'string'
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful

### `PATCH /home/{filename}`
Moves file to another folder or to the trash

#### Request
```javascript
{
    foldername: 'string'
    isTrash: 'boolean'
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful

### `PATCH /home/folders/{foldername}/{filename}`
Moves file to another folder or to the trash

#### Request
```javascript
{
    foldername: 'string'
    isTrash: 'boolean'
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful

### `PATCH /home/folders/{foldername}`
Moves files to the trash

#### Request
```javascript
{
    foldername: 'string'
    isTrash: 'boolean'
}
```

#### Response
HTTP Status 200 if successful
HTTP Status 500 if unsuccessful