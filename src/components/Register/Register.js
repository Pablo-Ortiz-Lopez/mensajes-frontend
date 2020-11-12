import React, { useState } from 'react'
import { Grid, Typography, Button, TextField, Paper } from '@material-ui/core'
import './register.css'
import PropTypes from 'prop-types'
import { register, login, credentials } from '../../api/users'

const Register = ({ onLogin }) => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const handleSubmit = async () => {
    try {
      await register({ name, lastName, email, password })
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
          Sign up
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
                type="text"
                placeholder="Name"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoFocus
              />
            </Grid>
            <Grid item>
              <TextField
                type="text"
                placeholder="Surname"
                variant="outlined"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
                autoFocus
              />
            </Grid>
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

Register.propTypes = {
  onLogin: PropTypes.func,
}
export default Register
