import React from 'react';
import { Link } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';

const Test = () => {
    return (
        <div>
             <Button variant="contained" color="primary" component={Link} to="/home/">Login</Button>
        </div>
    );
};

export default Test;