import React from 'react';
import 'styles/components/player.css';
import 'styles/screens/catalog.css';
import Films from "screens/films";
import Series from 'screens/series';
import { useStateValue } from 'hooks/provider';
import { Button } from 'evergreen-ui';

const Catalog: React.FC = () => {
    const [{ videoType }, dispatch] = useStateValue() as Array<any>;

    const setVideoType = (videoType: string) => {
        dispatch({ key: 'videoType', value: videoType });
    }

	return (
        <> 
            {!videoType &&  (
                <div className="container">
                    <Button appearance="primary" intent="danger" margin={6} onClick={() => setVideoType("Films")}>Films</Button>
                    <Button appearance="primary" intent="danger" margin={6} onClick={() => setVideoType("Series")}>Series</Button>
                </div>
            )}
            {videoType === "Films" && (
                <Films/>
            )}
            {videoType === "Series" && (
                <Series/>
            )}
        </>
    )
};

export default Catalog;