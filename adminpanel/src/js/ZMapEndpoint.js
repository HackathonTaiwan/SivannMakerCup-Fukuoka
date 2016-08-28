import React from 'react';
import ReactDOM from 'react-dom';

class ZMapEndpoint extends React.Component {

	constructor(props) {
		super(props);

		this.marker = null;
		this.lat = props.data.lat;
		this.lon = props.data.lon;
		this.devices = props.data.devs || {};
	}

	generateMarker() {
		return '<div class=\"marker\"><div class=\"pin\"><div class=\"label\">Devices:' + Object.keys(this.devices).length + '</div></div><div class=\"pulse\"></div></div>';
	}

	componentWillMount() {
		var ZDC = window.ZDC;
		var latlon = new ZDC.LatLon(this.lat, this.lon);

		this.marker = new ZDC.UserWidget(latlon, {
			html: this.generateMarker(),
			size: new ZDC.WH(100, 100)
		});

		/*
		this.marker = new ZDC.Marker(latlon, {
			color: ZDC.MARKER_COLOR_ID_GREEN_L
		});
*/
		this.props.onWidgetAdded(this.marker);
		this.marker.open();
	}

	componentWillUnmount() {
	}

	componentDidMount() {
	}

	componentDidUpdate(prevProps, prevState) {
		this.lat = this.props.data.lat;
		this.lon = this.props.data.lon;
		this.devices = this.props.data.devs || {};

		var ZDC = window.ZDC;
		var latlon = new ZDC.LatLon(this.lat, this.lon);
		this.marker.moveLatLon(latlon);

		// Update information
//		this.marker.setHtml(this.generateMarker());
	}

	render() {
		return null;
	}
}

export default ZMapEndpoint;
