# ---------- pull してからはじめに実行する ----------
init:
	docker-compose -f docker-compose.mariadb.yml build
	docker-compose -f docker-compose.sqlite.yml build
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server npm ci
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server ./node_modules/.bin/tsc
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server ./node_modules/.bin/tsc-alias -p tsconfig.json
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server chown -R `id -u`:`id -g` ./

# ---------- コンテナを立ち上げる ----------
up-mariadb:
	docker-compose -f docker-compose.mariadb.yml -f docker-compose.env_dev.yml up -d
up-psql:
	docker-compose -f docker-compose.psql.yml -f docker-compose.env_dev.yml up -d
up-sqlite:
	docker-compose -f docker-compose.sqlite.yml -f docker-compose.env_dev.yml up -d

# ---------- 各種データベースにログインする ----------
login-mariadb:
	docker exec -it compare-databases-193_db mariadb -u root -p database
login-psql:
	docker exec -it compare-databases-193_db psql -U root -d database
login-sqlite:
	docker exec -it compare-databases-193_node-server sqlite3 /home/db/sqlite.db

# 応急処置 sqlite の権限与えるのむずいかも
sqlite-create-db:
	docker volume create compare-databases-193_sqlite
	docker run -v sequelize-databases-performance-sqlite:/home/db --rm compare-databases-193_node-server chown -R `id -u`:`id -g` /home/db/


down:
	docker stop $$(docker ps -a -f name=compare-databases-193 -q)
	docker rm $$(docker ps -a -f name=compare-databases-193 -q)
restart:
	docker restart $$(docker ps -a -f name=compare-databases-193 -q)

# db のデータが入ったvolumeを削除する
delete-db:
	docker volume rm $$(docker volume ls -f name=compare-databases-193 -q)

# ---------- express のコンテナを操作する ----------
serv-install:
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server npm ci 
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server chown -R `id -u`:`id -g` ./node_modules
serv-tsc:
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server ./node_modules/.bin/tsc
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server ./node_modules/.bin/tsc-alias
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server chown -R `id -u`:`id -g` ./dist
serv-typedoc:
	docker exec compare-databases-193_node-server typedoc
serv-logs:
	docker logs compare-databases-193_node-server -f

db-migrate:
	docker exec compare-databases-193_node-server sequelize-cli db:migrate
db-migrate-undo-all:
	docker exec compare-databases-193_node-server sequelize-cli db:migrate:undo:all
db-seed:
	docker exec compare-databases-193_node-server sequelize-cli db:seed:all
db-seed-undo-all:
	docker exec compare-databases-193_node-server sequelize-cli db:seed:undo:all

client-install:
	docker run -v `pwd`/src/request-page:/home/request-page/ --rm compare-databases-193_node-client npm ci 
	docker run -v `pwd`/src/request-page:/home/request-page/ --rm compare-databases-193_node-client chown -R `id -u`:`id -g` ./node_modules



# ---------- 本番環境でコンテナを立ち上げる ----------
init-prod:
	docker-compose -f docker-compose.mariadb.yml build
	docker-compose -f docker-compose.sqlite.yml build
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server npm ci --only=production
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server chown -R `id -u`:`id -g` ./
up-prod-mariadb:
	docker-compose -f docker-compose.mariadb.yml -f docker-compose.env_prod.yml up -d
up-prod-psql:
	docker-compose -f docker-compose.psql.yml -f docker-compose.env_prod.yml up -d
up-prod-sqlite:
	docker-compose -f docker-compose.sqlite.yml -f docker-compose.env_prod.yml up -d
