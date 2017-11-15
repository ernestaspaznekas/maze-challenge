import React, { Component } from 'react';
import AppBar from '../components/AppBar'
import Grid from '../components/Grid'

class MainLayout extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <Grid />
      </div>
    )
  }
}

export default MainLayout
