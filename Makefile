# *** 環境のセットアップ *******************************************************
# --- production ---------------------------------------------------------------
init-prod:
	docker-compose -f docker-compose.mariadb.yml build
	docker-compose -f docker-compose.sqlite.yml build
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server npm ci --only=production
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server chown -R `id -u`:`id -g` ./

# --- development --------------------------------------------------------------
init:
	docker-compose -f docker-compose.mariadb.yml build
	docker-compose -f docker-compose.sqlite.yml build
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server npm ci
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server ./node_modules/.bin/tsc
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server ./node_modules/.bin/tsc-alias -p tsconfig.json
	docker run -v `pwd`/src/response-api:/home/response-api/ --rm compare-databases-193_node-server chown -R `id -u`:`id -g` ./


# *** シナリオの実行 ***********************************************************
scenario=scenarioA.sh
execute:
	./src/request-script/src/execute.sh $(scenario)

# *** コンテナを立ち上げる *****************************************************
prod_compose_file=docker-compose.env_prod.yml
dev_compose_file=docker-compose.env_dev.yml
target_compose_file=$(dev_compose_file)
ifeq ($(SDP_ENVIRONMENT),production) 
	target_compose_file=$(prod_compose_file)
endif
up-mariadb:
	docker-compose -f docker-compose.mariadb.yml -f $(target_compose_file) up -d
up-psql:
	docker-compose -f docker-compose.psql.yml -f $(target_compose_file) up -d
up-sqlite:
	docker-compose -f docker-compose.sqlite.yml -f $(target_compose_file) up -d


# ---------- コンテナの停止、再起動 ----------
down:
	docker stop $$(docker ps -a -f name=compare-databases-193 -q)
	docker rm $$(docker ps -a -f name=compare-databases-193 -q)
restart:
	docker restart $$(docker ps -a -f name=compare-databases-193 -q)

# ---------- 各データベースにログインする ----------
login-mariadb:
	docker exec -it compare-databases-193_db mariadb -u root -ppassword database
login-psql:
	docker exec -it compare-databases-193_db psql -U root -d database
login-sqlite:
	docker exec -it compare-databases-193_node-server sqlite3 /home/db/sqlite.db

# db のデータが入ったvolumeを削除する
db-delete:
	docker volume rm $$(docker volume ls -f name=compare-databases-193 -q)
# 応急処置 sqlite の権限与えるのむずいかも
db-create-sqlite:
	docker volume create compare-databases-193_sqlite
	docker run -v compare-databases-193_sqlite:/home/db --rm compare-databases-193_node-server chown -R `id -u`:`id -g` /home/db/
db-logs:
	docker logs compare-databases-193_db -f


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

serv-migrate:
	docker exec compare-databases-193_node-server sequelize-cli db:migrate
serv-migrate-undo-all:
	docker exec compare-databases-193_node-server sequelize-cli db:migrate:undo:all
serv-seed:
	docker exec compare-databases-193_node-server sequelize-cli db:seed:all
serv-seed-undo-all:
	docker exec compare-databases-193_node-server sequelize-cli db:seed:undo:all


# ---------- テスト ----------
serv-target=index.test
serv-test:
	docker exec compare-databases-193_node-server jest $(serv-target)

shell-target=index.bats
shell-unit:
	./src/request-script/test/unitTest/$(shell-target)

e2e-target=index.sh
e2e:
	./src/request-script/test/e2eTest/$(e2e-target)

