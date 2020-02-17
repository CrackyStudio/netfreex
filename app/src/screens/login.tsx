import React, { useEffect } from 'react';
import 'styles/screens/login.css';
import { useStateValue } from 'hooks/provider';
import { TextInput } from 'evergreen-ui';
import ls from 'services/localstorage';

const Login: React.FC = () => {
    const [{ password }, dispatch] = useStateValue() as Array<any>;

    useEffect(() => {
        const login = () => {
            const localPassword = ls.getState("password");
            if (password === process.env.REACT_APP_USER || localPassword === process.env.REACT_APP_USER) {
                dispatch({ key: 'isLogged', value: true });
            }
        }

        login()
    }, [password, dispatch])

    const setPassword = (e: any) => {
        dispatch({ key: 'password', value: e.target.value });
        ls.setState('password', e.target.value);
    }
    
	return (
        <div className="input-container">
            <TextInput className="input" name="user" type="password" autoFocus={true} value={password} onChange={(e: any) => setPassword(e)}/>
        </div>    
    )
};

export default Login;