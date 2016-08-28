import events from 'events';
import Utils from './Utils';

class SignalReceiver extends events.EventEmitter {

	constructor() {
		super();

		this.websocket = null;
		this.endpoints = {};
		this.fakeGPSTimer = -1;
	}

	fakeGPS() {

		// FOR TESTING
		var lat = 33.5877158;
		var lon = 130.4186799;

		var endpoints = [];
		for (var index = 0; index < 30; index++) {
			endpoints.push({
				type: 'endpoint',
				endpointId: Math.random().toString(),
				online: true,
				lat: lat + Math.random() / 100,
				lon: lon + Math.random() / 100,
				devs: {}
			});
		}

		clearInterval(this.fakeGPSTimer);
		this.fakeGPSTimer = setInterval(() => {
			lat += 0.00001;
			lon += 0.00001;

			for (var index in endpoints) {
				var endpoint = endpoints[index];
				endpoint.lat += 0.00001;
				endpoint.lon -= 0.00001;

				this.websocket.send(JSON.stringify(endpoint));
			}
/*
			var msg = {
				type: 'endpoint',
				endpointId: '1234567890',
				online: true,
				lat: lat,
				lon: lon
			};

			this.websocket.send(JSON.stringify(msg));

			var msg2 = {
				type: 'endpoint',
				endpointId: '1234567890A',
				online: true,
				lat: lat + 0.0005,
				lon: lon
			};
			this.websocket.send(JSON.stringify(msg2));

			var msg3 = {
				type: 'endpoint',
				endpointId: '1234567890B',
				online: true,
				lat: lat + 0.001,
				lon: lon
			};
			this.websocket.send(JSON.stringify(msg3));

			var msg4 = {
				type: 'endpoint',
				endpointId: '1234567890C',
				online: true,
				lat: lat + 0.0015,
				lon: lon + 0.0015
			};
			this.websocket.send(JSON.stringify(msg4));
		*/
		}, 1000);
	}

	connect(url) {

		return new Promise((resolve, reject) => {
			this.websocket = new WebSocket(url);
			
			this.websocket.onopen = () => {

				// Reset error handler
				this.websocket.onerror = (e) => {
					this.handleError(e);
				};

				this.websocket.onclose = (e) => {
					this.onclose(e);
				};

				resolve();

				// Call to enable capturing information
				var cmd = {
					type: 'action',
					action: 'hookEndpoint',
					enabled: true
				};
				this.websocket.send(JSON.stringify(cmd));

				this.fakeGPS();
			};

			this.websocket.onclose = (e) => {
				reject(e);
			};

			this.websocket.onmessage = (evt) => {
				this.handleMessage(evt);
			};

			this.websocket.onerror = (e) => {
				console.log(e);
				reject(e);
			};
		});
	}

	disconnect() {

		if (!this.websocket)
			return;

		this.websocket.close();
		this.websocket = null;
	}

	handleMessage(e) {
		var msg = JSON.parse(e.data);

		switch(msg.type) {
		case 'endpoint':

			if (msg.online) {
				this.endpoints[msg.endpointId] = {
					lat: msg.lat,
					lon: msg.lon
				};
			} else if (this.endpoints[msg.endpointId]) {
				delete this.endpoints[msg.endpointId];
			}

			this.emit('endpoints', this.endpoints);

			break;
		default:
			console.log(msg);
		}
	}

	handleError(e) {
	}
}

export default SignalReceiver;
