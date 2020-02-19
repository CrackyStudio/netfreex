import React from 'react';
import { useStateValue } from 'hooks/provider';
import 'styles/components/headerButton.css'

const HeaderButton = ({text, enabled = true}: {text: string, enabled?: boolean}) => {
	const [{category}, dispatch] = useStateValue() as Array<any>;

    const setcategory = (category: string) => {
        dispatch({ key: 'category', value: category });
        dispatch({ key: 'showPlayer', value: false });
        dispatch({ key: 'film', value: "" });
        dispatch({ key: 'serie', value: "" });
        dispatch({ key: 'seasons', value: "" });
        dispatch({ key: 'season', value: "" });
        dispatch({ key: 'seasonIndex', value: "" });
        dispatch({ key: 'episodes', value: [] });
        dispatch({ key: 'episode', value: [] });
        dispatch({ key: 'episodeIndex', value: [] });
    }

    const getClass = (): string => {
        if (enabled && category === text) {
            return "cs-button active";
        } else if (enabled && category !== text) {
            return "cs-button";
        }
        return "cs-button disabled";
    }

	return (
        <>
            {enabled && (
                <div className={getClass()} onClick={() => setcategory(text)}>
                    <p>
                        {text}
                    </p>
                </div>
            )}
            {!enabled && (
                <div className={getClass()}>
                    <p>
                        {text}
                    </p>
                </div>
            )}
        </>
	);
};

export default HeaderButton;