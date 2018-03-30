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

**Api**

 * /api/animals
 * /api/animals/count
 * /api/animals/[:animal_id]
 
 
 Run API tests
 ```
 npm run test-api
 ```