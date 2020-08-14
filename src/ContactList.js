import React, { useState } from 'react';
import axios from 'axios';
import ContactCard from './ContactCard';
import Hidden from '@material-ui/core/Hidden';
import { Drawer, TextField, Container, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    marginTop: theme.spacing(7),
    padding: theme.spacing(3),
    justifyContent: 'center',
    alignItems: 'center'
  },
  outbox: {
    display: 'flex',
  },
  iconbutton: {
    marginTop: 10,
    display: 'flex',
    textAlign: 'left'
  },
  searchtext: {
    display: 'flex',
    textAlign: 'right',
  }
}));

export default function ContaxtList(props) {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [backList, setBackList] = useState([]);
  const [order, setOrder] = useState('asc');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const handleClickItem = (id) => {
    setSelectedUserId(id);
  };
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleSortByLetter = () => {
    
    let innerList = [];
    if(order === 'asc') {
      backList.sort(function (obj1, obj2) {
        return obj1.name.localeCompare(obj2.name)
      });
      setOrder('dsc');
    } else {
      backList.sort(function (obj1, obj2) {
        return obj2.name.localeCompare(obj1.name)
      });
      setOrder('asc');
    }
    
    for (let i = 0; i < backList.length; i++) {
      innerList.push(backList[i]);
    }
    setList(innerList);
  };

  const handleInput = (e) => {
    let searchValue = e.target.value;
    if (searchValue === '') {
      initialList();
    } else {
      let innerList = [];

      for (let i = 0; i < backList.length; i++) {
        if (backList[i].name.toLowerCase().startsWith(searchValue.toLowerCase())) {
          innerList.push(backList[i]);
        }
      }
      setList(innerList);
    }

  }
  const initialList = () => {
    axios.get('http://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setList(res.data)
        setBackList(res.data);
      })
  };

  const drawer = (
    <div>
      <div className={classes.outbox}>
        <div className={classes.iconbutton}>
          <IconButton
            color="inherit"
            // aria-label="open drawer"
            onClick={handleSortByLetter}
          >
            <SortByAlphaIcon />
          </IconButton>
        </div>
        <div className={classes.searchtext}>
          <form noValidate autoComplete="off">
            <TextField id="standard-basic" label="Searching..." onChange={handleInput} />
          </form>
        </div>

      </div>

      <List>
        {list.map((user, index) => (
          <ListItem button key={user.id} onClick={() => handleClickItem(user.id)}>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  React.useEffect(() => {
    initialList();
  }, []);

  return (
    <Container>
      <Grid container>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Contact Cards
          </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              // container={container}
              variant="temporary"
              // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <ContactCard userId={selectedUserId} />
        </main>
      </Grid>
    </Container>
  );
}