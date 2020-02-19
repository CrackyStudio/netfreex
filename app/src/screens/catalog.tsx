import React from 'react';
import Films from "screens/films";
import Series from 'screens/series';
import mLogo from  "media/popcorn.gif";
import { useStateValue } from 'hooks/provider';
import 'styles/screens/catalog.css';

const Catalog: React.FC = () => {
    const [{ category }] = useStateValue() as Array<any>;

	return (
        <> 
            {category === "Films" && (
                <Films/>
            )}
            {category === "Series" && (
                <Series/>
            )}
            {category === "" && (
                <div className="popcorn-container">
                    <img className="popcorn" src={mLogo} alt="popcorn"/>
                    <p className="what-text">Alors, on fait quoi ?</p>
                </div>
            )}
        </>
    )
};

export default Catalog;