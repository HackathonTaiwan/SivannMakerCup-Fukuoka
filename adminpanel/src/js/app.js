import React from 'react';
import ReactDOM from 'react-dom';
import ZMap from './ZMap';

require('../less/style.less');

class App extends React.Component {

	render() {
		return <ZMap />;
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
