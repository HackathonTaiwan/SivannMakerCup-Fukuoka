var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;
var WebSocket = require('WebSocket');
var wsBluemix, wsFreebird; 

export default class Geolocation extends React.Component {
  state = {
    lat: 'unknown',
    lon: 'unknown',
    ids: [],
    devs: {},
    lastPosition: 'unknown',
  };

  watchID: ?number = null;
  
  setWsBluemix () {
    var self = this;
  
    wsBluemix = new WebSocket('ws://hackathontw.mybluemix.net/map/location');
    
    wsBluemix.onopen = () => {
      setInterval(function () {
        self.sendInfo();  
      }, 3000);
    
      self.watchID = navigator.geolocation.watchPosition((position) => {
        var lat = position.coords.latitude,
            lon = position.coords.longitude,
            lastPosition = JSON.stringify({
              type: 'endpoint',
              endpointId: '',
              online: true,
              lat: position.coords.latitude,
              lon: position.coords.longitude
          });
        
        self.setState({lat, lon, lastPosition});               
      });
    }

    wsBluemix.onerror = (e) => {
      // an error occurred
      alert('err: ' + e.message);
    };

    wsBluemix.onclose = (e) => {
      // connection closed
      alert('close: ' + e.reason);
    };
  }
  
  setWsFreebird () {
    var self = this;
  
    wsFreebird = new WebSocket('ws://192.168.43.14:3000'); 
    
    wsFreebird.onopen = () => {
      self.getDevIds()
    }
    
    wsFreebird.onmessage = (e) => {
      switch (JSON.parse(e.data).cmd) {
        case 'getAllDevIds':
          var ids = JSON.parse(e.data).data.ids;
          self.setState({ids});  
          self.getDevs();
          break;
        
        case 'getDevs':
          var devs = {},
              devInfo = JSON.parse(e.data).data.devs;
          
          devInfo.forEach(function (value, index) {
            devs[value.id] = value;
          });
          
          self.setState({devs});  
          break;
          
        case 'statusChanged':
          break;
        
        case 'attrsChanged':
          break;
          
        default:
          break;
      }      
    }
  }
  
  sendInfo () {
    var info = JSON.stringify({
      type: 'endpoint',
      endpointId: 'epPeter01',
      online: true,
      lat: this.state.lat,
      lon: this.state.lon,
      devs: this.state.devs
    });
    
    wsBluemix.send(info);
  }
    
  getDevIds () {
    var getDevIdsRqe = JSON.stringify({
          __intf: 'REQ',
          subsys: 'net',
          seq: 1,
          id: 0,
          cmd: 'getAllDevIds',
          args: {}
        });
        
    wsFreebird.send(getDevIdsRqe);
  }
  
  getDevs () {
    var getDevsRqe = JSON.stringify({
        __intf: 'REQ',
        subsys: 'net',
        seq: 2,
        id: 0,
        cmd: 'getDevs',
        args: {
          ids: this.state.ids
        }
      });
        
    wsFreebird.send(getDevsRqe);  
  }
  
  componentDidMount() {
    this.setWsBluemix();
    this.setWsFreebird();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <Text style={styles.gps}>
          <Text >Position: </Text>
          lat {this.state.lat} lon {this.state.lon}
        </Text>
        <Text style={styles.ids}>
          <Text>Device Ids: </Text>
          {JSON.stringify(this.state.ids)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gsp: {
    fontSize: 24,
    textAlign: 'center',
  },
  ids: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333333',
  },
});
