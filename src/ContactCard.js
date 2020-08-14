import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import CustomizedCircularProgress from './components/CustomizedCircularProgress';
import { Card, CardHeader, CardContent, Typography, Avatar, Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    width: '100%',
    display: 'flex',
    height: 180,
    backgroundColor: red[500],
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: red[500],
    display: 'flex',
    alignItems: 'center'
  },
}));
export default function ContactCard(props) {
  const { userId } = props;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const classes = useStyles();

  React.useEffect(() => {
    if (userId > 0) {
      setLoading(true);
      axios.get('http://jsonplaceholder.typicode.com/users/' + userId)
        .then((res) => {
          setUser(res.data);
        }).finally(() => {
          setLoading(false);
        })
    }
  }, [userId]);

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader className={classes.header}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {user.name === undefined ? '' : user.name.charAt(0)}
            </Avatar>
          }
        />

        <CardContent className={classes.content}>
          <Grid container spacing={6}>
            <Grid container item xl={6}>
              <Typography variant="h5" color="textPrimary" component="p">
                {user.name}
              </Typography>
              <Typography variant="body2" color="textPrimary" component="p">
                {user.company === undefined ? '' : user.company.bs}
                <br />
                {user.phone}
                <br />
                {user.email}
                <br />
                {user.website}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {loading ? <CustomizedCircularProgress /> : null}
    </div>
  );
}