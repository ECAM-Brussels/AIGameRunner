# AIGameRunner

## Installation

Clone the repository on your computer

## Add Games

Add a script in the `/public/games` directory

## Create an AI

An AI is a web server similar to the ones you can find in the `/ai` directory

## Start the Front End

The `server.py` file is a small server that serve the frontend.

It need python 3.X and `cherrypy`. You can start it with:

```
python server.py game
```

Where `game` must be replaced by one of the games defined in `/public/games`

## Subscribe

Send a TCP message to the 3001 port with a JSON content like:

```json
{
	"matricules": ["11111", "22222"],
	"port": 1234,
	"name": "Terminator"
}
```

