# compare databases mariadb, postgresql and sqlite!

this application allows you to compare the process of accessing a database.

**start! this application**
```
make init-prod
source .env
```

---
## Logs format

### Log file name
[database_name].log

### Log file format
```
yyyy-mm-ddThh:mm:dd,database_processing_time(ns),nodejs_processing_time(ns)
yyyy-mm-ddThh:mm:dd,database_processing_time(ns),nodejs_processing_time(ns)
yyyy-mm-ddThh:mm:dd,database_processing_time(ns),nodejs_processing_time(ns)
...
```
example
```
2022-01-03T08:31:32,340978890,499928023
2022-02-11T23:25:47,96349186,101443756
2022-02-11T23:25:47,113210153,117685721
...
```


---
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


---

## TODO
  - fix timezone to Asia/Tokyo createdAt, updatedAt
  - connect into sqlite database excepting by root user
  - databases security
  - npm audit fix
