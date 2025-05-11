# Movie App

View: (https://splendid-axolotl-4cabde.netlify.app/)

A modern React application for browsing and discovering movies using The Movie Database (TMDB) API. This project features a responsive design with both light and dark themes, advanced filtering capabilities, and user-friendly navigation.

## Features

### Core Functionality
- **Browse Popular Movies**: View trending and popular movies from TMDB
- **Search Movies**: Find specific movies by title or keywords
- **Movie Details**: View comprehensive information about each movie
- **Favorites System**: Save and manage your favorite movies
- **Theme Toggle**: Switch between light and dark themes

### Advanced Features
- **Filtering System**: Filter movies by:
  - Genre (Action, Comedy, Drama, etc.)
  - Release Year (last 20 years)
  - Rating (5+ to 9+ stars)
- **Infinite Scrolling**: Seamlessly load more content as you scroll down
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Persistent Storage**: Favorites and preferences are saved in local storage

## Technologies Used

- **React**: Frontend library for building user interfaces (v18.2.0)
- **React Router**: For navigation and routing (v6.22.0)
- **React Bootstrap**: UI component library
- **Context API**: For state management across components
- **TMDB API**: For fetching movie data
- **CSS**: Custom styling with responsive design
- **Local Storage**: For persisting user preferences

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie-app.git
   cd movie-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   GENERATE_SOURCEMAP=false
   SKIP_PREFLIGHT_CHECK=true
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## API Usage

This project uses The Movie Database (TMDB) API to fetch movie data. The following endpoints are used:

- `/movie/popular` - Get a list of popular movies
- `/search/movie` - Search for movies by title
- `/movie/{movie_id}` - Get detailed information about a specific movie

The API key is included in the project for demonstration purposes. In a production environment, you should use environment variables to store sensitive information.

## Deployment

The application is configured for easy deployment to Netlify. A `netlify.toml` file is included with the necessary configuration for handling SPA routing.

```
/src
  /components       # Reusable UI components
  /context         # Context providers for state management
  /pages           # Main page components
  App.js           # Main application component
  App.css          # Global styles
  index.js         # Entry point
```

## Future Enhancements

- User authentication system
- User ratings and reviews
- Personalized movie recommendations
- Movie watchlist functionality
- Advanced search filters
- Movie trailers and video content

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [Create React App](https://github.com/facebook/create-react-app) for the project setup
- [React Router](https://reactrouter.com/) for navigation
- [React Bootstrap](https://react-bootstrap.github.io/) for UI components
