

***

# Weather Task Manager

## Project Overview

This project is a full-stack weather task manager application with a React frontend and a MERN stack backend, both written in TypeScript.

The backend integrates with the OpenWeatherMap API to fetch real-time weather data for any city. Users can check the current weather and create weather-related tasks, including saving queries and managing them.

## Tech Stack

### Frontend (FE)

- React with TypeScript
- Tailwind CSS for styling

### Backend (BE)

- Node.js with Express (MERN stack)
- MongoDB for database
- TypeScript

## Features

### Weather Data API

- Fetch current weather data by city name.
- Returns temperature, humidity, and weather conditions.
- Server-side in-memory caching to reduce API calls.

### Task Management API (CRUD)

- **Create:** Add new weather tasks with title (e.g., "Check weather for London"), description (e.g., weather details), and optional category (travel, daily).
- **Read:** Retrieve all tasks for the authenticated user. Supports filtering by status (checked/pending) and category.
- **Read Single Task:** Get task details by ID.
- **Update:** Modify task details or update status by ID.
- **Delete:** Remove a task by ID.

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance running or accessible remotely

### Installation

From the root directory, navigate to both frontend and backend folders and install dependencies:

```bash
cd FE
npm install

cd ../BE
npm install
```

### Running the Project

Start both the frontend and backend servers in development mode:

```bash
# In FE folder
npm run dev

# In BE folder
npm run dev
```

The frontend will connect to the backend APIs and external weather API to provide live weather and task management user experience.

## License

This project is licensed under the MIT License.

***

