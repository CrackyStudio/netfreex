import React, { useEffect } from 'react';
import 'styles/player.css';
import 'styles/films.css';
import fetch from 'services/fetch';
import { useStateValue } from 'hooks/provider';
import ReactPlayer from 'react-player';
import { Button } from 'evergreen-ui';

const Films: React.FC = () => {
    const [{ films, showPlayer, playerSource }, dispatch] = useStateValue() as Array<any>;
    const serverIp = process.env.REACT_APP_SERVER_IP;

    useEffect(() => {
        const getFilms = async () => {
            await fetch.getFilms().then((response: { Films: any }) => {
                dispatch({ key: 'films', value: response.Films });
            });
        }

        getFilms();
    }, [dispatch])    

    const setVideoType = (videoType: string) => {
        dispatch({ key: 'videoType', value: videoType });
    }
    
    const ListFilms = () => {      
        if (films !== undefined) {
            let arr: JSX.Element[] = [];
            films.forEach((film: any, idx: number) => {
                arr.push(
                    <div className="container" key={idx} >
                        <div className="content" onClick={() => enablePlayer(true, film)}>     
                            <div className="content-overlay"></div>
                            <img className="content-image" src={`http://${serverIp}:4242/films/images/${film}`} alt="film-img"/>
                            <div className="content-details fadeIn-top">
                                <h1>{film}</h1>
                            </div>
                        </div>
                    </div>
                )
            })
            return arr; 
        }        
    }

    const enablePlayer = (show: boolean, film: string = "") => {
        dispatch({ key: 'playerSource', value: `http://${serverIp}:4242/films/${film}` });
        dispatch({ key: 'showPlayer', value: show });
    }

	return (
        <>
            {!showPlayer && (
                <>
                    <div className="back-container">
                        <Button appearance="primary" marginRight={12} iconBefore="arrow-left" onClick={() => setVideoType("")}>Retour</Button>
                    </div>
                    <div className="list-container">
                        {ListFilms()}
                    </div>
                </>
            )}
            {showPlayer && (
                <div className="player-container">
                    <ReactPlayer playing={true} controls={true} url={playerSource} pip={true} width='50%' height='50%' config={{
                        file: {
                            attributes: { autoPictureInPicture: true }
                        },
                    }}/>
                    <Button appearance="primary" marginRight={12} iconBefore="arrow-left" className="back-button" onClick={() => enablePlayer(false)}>Revenir au catalogue</Button>
                </div>
            )}
        </>
    )
};

export default Films;