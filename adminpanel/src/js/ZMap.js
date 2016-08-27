import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './loader';

class ZMap extends React.Component {

	constructor(props) {
		super(props);

		this.loader = new Loader();
	}

	async initialMap() {

		await this.loader.script('http://api.its-mo.com/cgi/loader.cgi?key=JSZ832466564885&ver=2.0&api=zdcmap.js&enc=EUC&force=1');

		console.log(window.ZDC);

		var lat = 35.6778614;
		var lon = 139.7703167;
		var map = new window.ZDC.Map(this.refs.map, {
			latlon: new window.ZDC.LatLon(lat, lon),
			zoom: 3
		});
	}

	componentDidMount() {

		this.initialMap();
	}

	render() {
		return <div ref='map' className='map' />
	}
}

export default ZMap;
