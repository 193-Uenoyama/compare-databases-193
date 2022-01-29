# compare databases mariadb, postgresql and sqlite!

## start! this application
```
source .env
make init-prod
```

## Technology
|         |     |            |
| ------  | --- | ---------- |
| Langage | ... | TypeScript |
| api     | ... | Express    |
| ORM     | ... | Sequelize  |

## TODO
 - connect into sqlite database excepting by root user
 - databases security

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
