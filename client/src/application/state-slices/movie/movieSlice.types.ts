export interface Movie {
    id: string,
    name: string;
    description: string;
    releaseDate: Date;
    language: string;
    genre: string;
    imageUrl: string;
    rating: number;
    numberOfRatings: number;
    duration: string;
}

export type MovieState = {
    movieToUpdate: Movie
};
