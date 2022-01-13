init:
	docker-compose -f docker-compose.yml -f docker-compose.mariadb.yml build
	docker-compose -f docker-compose.yml -f docker-compose.psql.yml build
	docker-compose -f docker-compose.yml -f docker-compose.sqlite.yml build
	docker-compose -f docker-compose.yml -f docker-compose.mariadb.yml up -d
	docker exec databases-performance_node_1 npm ci
	docker exec databases-performance_node_1 tsc
	docker-compose -f docker-compose.yml -f docker-compose.mariadb.yml down

mariadb-up:
	docker-compose -f docker-compose.yml -f docker-compose.mariadb.yml up -d
mariadb-down:
	docker-compose -f docker-compose.yml -f docker-compose.mariadb.yml down
psql-up:
	docker-compose -f docker-compose.yml -f docker-compose.psql.yml up -d
psql-down:
	docker-compose -f docker-compose.yml -f docker-compose.psql.yml down
sqlite-up:
	docker-compose -f docker-compose.yml -f docker-compose.sqlite.yml up -d
sqlite-down:
	docker-compose -f docker-compose.yml -f docker-compose.sqlite.yml down

node-install:
	docker exec databases-performance_node_1 npm ci
node-tsc:
	docker exec databases-performance_node_1 tsc
node-typedoc:
	docker exec databases-performance_node_1 typedoc
node-migrate:
	docker exec databases-performance_node_1 sequelize-cli db:migrate
node-seed:
	docker exec databases-performance_node_1 sequelize-cli db:seed:all

mariadb-login:
	docker exec -it databases-performance_db_1 mariadb -u root -p database
psql-login:
	docker exec -it databases-performance_db_1 psql -U root -d database
sqlite-login:
	docker exec -it databases-performance_node_1 sqlite3 /home/db/sqlite.db



