var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;
var WebSocket = require('WebSocket');

export default class FreebirdText extends React.Component {
  state = {
    lastText: 'unknown',
  };

  setWebSocket () {
    let wsFreebird, wsBluemix;
    
    //wsBluemix = new WebSocket('ws://hackathontw.mybluemix.net/map/location');
    //wsBluemix.onopen = () => {
      wsFreebird = new WebSocket('ws://192.168.43.14:3000');
      
      wsFreebird.onopen = () => {
          var lastText = 'wsFreebird open',
              getDevIdsRqe = JSON.stringify({
                __intf: 'REQ',
                subsys: 'net',
                seq: 1,
                id: 0,
                cmd: 'getAllDevIds',
                args: {}
              });
              
          this.setState({lastText});
          wsFreebird.send(getDevIdsRqe);
      }
      
      wsFreebird.onmessage = (e) => {
        alert(JSON.parse(e.data).data);
        var lastText = JSON.stringify(JSON.parse(e.data).data);
        this.setState({lastText});
        //wsBluemix.send(lastText);
      }
      
    //}; 
  }
  
  componentDidMount() {
    this.setWebSocket();
  }

  render() {
    return (
      <View>
        <Text>
          <Text >Last text: </Text>
          {this.state.lastText}
        </Text>
      </View>
    );
  }
}
