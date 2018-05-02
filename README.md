# qa3 [barnacle]

### Environment

Start mongodb 
```
mongod --dbpath /usr/local/var/mongodb
```

Start back server
```
npm run back:start

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
##### Animals

 * api/animals/list
 * api/animals/<animalId>
 * api/animals/create
 * api/animals/edit
 * api/animals/delete/\<animalId>
 
##### Features

 * api/features/search/all
 * api/features/search/id/\<featureId>
 * api/features/search/name/\<featureName>
 * api/features/create

 
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