# this directory contains the source for this application.

## request-script
  - language ... ShellScript
  - about ... send request to server(response-api)
  - execute
    ```
    $ make execute
    ```
  - unit test
    ```
    $ make shell-unit
    ```    
  - end to end test
    ```
    $ make e2e
    ```

## response-api
  - language ... TypeScript
  - about ... return response to client(request-script)
  - test
    ```
    $ make serv-test
    ```

## start application for development this application.
```
make init
source .env development
```
