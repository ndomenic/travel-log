import React, {Component} from 'react';
import uk from './uk.json';
import MapContainer from './MapContainer'

class App extends Component {
  render () {
    return(
      <div>	
        <MapContainer mapData={uk}/>
      </div>
    );
  }
}

export default App;