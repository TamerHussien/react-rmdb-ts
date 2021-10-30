import React,{ useState, useContext } from "react";
import { useNavigate } from "react-router";
import API from '../API';

//Components
import ShowMoreButton from "./ShowMoreButton";
// styles
import { Wrapper } from "./Login.styles";
// Context
import { Context } from "../context";

const Login: React.FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const [_user, setUser]=useContext<any>(Context);

    const navigate = useNavigate();

    const handelInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        if(name === 'username') {
            setUsername(value);
        }
        if(name === 'password') {
            setPassword(value);
        }
    };

    const handelSubmit = async () => {
        setError(false);
        try {
            const requestToken = await API.getRequestToken()
            const sessionId = await API.authenticate(requestToken, username, password);
            console.log(sessionId);
            setUser({sessionId: sessionId.session_id, username});
            navigate('/')
        }catch(error){
            setError(true)
        }
    };

    return (
        <Wrapper>
            {error && <div className="error">There was an error!</div>}
            <label htmlFor="username">Username:</label>
            <input
                type='text'
                value={username}
                name='username'
                id='username'
                onChange={handelInput}
            />
            <label htmlFor="password">Password:</label>
            <input
                type='password'
                value={password}
                name='password'
                id='password'
                onChange={handelInput}
            />
            <ShowMoreButton text="Login" callback={handelSubmit}/>
        </Wrapper>
    )
}
 
export default Login;