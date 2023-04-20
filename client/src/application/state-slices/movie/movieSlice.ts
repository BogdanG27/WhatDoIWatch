import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Movie, MovieState } from "./movieSlice.types";

const initialState: MovieState = {
  movieToUpdate: {
    id: "",
    name: "",
    description: "",
    releaseDate: new Date(),
    language: "",
    genre: "",
    imageUrl: "",
    rating: 0,
    numberOfRatings: 0,
    duration: ""
  }
}

export const movieSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {
    setMovieToUpdate: (state, action: PayloadAction<Movie>) => {
      state.movieToUpdate = action.payload
    },
  }
});

export const {
  setMovieToUpdate,
} = movieSlice.actions;

export const movieReducer = movieSlice.reducer; // Export the reducer.
