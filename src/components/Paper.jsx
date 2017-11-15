// @flow weak

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Print from './Print'
//import PrintData from './PrintData'



const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class PaperSheet extends Component {
    state = {
      'mazeId': false,
    }
  
    changeId = (mazeId) => {
      console.log(mazeId)
  
      this.setState({'mazeId': mazeId})
    }
  
    render() {
        const classes = this.props;
        return (
          <div>
            <Paper className={classes.root} elevation={4}>
              {/*<PrintData changeId={this.changeId} />*/}
              <Print mazeId={this.state.mazeId} />
            </Paper>
          </div>
        )
    }
  }
  

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);