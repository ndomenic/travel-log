import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import map from './uk.png';

const styles = theme => ({
  limitWidth: {
    height: '100vh'
  }
});

class App extends Component {
  render () {
    const {classes} = this.props;

    return(
      <div className="App">
        <main>
          <img src={map} alt="map" className={classes.limitWidth}/>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
