import React from 'react';
import ReactDOM from 'react-dom';

class ZMapEndpoint extends React.Component {

	constructor(props) {
		super(props);

		this.marker = null;
		this.lat = props.data.lat;
		this.lon = props.data.lon;
	}

	componentWillMount() {
		var ZDC = window.ZDC;
		var latlon = new ZDC.LatLon(this.lat, this.lon);
		this.marker = new ZDC.Marker(latlon, {
			color: ZDC.MARKER_COLOR_ID_GREEN_L
		});

		this.props.onWidgetAdded(this.marker);
	}

	componentWillUnmount() {
	}

	componentDidMount() {
	}

	componentDidUpdate(prevProps, prevState) {
		this.lat = this.props.data.lat;
		this.lon = this.props.data.lon;

		var ZDC = window.ZDC;
		var latlon = new ZDC.LatLon(this.lat, this.lon);
		this.marker.moveLatLon(latlon);
	}

	render() {
		return null;
	}
}

export default ZMapEndpoint;
