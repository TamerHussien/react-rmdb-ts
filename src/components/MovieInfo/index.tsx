import React, {useContext} from "react";
// Components
import Thumb from '../Thumb';
import Rate from "../Rate";

// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";

//Image
import NoImage from '../../images/no_image.jpg';

//styles
import { Wrapper, Content, Text } from "./MovieInfo.styles";
import { MovieState } from "../../hooks/useMovieFetch";
// Context
import { Context } from "../../context";
import API from "../../API";

type Props = {
    movie: MovieState,
}

const MovieInfo:React.FC<Props> = ({movie}) => {
    const [user] = useContext<any>(Context);

    const handelRating = async (value: number) => {
        const rate  = await API.rateMovie(user.sessionId, movie.id.toString(), value.toString());
        console.log(rate);
    }
    return (
        <Wrapper backdrop={movie.backdrop_path}>
            <Content>
                <Thumb 
                    image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage}
                    clickable = {false}
                />
                <Text>
                    <h1>{movie.title}</h1>
                    <h3>PLOT</h3>
                    <p>{movie.overview}</p>

                    <div className="rating-directors">
                        <div>
                            <h3>RATING</h3>
                            <div className="score">{movie.vote_average}</div>
                        </div>
                        <div className="director">
                            <h3>DIRECTOR{movie.directors.length > 1 ? 'S': ''}</h3>
                            {
                                movie.directors.map(director => (
                                    <p key="director.credit_id">{director.name}</p>
                                ))
                            }
                        </div>  
                    </div>
                    {user? 
                    (<div>
                        <p>Rate Movie</p>
                        <Rate callback={handelRating}/>
                    </div>) : (
                        <div>
                            <p>You can only rate movies if you are logged in with your movie database account</p>
                            <p>if you don't have one you can create one <span><a href="https://www.themoviedb.org/">here</a></span> </p>
                        </div>
                    )
                    }
                </Text>
            </Content>

        </Wrapper>
    )
}

export default MovieInfo;
