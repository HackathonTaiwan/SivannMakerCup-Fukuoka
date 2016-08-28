import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './Utils';
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
		this.retry = 3;
	}

	componentWillMount() {
		this.signalReceiver.on('endpoints', this.onEndpointChanged);
	}

	componentWillUnmount() {
		this.signalReceiver.removeListener('endpoints', this.onEndpointChanged);
	}

	componentDidMount() {
		this.initializeSignalReceiver();
	}

	async initializeSignalReceiver() {

		try {
			//await this.signalReceiver.connect('wss://echo.websocket.org');
			console.log('Connecting to server...');
			await this.signalReceiver.connect('ws://hackathontw.mybluemix.net/map/location');
			console.log('Connected');
		} catch(e) {
			await this.reconnect();
		}
	}

	async reconnect() {

		if (!this.retry) {
			this.retry = 3;
			await Utils.delay(10000);
		} else {
			await Utils.delay(1000);
		}

		this.retry--;

		console.log('Reconnecting...');
		return await this.initializeSignalReceiver();
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
