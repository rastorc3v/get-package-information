# get-package-information

-----

## Description

This module provides functions to get information
about other not installed modules in JSON format. It executes npm
info command to get specific data from package.json.

## Available information to get:

- Dependencies
- Development dependencies
- All dependencies
- Other fields (version, description, keywords, etc.)

## API

- [getDependencies](#getdependencies)
- [getDependenciesSync](#getdependenciessync)
- [getDevDependencies](#getdevdependencies)
- [getDevDependenciesSync](#getdevdependenciessync)
- [getAllDependencies](#getalldependencies)
- [getAllDependenciesSync](#getalldependenciessync)  
- [getFields](#getfields)
- [getFieldsSync](#getfieldssync)

### getDependencies
```javascript
import { getDependencies } from "get-package-information";

getDependencies('webpack').then((dependencies => {
    console.log(dependencies);
})); 
```
_Result:_
```json
{
    "@types/eslint-scope": "^3.7.0",
    "@types/estree": "^0.0.50",
    "@webassemblyjs/ast": "1.11.1",
    ...
}
```

### getDependenciesSync
```javascript
import { getDependenciesSync } from "get-package-information";

const dependencies = getDependenciesSync('webpack'); 
console.log(dependencies);
```
_Result:_
```json
{
    "@types/eslint-scope": "^3.7.0",
    "@types/estree": "^0.0.50",
    "@webassemblyjs/ast": "1.11.1",
    ...
}
```

### getDevDependencies
```javascript
import { getDevDependencies } from "get-package-information";

getDevDependencies('webpack').then((devDependencies => {
    console.log(devDependencies);
})); 
```
_Result:_
```json
{
    "@babel/core": "^7.11.1",
    "@babel/preset-react": "7.10.4",
    "@types/es-module-lexer": "^0.4.1",
    ...
}
```

### getDevDependenciesSync
```javascript
import { getDevDependenciesSync } from "get-package-information";

const devDependencies = getDevDependenciesSync('webpack');
console.log(devDependencies);
```
_Result:_
```json
{
    "@babel/core": "^7.11.1",
    "@babel/preset-react": "7.10.4",
    "@types/es-module-lexer": "^0.4.1",
    ...
}
```

### getAllDependencies
```javascript
import { getAllDependencies } from "get-package-information";

getAllDependencies('webpack').then((dependencies => {
    console.log(dependencies);
})); 
```
_Result:_
```json
{
  "dependencies": {
    "@types/eslint-scope": "^3.7.0",
    "@types/estree": "^0.0.50",
    ...
  },
  "devDependencies": {
    "@babel/core": "^7.11.1",
    "@babel/preset-react": "^7.10.4",
    ...
  }
}
```

### getAllDependenciesSync
```javascript
import { getAllDependencies } from "get-package-information";

const dependencies = getAllDependencies('webpack');
console.log(dependencies);
```
_Result:_
```json
{
  "dependencies": {
    "@types/eslint-scope": "^3.7.0",
    "@types/estree": "^0.0.50",
    ...
  },
  "devDependencies": {
    "@babel/core": "^7.11.1",
    "@babel/preset-react": "^7.10.4",
    ...
  }
}
```

### getFields
```javascript
import { getFields } from "get-package-information";

getFields('webpack', ['author', 'description', 'repository']).then(info => {
    console.log(info);
    console.log(info.repository.url);
});
```
_Result:_
```json5
{
  "author": 'Tobias Koppers @sokra',
  "description": 'Packs CommonJs/AMD modules for the browser...',
  "repository": { "type": 'git', "url": 'git+https://github.com/webpack/webpack.git' }
}
git+https://github.com/webpack/webpack.git
```

### getFieldsSync
```javascript
import { getFieldsSync } from "get-package-information";

const info = getFieldsSync('webpack', ['author', 'description', 'repository']);
console.log(info);
console.log(info.repository.url)
```
_Result:_
```json5
{
  "author": 'Tobias Koppers @sokra',
  "description": 'Packs CommonJs/AMD modules for the browser...',
  "repository": { "type": 'git', "url": 'git+https://github.com/webpack/webpack.git' }
}
git+https://github.com/webpack/webpack.git
```
