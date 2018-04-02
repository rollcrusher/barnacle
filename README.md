# qa3 [barnacle]

Start db
```
mongod --dbpath /usr/local/var/mongodb
```

Start server
```
node server.js
```

Load the page 
```
http://localhost:3000/
```

## Api

 * /api/animals
 * /api/animals/count
 * /api/animals/[:animal_id]
 
 
## Tests
 ```
 npm run test-api
 ```
 
## Code complexity by Plato

```
npm run code:analyse
```

## Static code analysis
```
npm run code:eslint
```