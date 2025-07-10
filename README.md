WORK IN PROGRESS

Start up db (MariaDB), file storage (minIO) and Queue (RabbitMQ)

```shell
docker-compose up -d --build
```

Rebuildand rerun just the worker

```shell
docker-compose up -d --build worker
```

# Technologies

- Backend: TS NodeJS / Express
- Frontend: Angular
- Worker: TS NodeJS
- Database: MariaDB
- File Storage: minIO
- Queue: RabbitMQ
- Deployment: Docker

# Concept

![Concept Image](./.img/concept.png)
