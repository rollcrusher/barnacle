# qa3 [barnacle]

###Environment

Start mongodb 
```
mongod --dbpath /usr/local/var/mongodb
```

Start back server
```
node server.js
```

Start front server
```
npm run front:start
```
### Front
```
localhost:4200
```

### Back
#####Animals

 * localhost:3000/api/animals/list
 * localhost:3000/api/animals/<animal_id>
 
#####Features

 * localhost:3000/api/features/list
 * localhost:3000/api/features/<feature_id> 
 
### Tests

##### API tests
 ```
 npm run test-api
 ```
 
##### Front unit test
``` 
test:unit
```

##### Front test coverage
```
test:coverage
```