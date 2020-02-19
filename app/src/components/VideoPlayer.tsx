import 'styles/components/backButton.css'
import React from 'react';
import ReactPlayer from 'react-player';
import BackButton from 'components/BackButton';
import 'styles/components/videoPlayer.css';

const VideoPlayer = ({source, backButton = true}: {source: string, backButton?: boolean}) => {
	return (
        <div className="player-container">
           <div className="player">
            <ReactPlayer playing={true} controls={true} url={source} pip={true} height='440px' config={{
                    file: {
                        attributes: { autoPictureInPicture: true }
                    },
                }}/>
           </div>
            {backButton && (
                <BackButton screen={"player"} text="Revenir au catalogue"/>
            )}
        </div>
	);
};

export default VideoPlayer;