import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import { Link } from "react-router-dom";

const styles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const classes = styles();

    const nextPath = (path) =>{
    this.props.history.push(path);
  }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-username"
                    label="Username"
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    id="outlined-password"
                    label="Password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                    <Button variant="contained" color="primary" component={Link} to="/home/">Login</Button>
                </div>
            </div>
        </form>
    );
    
};
