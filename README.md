# Health Hub

Health Hub is a project designed to help patients find appropriate doctors and provide a platform for doctors to offer their services. This README provides an overview of the project, its features, and how to get started.

## Table of Contents

- [Description](#description)
- [How It Works](#how-it-works)
- [Technologies Used](#technologies-used)
- [API Documentation](#api-documentation)
- [Database Design](#database-design)
- [Environment Variables](#environment-variables)

## Description

Health Hub is a platform where patients and doctors can connect. It simplifies the process of finding the right doctor for patients and offers a space for doctors to reach out to potential patients. Users can register and create profiles to access the platform's features.

## How It Works

1. **Registration and Profile Creation**:

   - Both doctors and patients must register as users.
   - After registration, they need to create profiles, which are essential for platform access.

2. **Consultation Requests**:

   - Patients can create consultation requests, specifying their desired doctor's specialization and requirements.
   - These requests are made available to doctors for review.

3. **Doctor Suggestions**:

   - Doctors can view patient consultation requests and provide suggestions based on their expertise and availability.

4. **Hiding Doctors**:
   - Patients have the option to hide certain doctors if they do not wish to receive suggestions from them.

## Technologies Used

The Health Hub project is built using the following technologies:

- Nest.js
- PostgreSQL
- Redis
- TypeORM
- Docker

## API Documentation

To view the list of available APIs and their specifications, follow these steps:

1. Run the server.
2. Open your browser and navigate to [http://localhost:8080/api](http://localhost:8080/api).

The API documentation is automatically generated using Swagger definitions written as comments in the route files.

## Database Design

For a visual representation of the database schema, you can refer to the [database diagram](https://dbdiagram.io/d/651ee04cffbf5169f01d9d58).

## Environment Variables

You can customize the project's environment by modifying the values in the `.env.example` file. Here are some key environment variables:

### Postgres

- `POSTGRES_HOST`: PostgreSQL database host
- `POSTGRES_PORT`: PostgreSQL database port
- `POSTGRES_USER`: PostgreSQL database username
- `POSTGRES_PASSWORD`: PostgreSQL database password
- `POSTGRES_DB`: PostgreSQL database name

### Redis

- `REDIS_PORT`: Redis database port
- `REDIS_HOST`: Redis database host

### Tokens

- `ACCESS_TOKEN_SECRET`: Secret key for access tokens
- `ACCESS_TOKEN_EXPIRATION_TIME`: Access token expiration time in seconds
- `REFRESH_TOKEN_SECRET`: Secret key for refresh tokens
- `REFRESH_TOKEN_EXPIRATION_TIME`: Refresh token expiration time in seconds
- `PASSWORD_RESET_SECRET`: Secret key for password reset
- `PASSWORD_RESET_EXPIRATION_TIME`: Password reset token expiration time in seconds

### Email Account

- `EMAIL`: Email account for notifications
- `EMAIL_PASSWORD`: Password for the email account
