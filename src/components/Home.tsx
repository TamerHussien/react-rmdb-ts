import React from "react";

// config
import { BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from './Thumb'
import Spinner from "./Spinner";
import SearchBar from "./SearchBar"
import ShowMoreButton from "./ShowMoreButton"
// Hook
import { useHomeFetch } from "../hooks/useHomeFetch";
// Image

import NoImage from '../images/no_image.jpg'

const Home: React.FC = () => {
    const {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore} = useHomeFetch();
    const results = state?.results;
    const hero = results[0];

    if (error) return <div>Something went wrong ....</div>

    return (
        <>
        {hero &&! searchTerm ?
            <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${hero.backdrop_path}`}
                title={hero.original_title}
                text={hero.overview}
            /> 
            : null
        }
        <SearchBar setSearchTerm={setSearchTerm}/>
        <Grid header={searchTerm? 'Search Results' :'Popular Movies'}>
            {results.map(movie => (
                <Thumb key={movie.id} 
                    clickable 
                    image={ movie.poster_path ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.poster_path}` : NoImage}
                    movieId={movie.id}
                />
            ))}
        </Grid>
        {loading && <Spinner/>}
        {state.page < state.total_pages && !loading && (
            <ShowMoreButton callback={() => setIsLoadingMore(true)} text='Load More'/>
        )}          
        </>
    )
}

export default Home;