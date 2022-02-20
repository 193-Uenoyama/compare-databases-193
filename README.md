# compare databases mariadb, postgresql and sqlite!

this application allows you to compare the process of accessing a database.

**start! this application**
```
make init-prod
source .env
```

## Logs format

### Log file name
[database_name].log

### Log file format
```
{ RequestID },{ Node | DB },{ CRUD },{ Table },{ Time },{ database_processing_time(ns) } <-DB
{ RequestID },{ Node | DB },{ CRUD },{ Table },{ Time },{ database_processing_time(ns) }
{ RequestID },{ Node | DB },{ CRUD },{ Table },{ Time },{ database_processing_time(ns) }
{ RequestID },{ Node | DB },{ Time },{ nodejs_processing_time(ns) }  <-Node
{ RequestID },{ Node | DB },{ CRUD },{ Table },{ Time },{ database_processing_time(ns) } <-DB
{ RequestID },{ Node | DB },{ CRUD },{ Table },{ Time },{ database_processing_time(ns) }
{ RequestID },{ Node | DB },{ Time },{ nodejs_processing_time(ns) }  <-Node
...
```
example
```
2h5tav91mo1,DB,Update,Users,Node,2022-01-03T08:31:33,96349186   <-request start
2h5tav91mo1,DB,Read,Users,Node,2022-01-03T08:31:33,100879878
2h5tav91mo1,Node,2022-01-03T08:31:32,101443756                  <-request end
2h8m6oo66ulg,DB,Read,Users,Node,2022-01-03T08:32:22,100879878   <-request start
2h8m6oo66ulg,DB,Delete,Users,Node,2022-01-03T08:31:22,95989782
2h8m6oo66ulg,Node,2022-01-03T08:32:21,98736907                  <-request end
...
```


## Used technology

Language
  - TypeScript
  - ShellScript

Backend
  - Express
  - Sequelize

Frontend
  - React

Test framework
  - Jest
  - Bats-core
  - Shellnium

Infrastructure
  - Docker
  - Docker-Compose



## TODO
  - fix timezone to Asia/Tokyo createdAt, updatedAt
  - connect into sqlite database excepting by root user
  - databases security
  - npm audit fix
