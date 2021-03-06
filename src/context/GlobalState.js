import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppReducer from './AppReducer';

// initial state
const initialState = {
  watchlist: localStorage.getItem('watchlist')
    ? JSON.parse(localStorage.getItem('watchlist'))
    : [],
  watched: localStorage.getItem('watched')
    ? JSON.parse(localStorage.getItem('watched'))
    : [],
  homepage: localStorage.getItem('homepage')
    ? JSON.parse(localStorage.getItem('watchlist'))
    : [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = props => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    localStorage.setItem('homepage', JSON.stringify(state.homepage));
    localStorage.setItem('watched', JSON.stringify(state.watched));
  }, [state]);

  // actions
  const addMovieToHomepage = movie => {
    dispatch({ type: 'ADD_MOVIE_TO_HOMEPAGE', payload: movie });
  };
  const addMovieToWatchlist = movie => {
    dispatch({ type: 'ADD_MOVIE_TO_WATCHLIST', payload: movie });
  };

  const removeMovieFromWatchlist = id => {
    dispatch({ type: 'REMOVE_MOVIE_FROM_WATCHLIST', payload: id });
  };

  const addMovieToWatched = movie => {
    dispatch({ type: 'ADD_MOVIE_TO_WATCHED', payload: movie });
  };

  const moveToWatchlist = movie => {
    dispatch({ type: 'MOVE_TO_WATCHLIST', payload: movie });
  };

  const removeFromWatched = id => {
    dispatch({ type: 'REMOVE_FROM_WATCHED', payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        homepage: state.homepage,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        addMovieToWatched,
        moveToWatchlist,
        removeFromWatched,
        addMovieToHomepage,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
