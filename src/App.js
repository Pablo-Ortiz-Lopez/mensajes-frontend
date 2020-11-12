import React, { useEffect, useState } from 'react'
import './App.css'
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Grid,
  Toolbar,
  Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { credentials, logout } from './api/users'
import Messages from './components/messages/messages'
import { API } from './constants'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.any,
  value: PropTypes.number,
  index: PropTypes.number,
}
function App() {
  const [tab, setTab] = useState(0)
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        setAuth(await credentials())
      } catch (e) {
        setAuth(null)
      }
    })()
  }, [])

  console.log(process.env.NODE_ENV)
  console.log(API)
  const doLogOut = async () => {
    await logout()
    setAuth(null)
  }
  return (
    <div className="App">
      {!auth && (
        <Grid container spacing={0} justify="center" direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={2}
              className="login-form"
            >
              <AppBar position="static">
                <Tabs
                  value={tab}
                  onChange={(event, value) => setTab(value)}
                  aria-label="simple tabs example"
                  centered
                >
                  <Tab label="Login" value={0} />
                  <Tab label="Register" value={1} />
                </Tabs>
              </AppBar>
              <TabPanel value={0} index={tab}>
                <Login
                  onLogin={(value) => {
                    setAuth(value)
                  }}
                />
              </TabPanel>
              <TabPanel value={1} index={tab}>
                <Register
                  onLogin={(value) => {
                    setAuth(value)
                  }}
                />
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
      )}
      {auth && (
        <>
          <AppBar position="static" alignitems="center" color="primary">
            <Toolbar style={{ padding: '2%' }}>
              <Grid container justify="center" wrap="wrap">
                <Grid item>
                  <Typography variant="h6">
                    Welcome, {auth.name} {auth.lastName}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    className="button-block"
                    onClick={() => doLogOut()}
                  >
                    Log Out
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Messages data={[]} />
        </>
      )}
    </div>
  )
}

export default App
