/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useStateValue } from 'hooks/provider';

const Pi: React.FC = () => {
	const [
		{ pi, piIdx },
		dispatch,
	] = useStateValue() as Array<any>;

    useEffect(() => {
        const intervalId = setInterval(() => {
            let currentIdx = piIdx;
            if (currentIdx === pi.length - 1) {
                dispatch({ key: 'piIdx', value: 0 });
            } else {
                dispatch({ key: 'piIdx', value: currentIdx + 1 });
            }
        }, 4200);

        return () => clearInterval(intervalId);
    })

	return (
        <p>{pi[piIdx]}</p>
	);
};

export default Pi;