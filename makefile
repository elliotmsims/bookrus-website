# Based on a previous project's makefile:
# https://gitlab.com/caitlinlien/cs373-sustainability/-/blob/master/makefile

.DEFAULT_GOAL := all
MAKEFLAGS += --no-builtin-rules
SHELL         := bash

# All of these make commands must be called in root directory

# Backend development build/run commands (using Docker)

# Remove docker development container & volume
backend-clean:
	-docker container stop bookrus-backend-test
	-docker container rm bookrus-backend-test

backend-clean-image: backend-clean
	-docker image rm bookrus-backend-dev

backend-build: backend-clean-image
	cd backend; \
	docker build -t bookrus-backend-dev -f dev.Dockerfile .

backend-run: backend-clean
	cd backend; \
	docker run --name bookrus-backend-test -it -v `pwd`:/usr/src/backend -w /usr/src/backend -p 5000:5000 bookrus-backend-dev

backend-test:
	python3 backend/tests.py

# Frontend build/run commands
	
# Installs node packages
frontend-install:
	cd frontend; \
	npm install

# auto format frontend (add to make all format?)
frontend-format:
	cd frontend; \
	npx prettier --check "src/**/*.+(json|css|md|html|js|jsx)"; \
	npx eslint --fix "src/**/*.+(js|jsx)"

# Runs the development server on your local machine
frontend-start:
	cd frontend; \
	npm start

all:

# auto format the code
format:
	black ./backend/*.py

# check files, check their existence with make check
CFILES :=                                 \
    .gitignore                            \
    .gitlab-ci.yml              


# uncomment the following line once you've pushed your test files
# you must replace GitLabID with your GitLabID

# check the existence of check files
check: $(CFILES)

# remove temporary files
clean:
	rm -f  *.tmp
	rm -rf ./backend/__pycache__