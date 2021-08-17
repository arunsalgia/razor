import React from 'react';
import {blue }  from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const BlueRadio = withStyles({
    root: {
      color: blue[700],
      '&$checked': {
        color: blue[700],
      },
    },
    checked: {},
  })((props) => <Radio color="blue" {...props} />);

  export default BlueRadio;
  