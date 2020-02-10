import React, { useEffect } from 'react';
import 'styles/player.css';
import 'styles/series.css';
import fetch from 'services/fetch';
import { useStateValue } from 'hooks/provider';
import { Button } from 'evergreen-ui';
import ReactPlayer from 'react-player';

const Series: React.FC = () => {
    const [{ series, showPlayer, playerSource, serie, seasons, season, episodes }, dispatch] = useStateValue() as Array<any>;
    const serverIp = process.env.REACT_APP_SERVER_IP;

    useEffect(() => {
        const getSeries = async () => {
            await fetch.getSeries().then((response: { Series: any }) => {
                dispatch({ key: 'series', value: response.Series });
            });
        }

        getSeries();
    }, [dispatch])   
      
    const getSeasons = async (serie: string) => {
        dispatch({ key: 'serie', value: serie });
        await fetch.getSeasons(serie).then((response: { Seasons: any }) => {
            dispatch({ key: 'seasons', value: response.Seasons });
        })
    }

    const getEpisodes = async (serie: string, season: string) => {
        dispatch({ key: 'season', value: season });
        await fetch.getEpisodes(serie, season).then((response: { Episodes: any }) => {
            dispatch({ key: 'episodes', value: response.Episodes });
        })
    }

    const setVideoType = (videoType: string) => {
        dispatch({ key: 'videoType', value: videoType });
    }

    const ListSeries = () => {      
        if (series !== undefined) {
            let arr: JSX.Element[] = [];
            series.forEach((serie: any, idx: number) => {
                arr.push(
                    <div className="container" key={idx} >
                        <div className="content" onClick={() => getSeasons(serie)}>     
                            <div className="content-overlay"></div>
                            <img className="content-image" src={`http://${serverIp}:4242/series/get/images/${serie}`} alt="serie-img"/>
                            <div className="content-details fadeIn-top">
                                <h1>{serie}</h1>
                            </div>
                        </div>
                    </div>
                )
            })
            return arr; 
        }        
    }

    const ListSeasons = () => {      
        if (seasons) {
            let arr: JSX.Element[] = [];
            seasons.forEach((season: any, idx: number) => {
                arr.push(
                    <div className="container-serie" key={idx} >
                        <div className="content-season" onClick={() => getEpisodes(serie, season)}>
                            <div className="content-season">
                                <p>{season}</p>
                            </div>
                        </div>
                    </div>
                )
            })
            return arr; 
        }        
    }

    const ListEpisodes = () => {
        if (episodes) {
            let arr: JSX.Element[] = [];
            episodes.forEach((episode: any, idx: number) => {
                arr.push(
                    <div className="container-serie" key={idx} >
                        <div className="content-serie" onClick={() => enablePlayer(true, serie, season, episode)}>
                            <div className="content-episode">
                                <p>{episode}</p>
                            </div>
                        </div>
                    </div>
                )
            })
            return arr; 
        }  
    }

    const unselectSerie = () => {
        dispatch({ key: 'episodes', value: "" });
        dispatch({ key: 'seasons', value: "" });
        dispatch({ key: 'serie', value: "" });
    }

    const enablePlayer = (show: boolean, serie: string = "", season: string = "", episode: string ="") => {
        dispatch({ key: 'playerSource', value: `http://${serverIp}:4242/series/${serie}/${season}/${episode}/play` });
        dispatch({ key: 'showPlayer', value: show });
    }
    
	return (
        <>
            {!showPlayer && !seasons && (
                <>
                    <div className="back-container">
                        <Button appearance="primary" marginRight={12} iconBefore="arrow-left" className="back-button" onClick={() => setVideoType("")}>Retour</Button>
                    </div>
                    <div className="list-container">
                        {ListSeries()}
                    </div>
                </>
            )}
            {!showPlayer && seasons && (
                <>
                    <div className="back-container">
                        <Button appearance="primary" marginRight={12} iconBefore="arrow-left" className="back-button" onClick={() => unselectSerie()}>Retour</Button>
                    </div>
                    <div className="list-container">
                        <img className="serie-image" src={`http://${serverIp}:4242/series/get/images/${serie}`} alt="serie-img"/>
                        <div className="list">
                            {ListSeasons()}
                        </div>
                        <div className="list">
                            {ListEpisodes()}
                        </div>
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

export default Series;