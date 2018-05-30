# qa3 [barnacle]

### Environment

Start mongodb 
```
npm run db:start
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
http://localhost:4200/
```

### Back
```
http://localhost:3000/
```

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
* angular 5
* mongoose
* bootstrap
* mochajs
* chai
* lodash-match-pattern
* mocha-allure-reporter
* nightwatch-cucumber

##### API tests
 ```
 npm run test:api:list
 npm run test:api:allure
 ```
 
##### e2e tests
```
npm run test:e2e
```


##### Front unit tests
``` 
npm run test:unit
```

##### Front tests coverage
```
npm run test:coverage
```