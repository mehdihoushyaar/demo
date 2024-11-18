# Online Movies Demo

## Description
This project is a demo of an online movies web application built with React, TypeScript, and modern libraries to showcase an architecture for type-safe API handling, routing, reusable components. It includes a custom UI kit, custom hooks, and testing across core functionalities.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Components](#components)
- [Custom Hooks](#custom-hooks)
- [API Handling](#api-handling)
- [Styling](#styling)
- [Configuration](#configuration)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used
- **React** - Front-end framework for building the user interface.
- **TypeScript** - Ensures type safety and predictability.
- **Vite** - Fast bundler for development and optimized builds.
- **@tanstack/react-query** - Handles data fetching, caching, and synchronization.
- **@tanstack/react-router** - Manages routes with type safety and flexibility.
- **Axios** - Configured with a custom API handling class for all HTTP requests.
- **Tailwind CSS** - Configured for responsive, utility-first styling.
- **React Testing Library** & **Vitest** - For testing components and hooks.

## Installation
To set up the project locally:

```bash
# Clone the repository
git clone https://github.com/mehdihoushyaar/demo.git

# Navigate to the project directory
cd demo

# Install dependencies
yarn install


Usage
To start the development server:
yarn dev

Features
    - Data Management: Uses @tanstack/react-query integrated with Axios for efficient API data handling and caching.
    - Routing: Configured with @tanstack/react-router for modular and type-safe routing.
    - Reusable Components: Includes custom components (e.g., dropdown) for design consistency.
    - Custom Hooks: Tailored hooks improve code reusability and simplify UI interactions.
    - Styling: Tailwind CSS ensures responsive and consistent design.
    - Testing: Utilizes React Testing Library and Vitest to verify key app functionalities.

Components
This project includes reusable components designed to maintain a consistent design system:

Dropdown Component
A flexible dropdown component with:
    - Dynamic Options: Adapts based on input props.
    - State Management: Supports both controlled and uncontrolled states.
    - Accessibility: Provides keyboard and screen reader support.

UI Kit
Includes a set of reusable UI components for a unified look and feel across the application.

Custom Hooks
Custom hooks optimize component logic and interactions in the app:

useClickOutside
    - Detects clicks outside a specified component, commonly used for closing dropdowns when clicking outside.
    - This hook improves user experience with intuitive dropdown interactions.

useMovies
A query hook built with @tanstack/react-query for:
    - Fetching Movie Data: Simplifies the process of retrieving movie data from the API.
    - Error Handling: Manages API errors and supports retries to ensure data reliability.

API Handling
A custom API handling class built with Axios manages all HTTP requests:
    - Axios Instance: Configured to handle authentication, error handling, and base URL settings.
    - Centralized API Management: Keeps API logic separate from UI logic, making it easier to maintain and modify.

Styling
Tailwind CSS is configured as the primary styling solution for the project:
    - Utility-First Styling: Enables quick and efficient layout adjustments.
    - Responsive Design: Provides mobile-first design support for various screen sizes.
    - Custom Tailwind Config: Configured to match the app’s design needs.

Vite Configuration
The Vite bundler is set up for fast development and production builds, with support for TypeScript, React, and Tailwind CSS integration.

Testing
Testing is implemented with React Testing Library and Vitest to ensure reliability:
    - Dropdown Component: Tests the open/close functionality and interactions.
    - useClickOutside Hook: Ensures the hook functions as expected across various components.
    - useMovies Query Hook: Verifies proper API data fetching, caching, and error handling.

License
This project is licensed under the MIT License.
This version includes clear sections for each key component, custom hooks, and API handling.


