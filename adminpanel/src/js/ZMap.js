import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './loader';

class ZMap extends React.Component {

	constructor(props) {
		super(props);

		this.loader = new Loader();
		this.map = null;
	}

	async initialMap() {

		await this.loader.script('http://api.its-mo.com/cgi/loader.cgi?key=JSZ832466564885&ver=2.0&api=zdcmap.js,userwidget.js&enc=EUC&force=1');

		var ZDC = window.ZDC;
		var lat = 33.5877158;
		var lon = 130.4186799;
		this.map = new ZDC.Map(this.refs.map, {
			latlon: new ZDC.LatLon(lat, lon),
			mapType: ZDC.MAPTYPE_HIGHRES_DEFAULT,
			zoom: 12
		});
	}

	componentDidMount() {

		this.initialMap();
	}

	onWidgetAdded = (widget) => {
		this.map.addWidget(widget);
	}

	render() {
		return (
			<div ref='map' className='map'>
				{React.Children.map(this.props.children, (child) => {
					return React.cloneElement(child, {
						onWidgetAdded: this.onWidgetAdded
					});
				})}
			</div>
		);
	}
}
				/*
				{this.props.children.map((child) => {
					return <child onWidgetAdded={this.onWidgetAdded} />
				})}
				*/

export default ZMap;
