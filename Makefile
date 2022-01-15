# pull してからはじめに実行する
init:
	docker-compose -f docker-compose.mariadb.yml build
	docker-compose -f docker-compose.sqlite.yml build
	docker run -v `pwd`/src:/home/app/ --rm sequelize-databases-performance_node npm ci && ls ./node_modules/.bin

# mariadb のコンテナ操作する
mariadb-up:
	docker-compose -f docker-compose.mariadb.yml up -d
mariadb-down:
	docker-compose -f docker-compose.mariadb.yml down
mariadb-login:
	docker exec -it sequelize-databases-performance_db mariadb -u root -p database

# psql のコンテナ操作する
psql-up:
	docker-compose -f docker-compose.psql.yml up -d
psql-down:
	docker-compose -f docker-compose.psql.yml down
psql-login:
	docker exec -it sequelize-databases-performance_db psql -U root -d database

# sqlite の入った express のコンテナ操作する
sqlite-up:
	docker-compose -f docker-compose.sqlite.yml up -d
sqlite-down:
	docker-compose -f docker-compose.sqlite.yml down
sqlite-login:
	docker exec -it sequelize-databases-performance_node sqlite3 /home/db/sqlite.db

# express のコンテナを操作する
node-install:
	docker exec sequelize-databases-performance_node npm ci
node-tsc:
	docker exec sequelize-databases-performance_node tsc
node-typedoc:
	docker exec sequelize-databases-performance_node typedoc
node-migrate:
	docker exec sequelize-databases-performance_node sequelize-cli db:migrate
node-seed:
	docker exec sequelize-databases-performance_node sequelize-cli db:seed:all

