# compare databases mariadb, postgresql and sqlite!

this application allows you to compare the process of accessing a database.

### Getting started

require application
```
sudo apt install jq
```

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
{ Time },{ RequestID },{ Node | DB },{ CRUD },{ Table },{ database_processing_time(ns) } <-DB
{ Time },{ RequestID },{ Node | DB },{ CRUD },{ Table },{ database_processing_time(ns) }
{ Time },{ RequestID },{ Node | DB },{ CRUD },{ Table },{ database_processing_time(ns) }
{ Time },{ RequestID },{ Node | DB },{ nodejs_processing_time(ns) }  <-Node
{ Time },{ RequestID },{ Node | DB },{ CRUD },{ Table },{ database_processing_time(ns) } <-DB
{ Time },{ RequestID },{ Node | DB },{ CRUD },{ Table },{ database_processing_time(ns) }
{ Time },{ RequestID },{ Node | DB },{ nodejs_processing_time(ns) }  <-Node
...
```
example
```
2022-01-03T08:31:33,av91mo1,DB,Update,Users,Node,96349186   <-request start
2022-01-03T08:31:33,av91mo1,DB,Read,Users,Node,100879878
2022-01-03T08:31:32,av91mo1,Node,101443756                  <-request end
2022-01-03T08:32:22,6oo66ulg,DB,Read,Users,Node,100879878   <-request start
2022-01-03T08:31:22,6oo66ulg,DB,Delete,Users,Node,95989782
2022-01-03T08:32:21,6oo66ulg,Node,98736907                  <-request end
...
```


## Used technology

Language
  - TypeScript
  - ShellScript

Backend
  - Express
  - Sequelize

Test framework
  - Jest
  - Bats-core

Infrastructure
  - Docker
  - Docker-Compose



## TODO
  - fix timezone to Asia/Tokyo createdAt, updatedAt
  - connect into sqlite database excepting by root user
  - npm audit fix

