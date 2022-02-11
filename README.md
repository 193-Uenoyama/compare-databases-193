# compare databases mariadb, postgresql and sqlite!

## start! this application
```
make init-prod
source .env
```

## Technology
|         |     |            |
| ------  | --- | ---------- |
| Langage | ... | TypeScript |
| api     | ... | Express    |
| ORM     | ... | Sequelize  |

## TODO
 - fix timezone to Asia/Tokyo createdAt, updatedAt
 - connect into sqlite database excepting by root user
 - databases security
 - npm audit fix

## Logs format
```
[
  select: {
    processing_db: <db access (ns)>,
    processing_db: <db access (ms)>,
    processing_node: <node processing time (ns)>
    processing_node: <node processing time (ms)>
  },
  update: {
    processing_db: <db access (ns)>,
    processing_db: <db access (ms)>,
    processing_node: <node processing time (ns)>
    processing_node: <node processing time (ms)>
  },
  delete: {
    processing_db: <db access (ns)>,
    processing_db: <db access (ms)>,
    processing_node: <node processing time (ns)>
    processing_node: <node processing time (ms)>
  },

  ... etc ... 

]
```
