import Popover from 'react-bootstrap/lib/Popover';
import React from 'react';

/*
 * MyPopover is the exact same as react-bootstrap/lib/Popover, but MyPopover
 * always has the arrow towards the top of the popover
 */
let MyPopover = (props) => {
    return (<Popover {...props} arrowOffsetTop={30} />);
};

export default MyPopover;
