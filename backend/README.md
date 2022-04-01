# BookRUs - Backend

To run the backend for development purposes, please run the following commands:

`docker build -t bookrus-backend-dev -f dev.Dockerfile .`

``docker run -it -v `pwd`:/usr/src/backend -w /usr/src/backend -p 5000:5000 bookrus-backend-dev``

If you have `make`, you can run:

`make backend-build`

`make backend-run`

After this, the *development* server should be running at <localhost:5000>.

# Notes for using the API

In order to receive actual JSON data and NOT an error message, make sure your headers accept `application/vnd.api+json`.

For example, if you are trying to make an API request in `curl`:

```
    curl --header "Accept: application/vnd.api+json" localhost:5000/api/book/1
```

The above will return details on the book with id 1.