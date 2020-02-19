import React from 'react';
import State from 'hooks/state';
import Dashboard from 'screens/dashboard';
import { StateProvider } from 'hooks/provider';
import { Reducer } from 'hooks/reducer';
import 'styles/app/main.css';

const App: React.FC = () => {
	return (
		<StateProvider initialState={State} reducer={Reducer}>
			<div className="App">
				<Dashboard/>
			</div>
		</StateProvider>
	);
};

export default App;