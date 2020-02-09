import React from 'react';
import 'styles/player.css';
import 'styles/catalog.css';
import Films from "components/films";
import Series from 'components/series';
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
                    <Button appearance="primary" marginRight={12} onClick={() => setVideoType("Films")}>Films</Button>
                    <Button appearance="primary" marginRight={12} onClick={() => setVideoType("Series")}>Series</Button>
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