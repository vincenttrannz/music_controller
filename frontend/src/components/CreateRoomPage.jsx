import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Textfield from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

export default function CreateRoomPage() {
  let defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);

  const handleVotesChanged = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPause = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);
  };

  const handleCreateRoomButtonPressed = () => {
    console.log("Button clicked");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause
      })
    };
    fetch('/api/create-room', requestOptions)
    .then(resp => resp.json())
    .then(data => console.log(data));
  };

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      direction="column"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography component="h4" variant="h4">
          Create Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormHelperText>Guest control panel</FormHelperText>
          <RadioGroup row defaultValue="true" onChange={handleGuestCanPause}>
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <Textfield
            onChange={handleVotesChanged}
            required
            type="number"
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: {
                textAlign: "center",
              },
            }}
          />
          <FormHelperText>Votes required to skip</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleCreateRoomButtonPressed}
        >
          Create a Room
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
