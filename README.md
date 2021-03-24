# 4-ratikka-service
Node Express service that gives departure times of tram 4 at Munkkiniemi (heading to Isoo Kirkko) at three different stops. Data is real-time, fetched from the HSL api (i.e data is not provided by magic fairies). Mostly made for DevOps with Docker course @University of Helsinki and for fun (and I hate waiting for the tram).

You can find this as a Docker container in [DockerHub](https://hub.docker.com/r/pimpbot9000/4-tram-service).

The container does not work standalone per se, since it's married with Redis cache with expiration of 10 seconds (which does not make any sense because the api returns the time to arrival in seconds so...) but the Redis cache was just for practising.

## CI/CD

There's a continuous delivery by CircelCI. See the ```.circleci/config.yml``` file. (Also required for the afore mentioned Docker course).

## Usage

Simply:
```
docker-compose build
```
and
```
docker-compose up
```
...starts the service with Redis container as cache.

## The api
There are three resources at the service, since there are three tram stops in Munkkiniemi.
```
api/portti
api/alepa
api/paattari
```

### Example query result:
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
## That's "awesome"! Where can I see it in action?!

Glad you asked! Project is currently hosted at [Heroku](https://tram-4-service.herokuapp.com/api/alepa). 

## Superb! What else you got up in your sleeve?

It'd be a damn shame to leave such a great service without demand! I also made a neat Android app that displays the information. [Here](https://github.com/pimpbot9000/tram4app) one can find the the project in Github. Go and bask in awe.

Sure the official HSL provides the same functionality but it's slow and somewhat annoying to use if you're in a hurry. Nelosen spora app offers a lightweight remedy.
