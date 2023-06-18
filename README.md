# Node.js Redis App

This is a simple Node.js Redis application built using WSL on Windows. The application utilizes the Redis database to
cache and retrieve photos from the [JSONPlaceholder](https://jsonplaceholder.typicode.com) API based on album IDs.

## Prerequisites

Before running the application, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org) (version 12 or higher)
- [WSL](https://www.microsoft.com/store/productId/9PN20MSR04DW)(Easlily installed from the Microsoft Store)

## Getting Started

### Redis installation steps

1. Search for Ubuntu in start menu and click on it to open the Ubuntu terminal.
2. During the first launch, you will be prompted to create a new user account (username and password), which you'll need
   to do to proceed.
3. First update the packages list by running the following command:

```bash
sudo apt-get update
```

4. Install the Redis server package by running the following command:

```bash
sudo apt-get install redis
```

5. Once the installation is complete, start the Redis server by running the following command:

```bash
redis-server
```

6. To check if the Redis server is running, open a new Ubuntu terminal and run the following command:

```bash
redis-cli ping
```

7. If the server is running, you should see the following output:

```bash
PONG
```

8. You can execute few Redis commands after running the following command:

```bash
redis-cli
```

9. Then you can run below frequently used Redis commands:

- **PING**: Tests if the Redis server is running.

```bash
PING
```

- **SET**: Sets the value of a key.

```bash
SET key value
```

- **GET**: Retrieves the value of a key.

```bash
GET key
```

- **SETEX**: Sets the value of a key with an expiration time (in seconds).

```bash
SETEX key seconds value
```

- **DEL**: Deletes one or more keys.

```bash
DEL key [key ...]
```

- **FLUSHALL**: Deletes all keys from all databases.

```bash
FLUSHALL
```

Please refer to the [Redis Documentation](https://redis.io/documentation) for more information on Redis and its
commands.

## To run the application:

1. Clone the repository or download the source code.

2. Install the required dependencies by running the following command in your terminal:

```bash
npm install
```

3. Start the Redis server. :

```bash
redis-server
```

4. Start the Node.js application by running the following command:

```bash
npm run dev
```

5. The server should now be running on `http://localhost:3000`. You can access the application through your web browser
   or make API requests using tools like [Postman](https://www.postman.com)
   or [Insomnia](https://insomnia.rest/download).

## API Endpoints

The application exposes the following API endpoints:

- **GET /photos**: Retrieves photos based on the `albumId` query parameter. This endpoint caches the photos using Redis
  to improve performance. If the photos are already cached, they are returned from the cache; otherwise, they are
  fetched from the JSONPlaceholder API and then stored in the cache.

- **GET /photos/:id**: Retrieves a single photo by its `id` from the JSONPlaceholder API.

## Notes

- This application uses the `axios` library to make HTTP requests to the JSONPlaceholder API.
- The Redis client library used is `redis` (v4.x).
- The default expiration time for cached photos is set to 3600 seconds (1 hour). You can modify this value by changing
  the `DEFAULT_EXPIRATION` constant in the `server.js` file.

Refer below tutorial for more details:
https://youtu.be/jgpVdJB2sKQ

Feel free to modify and extend this application according to your needs. Happy coding!
