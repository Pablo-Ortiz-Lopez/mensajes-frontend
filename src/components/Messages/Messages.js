import React, { useEffect, useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  TextField,
  Button,
} from '@material-ui/core'
import {
  deleteMessage,
  getMessages,
  updateMessage,
  postMessage,
} from '../../api/messages'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

const Messages = () => {
  const classes = useStyles()
  const [messages, setMessages] = useState([])
  const [decoded, setDecoded] = useState('')
  const [updating, setUpdating] = useState(null)
  const [updatedMessage, setUpdatedMessage] = useState('')

  useEffect(() => {
    update().then(() => {})
  }, [])

  const update = async () => {
    setMessages(await getMessages())
  }

  return (
    <>
      <Grid container justify="flex-start">
        <Grid item>
          <Typography
            variant="h4"
            style={{
              padding: '7%',
              width: '100%',
              textAlign: 'left',
            }}
          >
            Your messages
          </Typography>
        </Grid>
      </Grid>

      <Grid container justify="center" wrap="wrap">
        <Grid item>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Message #</StyledTableCell>
                  <StyledTableCell align="right">
                    Original message
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Encrypted message
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Original message CRC
                  </StyledTableCell>
                  <StyledTableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow key="new-msg">
                  <StyledTableCell component="th" scope="row">
                    {messages.length + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField
                      type="text"
                      placeholder="Message Text"
                      variant="outlined"
                      value={decoded}
                      onChange={(event) => setDecoded(event.target.value)}
                      required
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {(() => {
                      let res = ''
                      for (let i = 0; i < decoded.length; i += 1) res += '*'
                      return res
                    })()}
                  </StyledTableCell>
                  <StyledTableCell align="right">--</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      className="button-block"
                      onClick={async () => {
                        await postMessage({ decoded })
                        await update()
                      }}
                    >
                      Add
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
                {messages
                  .slice(0)
                  .reverse()
                  .map((message, index) => (
                    // eslint-disable-next-line no-underscore-dangle
                    <StyledTableRow key={message._id}>
                      <StyledTableCell component="th" scope="row">
                        {messages.length - index}
                      </StyledTableCell>
                      {/* eslint-disable-next-line no-underscore-dangle */}
                      {updating === message._id ? (
                        <StyledTableCell align="center">
                          <TextField
                            type="text"
                            placeholder="Message Text"
                            variant="outlined"
                            value={updatedMessage}
                            onChange={(event) =>
                              setUpdatedMessage(event.target.value)
                            }
                            required
                          />
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell
                          align="center"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography
                            style={{ padding: '2%', textAlign: 'left' }}
                          >
                            {message.decoded}
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            type="button"
                            className="button-block"
                            style={{ width: '20%' }}
                            onClick={() => {
                              setUpdatedMessage(message.decoded)
                              // eslint-disable-next-line no-underscore-dangle
                              setUpdating(message._id)
                            }}
                          >
                            Edit
                          </Button>
                        </StyledTableCell>
                      )}
                      <StyledTableCell align="center">
                        {message.encoded}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {message.crc}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {/* eslint-disable-next-line no-underscore-dangle */}
                        {updating === message._id ? (
                          <Button
                            variant="contained"
                            color="primary"
                            type="button"
                            className="button-block"
                            onClick={async () => {
                              await updateMessage({
                                // eslint-disable-next-line no-underscore-dangle
                                _id: message._id,
                                decoded: updatedMessage,
                              })
                              setUpdating(null)
                              await update()
                            }}
                          >
                            Update
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="secondary"
                            type="button"
                            className="button-block"
                            onClick={async () => {
                              await deleteMessage({
                                // eslint-disable-next-line no-underscore-dangle
                                _id: message._id,
                              })
                              await update()
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  )
}

export default Messages
