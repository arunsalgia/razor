import React from 'react';
//import Grid from '@material-ui/core/Grid';
//import {  blue, yellow } from '@material-ui/core/colors';
//import {  blue, yellow } from '@material-ui/core/colors';
//import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

//{padding: "5px 10px", margin: "4px 2px", color: 'black', fontSize:'18px', borderRadius:7, border: 2};

const PADDINGVALUE = '2px';
const MARGINVALUE = '2px';
const BTNWIDTH = '36px';
const FONTSIZE = 24;
const PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const SCROLLPERCENT = 10;

const useStyles = makeStyles((theme) => ({

  selected: {
	width: BTNWIDTH,
    marginLeft: MARGINVALUE,
	marginRight: MARGINVALUE,
	backgroundColor: 'yellow',
	borderRadius: 7,
	border: 2,
	fontSize: theme.typography.pxToRem(FONTSIZE),
	fontWeight: theme.typography.fontWeightBold,
	paddingLeft: PADDINGVALUE,
	paddingRight: PADDINGVALUE,
	borderColor: 'black',
	borderStyle: 'solid',
  },
  normal: {
	width: BTNWIDTH,
    marginLeft:MARGINVALUE,
	marginRight: MARGINVALUE,
	//backgroundColor: 'blue',
	borderRadius: 7,
	border: 2,
	fontSize: theme.typography.pxToRem(FONTSIZE),
	fontWeight: theme.typography.fontWeightBold,
	borderColor: 'black',
	borderStyle: 'solid',
	paddingLeft: PADDINGVALUE,
	paddingRight: PADDINGVALUE,
  },
  blue: {
	width: BTNWIDTH,
    marginLeft: MARGINVALUE,
	marginRight: MARGINVALUE,
	color: 'blue',
	borderRadius: 7,
	border: 2,
	fontSize: theme.typography.pxToRem(FONTSIZE),
	fontWeight: theme.typography.fontWeightBold,
	paddingLeft: PADDINGVALUE,
	paddingRight: PADDINGVALUE,
	borderColor: 'black',
	borderStyle: 'solid',
  },
}));


export default function VsButton(props) {
const classes = useStyles();
var DISPLAYPAGES_WO_BTN = 18
var DISPLAYPAGES_WITH_BTN= 15

let possibleBtns = Math.floor(window.innerWidth / 55);
//console.log("possible", possibleBtns);
DISPLAYPAGES_WO_BTN = (possibleBtns > 25) ? 25 : possibleBtns;
if (DISPLAYPAGES_WO_BTN < 10)
	DISPLAYPAGES_WITH_BTN = DISPLAYPAGES_WO_BTN-2;
else if (DISPLAYPAGES_WO_BTN < 20)
	DISPLAYPAGES_WITH_BTN = DISPLAYPAGES_WO_BTN-5;
else
	DISPLAYPAGES_WITH_BTN = DISPLAYPAGES_WO_BTN-5;

let _scroll = Math.max(Math.floor((SCROLLPERCENT*props.count) / 100), 5);

//console.log("Scrolls",_scroll);
//console.log(props.count);
if (props.count <= 1) return null;
//var _lp = 1;
var _btnRequired = props.count > DISPLAYPAGES_WO_BTN;
var _sliceEnd = (props.count <= DISPLAYPAGES_WO_BTN) ? props.count : DISPLAYPAGES_WITH_BTN
var _home = ((DISPLAYPAGES_WO_BTN > 15) && (props.showStart != null))
var _end =  ((DISPLAYPAGES_WO_BTN > 15) && (props.showEnd != null));
return (
<div align="center">
	
	{((_btnRequired) && _home) &&
		<button className={classes.blue} 
		onClick={() => props.setLeft(1) } >
		{"S"}
		</button>
	}
	{(_btnRequired) &&
		<button className={classes.blue} 
		onClick={() => props.setLeft( (props.left > _scroll) ? (props.left - _scroll) : 1) } >
		{"<<"}
		</button>
	}
	{(_btnRequired) &&
		<button className={classes.normal} 
		onClick={() => props.setLeft( (props.left > 1) ? (props.left-1) : 1 ) } >
		{"<"}
		</button>
	}
	{PAGES.slice(0, _sliceEnd).map( (p, index) => 
		<button className={((props.left + index) === props.current) ? classes.selected : classes.normal }
		onClick={() => props.onClick(props.left+index) } >{props.left+index}
		</button>		
	)}
	{(_btnRequired) &&
		<button className={classes.blue} 
		onClick={() => { props.setLeft( ((props.left + DISPLAYPAGES_WITH_BTN -1) < props.count) ? (props.left + 1) : props.left ) }} >
		{">"}
		</button>
	}
	{(_btnRequired) &&
		<button className={classes.blue} 
		onClick={() => props.setLeft( ((props.left + DISPLAYPAGES_WITH_BTN - 1 + _scroll) < props.count) ? (props.left+_scroll) : (props.count - DISPLAYPAGES_WITH_BTN + 1) ) } >
		{">>"}
		</button>
	}
	{((_btnRequired) && _end) &&
	<button className={classes.blue} 
	onClick={() => props.setLeft(props.count - DISPLAYPAGES_WITH_BTN + 1) } >
	{"E"}
	</button>
	}
</div>
)
}

