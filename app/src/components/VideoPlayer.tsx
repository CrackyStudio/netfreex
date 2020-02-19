import 'styles/components/backButton.css'
import React from 'react';
import ReactPlayer from 'react-player';
import BackButton from 'components/BackButton';
import { Button, IconButton } from 'evergreen-ui';
import 'styles/components/videoPlayer.css';

const VideoPlayer = ({source, backButton = true}: {source: string, backButton?: boolean}) => {

    const downloadFile = () => {
        window.open(source);
    }

    const donate = () => {
        const url = "https://www.paypal.me/officialcracky/5";
        const width = 400;
        const height = 640;
        const y = window.top.outerHeight / 2 + window.top.screenY - ( height / 2);
        const x = window.top.outerWidth / 2 + window.top.screenX - ( width / 2);
        const args = 'scrollbars=no, width='+width+', height='+height+', top='+y+', left='+x;
        window.open(url, "", args);
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
                    <IconButton className={backButton ? "donate" : "donate-serie"} appearance="primary" icon="dollar" intent="success" onClick={() => donate()}/>
                    <Button className="download" appearance="primary" intent="danger" iconBefore="download" onClick={() => downloadFile()}>Télécharger</Button>
                </div>
            </div>
        </div>
	);
};

export default VideoPlayer;