// @flow weak

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Print from './Print'
import PrintData from './PrintData'



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
      //console.log(mazeId)
  
      this.setState({'mazeId': mazeId})
    }
  
    render() {
        console.log(this.props)
        const classes = this.props;
        return (
          <div>
            <Paper className={classes.root} elevation={4}>
              <Typography type="headline" component="h3">
                <PrintData changeId={this.changeId} />

              </Typography>
              <Typography type="body1" component="p">
                <Print mazeId={this.state.mazeId} />
              </Typography>
            </Paper>
          </div>
        )
    }
  }
  

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);