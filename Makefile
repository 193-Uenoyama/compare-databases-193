# ---------- pull してからはじめに実行する ----------
init:
	docker-compose -f docker-compose.mariadb.yml build
	docker-compose -f docker-compose.sqlite.yml build
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm sequelize-databases-performance_node npm ci
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm sequelize-databases-performance_node ./node_modules/.bin/tsc
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm sequelize-databases-performance_node ./node_modules/.bin/tsc-alias -p tsconfig.json
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm sequelize-databases-performance_node chown -R `id -u`:`id -g` ./

# ---------- コンテナを立ち上げる ----------
up-mariadb:
	docker-compose -f docker-compose.mariadb.yml -f docker-compose.env_dev.yml up -d
up-psql:
	docker-compose -f docker-compose.psql.yml -f docker-compose.env_dev.yml up -d
up-sqlite:
	docker-compose -f docker-compose.sqlite.yml -f docker-compose.env_dev.yml up -d

# ---------- 各種データベースにログインする ----------
login-mariadb:
	docker exec -it sequelize-databases-performance_db mariadb -u root -p database
login-psql:
	docker exec -it sequelize-databases-performance_db psql -U root -d database
login-sqlite:
	docker exec -it sequelize-databases-performance_node-server sqlite3 /home/db/sqlite.db

# 応急処置 sqlite の権限与えるのむずいかも
sqlite-create-db:
	docker volume create sequelize-databases-performance-sqlite
	docker run -v sequelize-databases-performance-sqlite:/home/db --rm sequelize-databases-performance_node chown -R `id -u`:`id -g` /home/db/


down:
	docker stop $$(docker ps -a -f name=sequelize-databases-performance -q)
	docker rm $$(docker ps -a -f name=sequelize-databases-performance -q)
restart:
	docker restart $$(docker ps -a -f name=sequelize-databases-performance -q)

# db のデータが入ったvolumeを削除する
delete-db:
	docker volume rm $$(docker volume ls -f name=sequelize-databases-performance -q)

# ---------- express のコンテナを操作する ----------
node-install:
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm sequelize-databases-performance_node npm ci 
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm sequelize-databases-performance_node chown -R `id -u`:`id -g` ./node_modules
node-tsc:
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm sequelize-databases-performance_node ./node_modules/.bin/tsc
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm sequelize-databases-performance_node ./node_modules/.bin/tsc-alias
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm sequelize-databases-performance_node chown -R `id -u`:`id -g` ./dist
node-typedoc:
	docker exec sequelize-databases-performance_node-server typedoc
node-migrate:
	docker exec sequelize-databases-performance_node-server sequelize-cli db:migrate
node-seed:
	docker exec sequelize-databases-performance_node-server sequelize-cli db:seed:all



# ---------- 本番環境でコンテナを立ち上げる ----------
init-prod:
	docker-compose -f docker-compose.mariadb.yml build
	docker-compose -f docker-compose.sqlite.yml build
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm sequelize-databases-performance_node npm ci --only=production
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm sequelize-databases-performance_node chown -R `id -u`:`id -g` ./
up-prod-mariadb:
	docker-compose -f docker-compose.mariadb.yml -f docker-compose.env_prod.yml up -d
up-prod-psql:
	docker-compose -f docker-compose.psql.yml -f docker-compose.env_prod.yml up -d
up-prod-sqlite:
	docker-compose -f docker-compose.sqlite.yml -f docker-compose.env_prod.yml up -d
