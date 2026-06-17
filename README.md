# Trojan Leaderboard

A Node.js and Express leaderboard created for the Trojan cyber-awareness game.

## Features

- Receives player scores from the Unity game
- Stores player name, coins, health lost and retries
- Ranks players by performance
- Displays results through a web interface
- Uses a REST API for communication between Unity and the server

## Technologies Used

- Node.js
- Express
- HTML
- CSS
- JavaScript
- JSON

## How It Works

The Unity game sends score data to the server using an HTTP POST request.

The server stores the results and returns leaderboard data to the web page.

## Running the Project

Install the required packages:

```bash
npm install