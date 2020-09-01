# 4-ratikka-service
Service that gives departure times of tram 4 at Munkkiniemi (heading to Isoo Kirkko) at three different stops.

You can find this as a Docker container in [DockerHub](https://hub.docker.com/r/pimpbot9000/4-tram-service).

## Usage of the container

The container starts the service automatically, exposing port 3000 by default. Unfortunately there's no way to change it unless you re-dockerize the project. 
The port used by the service is defined in the .env file.

Running the container quite simple:
```
docker run -it <host_port>:3000 4-tram-service
```
This starts the service. There are no logs or anything.

There are three resources at the service:
```
api/portti
api/alepa
api/paattari
```
## Example query result:
```
[
  {
    "departureInMinutes": 5,
    "departureInSeconds": 293,
    "description": "Katajanokka via Meilahti",
    "sign": "Katajanokka",
    "route": "4"
  },
  {
    "departureInMinutes": 12,
    "departureInSeconds": 713,
    "description": "Katajanokka via Meilahti",
    "sign": "Katajanokka",
    "route": "4"
  },
  {
    "departureInMinutes": 20,
    "departureInSeconds": 1193,
    "description": "Katajanokka via Meilahti",
    "sign": "Katajanokka",
    "route": "4"
  },
  {
    "departureInMinutes": 27,
    "departureInSeconds": 1613,
    "description": "Katajanokka via Meilahti",
    "sign": "Katajanokka",
    "route": "4"
  },
  {
    "departureInMinutes": 35,
    "departureInSeconds": 2093,
    "description": "Katajanokka via Meilahti",
    "sign": "Katajanokka",
    "route": "4"
  }
]
```
In the future there will be totally awesome Android-app using this service for all the fine people living in munkkiniemi to enjoy! Unfortunately they are all loaded so probably they all own iPhones...
