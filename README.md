# E-Commerce
(https://Nandini0826/E-Commerce)

This repository contains the source code for a full-stack E-Commerce application. The application features a Node.js and Express.js backend with MongoDB, and a React (with Vite and TypeScript) frontend styled with Tailwind CSS.

## Features

*   **User Authentication:** Secure registration, login, and logout functionality for users using JWT.
*   **Admin Authentication:** Separate login for administrators to manage the platform.
*   **Product Management:**
    *   Admins can add new products with details, price, discount, and images.
    *   Admins can also update the produucts
    *   Products are displayed on the shop page for users.
*   **Shopping Cart:**
    *   Users can add products to their cart.
    *   Cart items and quantities can be updated.
    *   View total bill for items in the cart.
*   **Wishlist:** Users can add products to a personal wishlist.
*   **Order Management (Basic):** Includes a page for viewing orders (further implementation can be added).
*   **Frontend:**
    *   Interactive UI built with React and TypeScript.
    *   Client-side routing using React Router.
    *   Styling with Tailwind CSS.
    *   Efficient development and build process with Vite.

## Technologies Used

**Backend:**

*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for Node.js.
*   **MongoDB:** NoSQL database for storing user, product, and owner data.
*   **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **JSON Web Tokens (JWT):** For securing API endpoints and managing user sessions.
*   **bcrypt:** Library for hashing passwords.
*   **Multer:** Middleware for handling `multipart/form-data`, used for file uploads (product images).
*   **connect-flash:** For displaying flash messages.
*   **express-session:** For session management.
*   **cookie-parser:** Middleware for parsing cookies.
*   **cors:** For enabling Cross-Origin Resource Sharing.
*   **dotenv:** For managing environment variables.
*   **config:** For managing configuration files (e.g., `development.json`).

**Frontend:**

*   **React:** JavaScript library for building user interfaces.
*   **TypeScript:** Superset of JavaScript that adds static typing.
*   **Vite:** Next-generation frontend tooling for fast development and optimized builds.
*   **Tailwind CSS:** A utility-first CSS framework.
*   **React Router DOM:** For client-side routing.
*   **Axios:** Promise-based HTTP client for making API requests.
*   **Headless UI:** Unstyled, fully accessible UI components.
*   **Framer Motion:** For animations.
*   **jwt-decode:** For decoding JWTs on the client-side.

## Directory Structure

```
nandini0826-e-commerce/
├── app.js                   # Main Express application file
├── package.json             # Backend dependencies and scripts
├── config/                  # Configuration files (database, multer, etc.)
│   ├── development.json     # Development environment config
│   ├── keys.js              # (Potentially for JWT secret, although .env is also used)
│   ├── mongoose-connection.js # MongoDB connection setup
│   └── multer-config.js     # Multer storage configuration
├── controllers/             # Request handlers for routes
│   └── authcontroller.js    # Authentication logic for users
├── frontend/                # React frontend application
│   ├── public/              # Static assets for frontend
│   ├── src/                 # Frontend source code
│   │   ├── Pages/           # React page components
│   │   ├── components/      # Reusable React components
│   │   ├── App.tsx          # Main frontend App component
│   │   └── main.tsx         # Frontend entry point
│   ├── package.json         # Frontend dependencies and scripts
│   └── vite.config.ts       # Vite configuration
├── middlewares/             # Custom Express middlewares
│   └── isLoggedin.js        # Middleware to check if user is authenticated
├── models/                  # Mongoose schemas and models
│   ├── owners-model.js      # Schema for admin/owner
│   ├── product-model.js     # Schema for products
│   └── user-model.js        # Schema for users
├── public/                  # Static assets for backend (if any, currently .gitkeep)
├── routes/                  # Express route definitions
│   ├── index.js             # General/Home routes
│   ├── ownersRouter.js      # Routes for admin/owner operations
│   ├── productRouter.js     # Routes for product operations
│   └── userRouter.js        # Routes for user operations
├── utils/                   # Utility functions
│   └── generatetoken.js     # JWT generation utility
└── views/                   # Server-side templates (if EJS was fully used, mostly .gitkeep now)
```

## Setup and Installation

### Prerequisites

*   Node.js (v18 or higher recommended for backend, check Vite for frontend)
*   npm (Node Package Manager)
*   MongoDB instance running (locally or remote URI)

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nandini0826/E-Commerce.git
    cd E-Commerce
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory of the backend (i.e., `E-Commerce/`) and add the following variables:
    ```env
    EXPRESS_SESSION_SECRET=your_express_session_secret_here
    JWT_KEY=your_jwt_secret_key_here
    ```
    *   `MONGODB_URI` is configured in `config/development.json` (e.g., `"mongodb://127.0.0.1:27017"`). You can modify this file if your MongoDB instance runs elsewhere or update it to use an environment variable.

4.  **Run the backend server:**
    The backend `package.json` does not have a specific "start" or "dev" script for the main application. You can run it directly using Node:
    ```bash
    node app.js
    ```
    The backend server will start on `http://localhost:3000` (by default).

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

3.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend development server will start, typically on `http://localhost:5173`.

## API Endpoints Overview

(Refer to `routes/` directory for detailed definitions)

*   **User Routes (`/users`)**:
    *   `POST /register`: Register a new user.
    *   `POST /login`: Log in an existing user.
    *   `POST /logoutuser`: Log out a user.
    *   `POST /wishlist`: Add a product to the wishlist (requires authentication).
    *   `POST /cart`: Add a product to the cart (requires authentication).
    *   `GET /getcart`: Get user's cart items (requires authentication).
    *   `GET /getwishlist`: Get user's wishlist items (requires authentication).
    *   `PUT /updatecart`: Update item quantity in the cart (requires authentication).

*   **Admin/Owner Routes (`/admin`)**:
    *   `POST /adminregister`: Register a new admin (if applicable, current setup seems to be via direct DB or seed).
    *   `POST /adminlogin`: Log in an admin.
    *   `POST /logout`: Log out an admin.

*   **Product Routes (`/products`)**:
    *   `POST /create`: Create a new product (typically admin-only, requires image upload).
    *   `GET /shop`: Get all products for display.
