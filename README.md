# cNoteBook

cNoteBook is a cloud-based note-taking application built using React for the frontend, Express for the backend, MongoDB as the database, and Node.js as the runtime environment. It allows users to create, update, and manage personal notes on the cloud.

## Features

- Create, update, and delete personal notes.
- Responsive design for mobile and desktop views.
- Secure user authentication and authorization.
- Cloud-based storage for user data.
- Real-time updates with an intuitive user interface.

## Technologies Used

- **Frontend**: React, Bootstrap CSS, React Router
- **Backend**: Express.js
- **Database**: MongoDB
- **Runtime**: Node.js
- **State Management**: React Context API (`NoteState`)
- **Version Control**: Git and GitHub

## Components

- **Navbar**: Responsive navigation bar optimized for both desktop and mobile modes.
- **Home**: Main page for displaying and managing notes.
- **About**: Information about the application.
- **Alert**: Displays notifications and alerts using Bootstrap classes.

## Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/8prashant/cnotebook.git
    ```

2. Navigate to the project directory:
    ```bash
    cd cNoteBook
    ```

3. Install dependencies for both frontend and backend:
    ```bash
    npm install
    cd client
    npm install
    ```

4. Set up environment variables:
    - Create a `.env` file in the root of the project.
    - Add the following variables:
        ```bash
        MONGO_URI=your-mongodb-connection-string
        JWT_SECRET=your-jwt-secret
        PORT=5000
        ```

5. Start the application:
    - Run the backend server:
        ```bash
        npm run server
        ```
    - Run the frontend React app:
        ```bash
        npm run client
        ```

6. Access the application at `http://localhost:3000`.

## Usage

1. Sign up or log in to the platform.
2. Create a new note by clicking the "Add Note" button.
3. Edit or delete existing notes.
4. Use the mobile-friendly navbar for easy navigation on phones.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
