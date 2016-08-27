import events from 'events';

class SignalReceiver extends events.EventEmitter {

	constructor() {
		super();

		this.websocket = null;
		this.endpoints = {};
	}

	connect(url) {

		return new Promise((resolve, reject) => {
			this.websocket = new WebSocket(url);
			
			this.websocket.onopen = () => {
				resolve();

				// Reset error handler
				this.websocket.onerror = (e) => {
					this.handleError(e);
				};

				var cmd = {
					type: 'action',
					action: 'hookEndpoint',
					enabled: true
				};
				this.websocket.send(JSON.stringify(cmd));

				// FOR TESTING
				var lat = 35.6778614;
				var lon = 139.7703167;
				setInterval(() => {
					lat += 0.00001;
					lon += 0.00001;

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
				}, 100);
			};

			this.websocket.onclose = (e) => {
				this.onclose(e);
			};

			this.websocket.onmessage = (evt) => {
				this.handleMessage(evt);
			};

			this.websocket.onerror = () => {
				reject();
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
		}
	}

	handleError(e) {
	}
}

export default SignalReceiver;
