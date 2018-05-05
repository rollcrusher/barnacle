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

 * api/animals/search/all
 * api/animals/search/id/\<animalId>
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

The following libraries were used:
* mochajs
* chai
* lodash-match-pattern
* mocha-allure-reporter

Commands for API tests launching:

 ```
 npm run test:api:list
 npm run test:api:allure
 ```
 
##### Front unit test
``` 
test:unit
```

##### Front test coverage
```
test:coverage
```