# PumpO - README

...

## Backend

### Technologies Used B

- nodeJS

### Local Deployment

The backend is currently hosted on a local machine. To run the backend, ensure you have the necessary development environment set up. Open the project in your preferred IDE and execute the application.

- Execute `npm run dev`

### Database

The backend interacts with a MySQL database, which contains schemas that store various data

### Main Functionalities

...

### Security

To ensure security, the backend uses a table in the database to store login information. This table helps manage user authentication and permissions effectively.

## Frontend

### Technologies Used F

- ReactJS
- React Router

### User Interface

The frontend offers a responsive and user-friendly design, allowing users to access the app from various devices.
...

### Role-Based Access Control

The app implements role-based access control to restrict specific functionalities based on user roles.
...

### Performance Optimization

To minimize unnecessary server calls, the frontend uses useEffect and useState hooks, ensuring that components call the server only when necessary. Additionally, the app utilizes cookies to store user information, such as ID, password, email, and role.

## Functionalities

...

## Known Limitations

The current version of PumpO has some areas that can be further improved. Additional testing and optimization can enhance the app's overall performance and user experience.

## How to Deploy Locally

1. Set up the necessary development environment.
2. Open the backend and frontend projects using separate editors.
3. To run the backend, execute the application by running `node index.js`.
4. To run the frontend, open the project directory and use `npm run dev`.

## Contribution

To contribute to PumpO, follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your changes.
3. Make your modifications and commit them.
4. Push the changes to your fork.
5. Create a pull request detailing your changes.

## License

This project is licensed under the MIT License(LICENCE).
