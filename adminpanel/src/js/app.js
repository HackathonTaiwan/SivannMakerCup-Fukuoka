import React from 'react';
import ReactDOM from 'react-dom';
import ZMap from './ZMap';
import ZMapEndpoint from './ZMapEndpoint';

import SignalReceiver from './signal_receiver';

require('../less/style.less');

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			endpoints: {}
		};
		this.signalReceiver = new SignalReceiver();
	}

	componentWillMount() {
		this.signalReceiver.on('endpoints', this.onEndpointChanged);
	}

	componentWillUnmount() {
		this.signalReceiver.removeListener('endpoints', this.onEndpointChanged);
	}

	componentDidMount() {
		this.initialize();
	}

	async initialize() {

		//await this.signalReceiver.connect('wss://echo.websocket.org');
		await this.signalReceiver.connect('ws://hackathontw.mybluemix.net/ws/location');
	}

	onEndpointChanged = (endpoints) => {
		this.setState({
			endpoints: endpoints
		});
	}

	render() {
		return (
			<ZMap>
				{(() => {
					var endpoints = [];

					for (var id in this.state.endpoints) {
						var data = this.state.endpoints[id];
						endpoints.push(
							<ZMapEndpoint endpointId={id} data={data} key={id} />
						);
					}

					return endpoints;
				})()}
			</ZMap>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
