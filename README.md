# MM-controlServer
This is a basic nodeJS server which forwards events to all connected clients on the socket. It was intended to be used with a the Remote-Control MagicMirror Plugin but can be used in any way.

# Usage
Clone the project and install dependencies.

```bash
git clone https://github.com/totoluto/MM-controlServer.git
cd MM-controlServer
```

## Deploy with Docker

### Build image

If you want to make changes for your use case you can directly adjust the code and build the container while developing. Make your changes and adjust your `docker-compose.yaml`.

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .env:/usr/src/app/.env
```

If you do not want to have an `.env` file you can directly define the variables in the `docker-compose.yaml`.

```yaml
environment:
      - API_TOKEN=YOUR-TOKEN-HERE
      - SOCKET_TOKEN=YOUR-TOKEN-HERE
      - EVENTS=reboot,screenOff,screenOn
      - PORT=3000
```
Afterwards you can build and deploy the container with one command

```bash
docker-compose up --build -d
```

## Deploy manually

If you want to run the code in a node environment you can do so as well. For that you need to install the dependencies locally first. (This of course requires you to have node and npm installed already, duhh)

```bash
npm install
```
Afterwards you can start the server with the server.js file which is located in `./src`.

```bash
node server.js
```

## What now?

Well now you can send POST requests onto the API.

```api
POST http://localhost:3000/event

HEADERS: {
    "Authoritzation": your-api-token
}

BODY: {
    event: "reboot"
}
```

This will forward the api request to all connected socket client.