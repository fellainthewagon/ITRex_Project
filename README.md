# Project "Clinic"

### App description

Version of node and npm:
`npm 7.17.0`
`node 14.15.5`

Clone the repo, install the dependencies and run.

```bash
git clone https://github.com/fellainthewagon/ITRex_Project.git
```

#### How to run App:

Frontend:

```sh
cd server
npm i
npm run dev
```

Backend:

```sh
cd client
npm i
npm start
```

> NOTE: configure the App with your environment variables! Use `.env.example` file.
> Or use default vars which is in `config` folder file.

#### Storage type

"In-Memory" (the RAM of your machine) storage set by default (`.env.example`).
You can use different types of storage for different entities.
For example, if you want to use "Redis" to store only "resolutions", run App with the following command:

```sh
RESOLUTIONS=redis npm run dev
```

In this configuration above, the "queue" data will use the default storage - "In-Memory"

> NOTE: you must have [redis server](https://redis.io/topics/quickstart) running before running the application.

#### Time to live (TTL)

You can set TTL manually. In this case, the TTL will be equal to 1 hour:

```sh
TTL=3600 npm run dev
```

#### How to run API tests:

```sh
cd server
npm run test
```

#### How to up App:

```sh
cd project
docker-compose up -d
```

Then click http://localhost:5000

If you want to change the storage type, add values (redis/memory) to the `docker-compose.yml`.

```
    environment:
      DEV_REDIS_HOST: redis
      RESOLUTION: # redis || memory
      QUEUE: # redis || memory
```

#### API documentation:

```sh
http://localhost:3000/api-docs
```

## Description

### A sigle Express-based app with two unrelated functionality:

1. In-memory stack (FIFO)
2. In-memory key-value store with TTL

#### In-memory stack (FIFO):

The first piece of functionality is an in-memory stack. This portion of the application should have two endpoints:

- an endpoint to add an item to the stack
- an endpoint to return the top item of the stack
  --- requesting an item from the stack should also remove that item from the top of the stack

#### In-memory key-value store with TTL:

The second piece of functionality is an in-memory key-value store that supports TTLs on the keys.
Your interface should support:

- adding a key to the store
  --- setting a TTL should be optional to the client when adding the key
- getting the value for a key
  --- this should respect the TTL for the key if provided
- deleting the value stored for a given key
