import { useState, useEffect } from "react";
import API from '../API';
import { isPersistedState } from "../helpers";
import { Cast, Crew, MovieInfo } from "../Movies.model";

export type MovieState  = MovieInfo & {actors: Cast[], directors: Crew[]}

export const useMovieFetch = (movieId: string) => {
    const [state, setState] = useState<MovieState>({} as MovieState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true)
                setError(false)

                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId)
                //get directors only
                const directors = credits.crew.filter(member => member.job === 'Director');

                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                })

                setLoading(false)
            } catch(error) {
                setError(true)
                setLoading(false)
            }
        };
        const sessionState = isPersistedState(movieId.toString());
        if(sessionState) {
            setState(sessionState);
            setLoading(false);
            return;
        }
        fetchMovie();
    }, [movieId]);

    useEffect(() => {
       sessionStorage.setItem(movieId.toString(), JSON.stringify(state));
    }, [movieId, state]);
    return {state, loading, error};
}