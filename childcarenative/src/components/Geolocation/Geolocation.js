var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;
var WebSocket = require('WebSocket');
var webSocket = new WebSocket('ws://hackathontw.mybluemix.net/map/location');

export default class Geolocation extends React.Component {
  state = {
    lat: 'unknown',
    lon: 'unknown',
    lastPosition: 'unknown',
  };

  watchID: ?number = null;
  
  sendInfo () {
    var info = JSON.stringify({
      type: 'endpoint',
      endpointId: 'ep1',
      online: true,
      lat: this.state.lat,
      lon: this.state.lon
    });
    
    webSocket.send(info);
  }
  
  componentDidMount() {
    var self = this;
    
    webSocket.onopen = () => {
    
      alert('open');
    
      setInterval(function () {
        self.sendInfo();  
      }, 3000);
    
      webSocket.onmessage = (e) => {
        alert('msg: ' + e.data);
      };
    
      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lat = position.coords.latitude,
            lon = position.coords.longitude,
            lastPosition = JSON.stringify({
              type: 'endpoint',
              endpointId: '',
              online: true,
              lat: position.coords.latitude,
              lon: position.coords.longitude
          });
        
        this.setState({lat, lon, lastPosition});               
      });
    }

    webSocket.onerror = (e) => {
      // an error occurred
      alert('err: ' + e.message);
    };

    webSocket.onclose = (e) => {
      // connection closed
      alert('close: ' + e.reason);
    };
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <Text>
          <Text >Current position: </Text>
          {this.state.lastPosition}
        </Text>
      </View>
    );
  }
}
