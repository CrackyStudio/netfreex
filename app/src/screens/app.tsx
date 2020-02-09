import React from 'react';
import 'styles/main.css';
import { StateProvider } from 'hooks/provider';
import { Reducer } from 'hooks/reducer';
import State from 'hooks/state';
import Dashboard from 'screens/dashboard';

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