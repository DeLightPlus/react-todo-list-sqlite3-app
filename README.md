# React Todo List App

A simple Todo List application built with Vite, React, and SQLite3. This app allows users to create, read, update, and delete their tasks.

## Features

- Add new tasks
- View existing tasks
- Edit tasks
- Delete tasks
- Persist tasks in SQLite3 database

## Technologies Used

- [Vite](https://vitejs.dev/) - A fast build tool and development server
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [SQLite3](https://www.sqlite.org/index.html) - A lightweight database for storing tasks

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DeLightPlus/react-todo-list-sqlite3-app.git
   cd react-todo-list-sqlite3-app
2. Install dependencies:
   ```bash
    npm install    
3. Set up the SQLite3 database:
   ```bash
    npm run setup-db
4. Start the development server:
    ```bash    
    npm run dev
Your app will be running at http://localhost:5173.

#### Usage
  * Open the application in your browser.
  * Use the input field to add new tasks.
  * Click on tasks to edit them or use the delete button to remove tasks

# React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
