import 'styles/components/backButton.css'
import React from 'react';
import ReactPlayer from 'react-player';
import BackButton from 'components/BackButton';
import { Button } from 'evergreen-ui';
import 'styles/components/videoPlayer.css';

const VideoPlayer = ({source, backButton = true}: {source: string, backButton?: boolean}) => {

    const downloadFile = () => {
        window.open(source);
    }

	return (
        <div className="player-container">
            <div className="player">
                <ReactPlayer playing={true} controls={true} url={source} pip={true} width="640px" height='440px' config={{
                        file: {
                            attributes: { autoPictureInPicture: true }
                        },
                    }}/>
            </div>
            <div className="player-buttons">
                <div className="goback-container">
                    {backButton && (
                        <BackButton screen={"player"} text="Revenir au catalogue"/>
                    )}
                </div>
                <div className="download-container">
                    <Button className="download" appearance="primary" intent="danger" iconBefore="download" onClick={() => downloadFile()}>Télécharger</Button>
                </div>
            </div>
        </div>
	);
};

export default VideoPlayer;