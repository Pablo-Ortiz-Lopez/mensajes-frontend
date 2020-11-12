import React, { useState } from 'react'
import { Grid, Typography, Button, TextField, Paper } from '@material-ui/core'
import './login.css'
import PropTypes from 'prop-types'
import { login, credentials } from '../../api/users'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const handleSubmit = async () => {
    try {
      await login({ email, password })
      const auth = await credentials({ email, password })
      onLogin(auth)
    } catch (e) {
      setError(true)
    }
  }

  return (
    <Paper variant="elevation" elevation={2} className="login-background">
      <Grid item>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </Grid>
      <Grid item>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                type="email"
                placeholder="Email"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoFocus
              />
            </Grid>
            <Grid item>
              <TextField
                type="password"
                placeholder="Password"
                variant="outlined"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="button-block"
              >
                Submit
              </Button>
              {error && <Typography style={{ color: 'red' }}>Error</Typography>}
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func,
}
export default Login
