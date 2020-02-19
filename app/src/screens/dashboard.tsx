import React from 'react';
import Logo from  "media/netfreex.png";
import Catalog from 'screens/catalog';
import Login from 'screens/login';
import { useStateValue } from 'hooks/provider';
import 'styles/screens/dashboard.css';

const Dashboard: React.FC = () => {
    const [{ isLogged }, dispatch] = useStateValue() as Array<any>;

    const goHome = () => {
        dispatch({ key: 'showPlayer', value: false });
        dispatch({ key: 'videoType', value: "" });
        dispatch({ key: 'episodes', value: [] });
        dispatch({ key: 'seasons', value: "" });
        dispatch({ key: 'serie', value: "" });
        dispatch({ key: 'film', value: "" });
    }

	return (
        <div className="main">
            <div className="header">
                <img className="logo" src={Logo} alt="netfreex-logo" onClick={() => goHome()}/>
            </div>
            {!isLogged ? <Login/> : <Catalog/>}
        </div>
	);
};

export default Dashboard;