import React from 'react';
import { useStateValue } from 'hooks/provider';
import { IconButton, Button } from 'evergreen-ui';
import 'styles/components/backButton.css'

const BackButton = ({screen, text}: {screen?: string, text?: string}) => {
	const [, dispatch] = useStateValue() as Array<any>;

    const goBack = (screen?: string) => {
        switch (screen) {
            case 'serie':
                goToSeries()
                break;
            case 'film':
                disablePlayer()
                break;
            case 'player':
                disablePlayer()
                break;
            default:
                goToHome()
                break;
          }
    }

    const goToHome = () => {
        dispatch({ key: 'category', value: "" });
    }

    const goToSeries = () => {
        dispatch({ key: 'episodes', value: [] });
        dispatch({ key: 'seasons', value: "" });
        dispatch({ key: 'seasonIndex', value: "" });
        dispatch({ key: 'serie', value: "" });
    }

    const disablePlayer = () => {
        dispatch({ key: 'showPlayer', value: false });
    }

	return (
        <div>
            {!text && (
                <div className="back-container">
                    <IconButton appearance="primary" intent="danger" icon="arrow-left" onClick={() => goBack(screen)}/>
                </div>
            )}
            {text && (
                <div className="back-container">
                    <Button appearance="primary" intent="danger" iconBefore="arrow-left" onClick={() => goBack(screen)}>{text}</Button>
                </div>
            )}
        </div>
	);
};

export default BackButton;