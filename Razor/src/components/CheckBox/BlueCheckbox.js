import React from 'react';
import {blue }  from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const BlueCheckbox = withStyles({
    root: {
      color: blue[700],
      '&$checked': {
        color: blue[700],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  export default BlueCheckbox;
  