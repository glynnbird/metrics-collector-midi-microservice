# Metrics Collector Midi Microservice

This is a microservice that subscribes to a queue or pubsub channel hosted on 

* Redis 
* RabbitMQ
* Apache Kafka 

and writes the data to a Midi device to turn data into music.

This service is designed to be paired with the *Metrics Collector Microservice* which sends web traffic data to a Redis, RabbitMQ or Kafka queue or pubsub channel. Other Microservices can listen to the data arriving on those channels, services such as the *Metrics Collector Storage Microservice* which can store data in Cloudant, MongoDB or ElasticSearch. This microservice turns the arriving data into music by posting notes to a virtual MIDI device.

## Installation

Clone this repository and then run

```
npm install
```

## Usage

Set your environment variables and start up the app e.g.

```
export QUEUE_TYPE=redis_queue
node app.js
```

Run GarageBand on the same machine and create a new virtual instrument and as data arrives on your channel, music will start to play.

## Environment variables

### QUEUE_TYPE

One of 

* redis_queue - A Redis list data structure
* redis_pubsub - A Redis PubSub channel
* rabbit_queue - A RabbitMQ PUSH/WORKER queue
* rabbit_pubsub - A RabbitMQ PUBLISH/SUBSCRIBE channel
* kafka - An Apache Kafka topic
* null - default (does nothing)

### QUEUE_NAME

The name of the queue/channel that is subscribed to. If omitted, it takes the following values for each of the queue types:

1. stdout - n/a
2. redis_queue - mcqueue
3. redis_pubsub - mcpubsub
4. rabbit_queue - mcqueue
5. rabbit_pubsub - mcpubsub
6. kafka - mcqueue

### VCAP_SERVICES

`VCAP_SERVICES` is created for you by the Bluemix Cloud Foundry service. It defines the credentials of the attached services that this app can connect to. 



