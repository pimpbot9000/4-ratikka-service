# 4-ratikka-service
Node Express service that gives departure times of tram 4 at Munkkiniemi (heading to Isoo Kirkko) at three different stops. Data is real-time, fetched from the HSL api (i.e data is not provided by magic fairies).

You can find this as a Docker container in [DockerHub](https://hub.docker.com/r/pimpbot9000/4-tram-service).

## Usage of the container

The container starts the service automatically, exposing port 3000 by default. Unfortunately there's no way to change it unless you re-dockerize the project. 
The port used by the service is defined in the .env file.

Running the container quite simple:
```
docker run -it <host_port>:3000 4-tram-service
```
This starts the service. There are no logs or anything.

There are three resources at the service, since there are three tram stops in Munkkiniemi.
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
    "description": "Töölön halli via Meilahti",
    "sign": "Töölön halli",
    "route": "4H"
  }
]
```
## That's awesome! Where can I see it in action?!

Glad you asked! Project is currently hosted at [Heroku](https://tram-4-service.herokuapp.com/api/alepa). Patience my young padawan. It's asleep but she'll wake up.

## Superb! What else you got up in your sleeve?
In the future there will be totally awesome Android-app using this service for all the fine people living in munkkiniemi to enjoy! Unfortunately they are all loaded so probably they all own iPhones...

Sure, the official HSL app provides the same functionality, but it's slow and annoying to use. I'm a very busy guy.
