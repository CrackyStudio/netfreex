import React from 'react';
import 'styles/screens/dashboard.css';
import { useStateValue } from 'hooks/provider';
import Logo from  "media/netfreex.png";
import Catalog from 'screens/catalog';
import Login from 'screens/login';

const Dashboard: React.FC = () => {
    const [{ isLogged }, dispatch] = useStateValue() as Array<any>;

    const goHome = () => {
        dispatch({ key: 'showPlayer', value: false });
        dispatch({ key: 'videoType', value: "" });
        dispatch({ key: 'episodes', value: [] });
        dispatch({ key: 'seasons', value: "" });
        dispatch({ key: 'serie', value: "" });
    }

	return (
        <div className="main">
            <div className="logo-container">
                <img src={Logo} alt="netfreex-logo" height="50px" className="logo" onClick={() => goHome()}/>
            </div>
            {!isLogged && (
                <Login/>
            )}
            {isLogged && (
                <Catalog/>
            )}
        </div>
	);
};

export default Dashboard;