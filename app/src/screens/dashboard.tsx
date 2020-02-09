import React from 'react';
import 'styles/dashboard.css';
import { useStateValue } from 'hooks/provider';
import Logo from  "media/netfreex.png";
import Catalog from 'screens/catalog';
import Login from 'screens/login';

const Dashboard: React.FC = () => {
    const [{ isLogged }] = useStateValue() as Array<any>;

	return (
        <div className="main">
            <div className="logo-container">
                <img src={Logo} alt="netfreex-logo" height="50px" className="logo"/>
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