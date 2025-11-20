import { useState } from "react";
import { Box, Typography, Slider, Switch, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";



const CallConfiguration = () => {
  const [pauseBeforeSpeaking, setPauseBeforeSpeaking] = useState(0);
  const [idleDuration, setIdleDuration] = useState(15);
  const [voicemailDetection, setVoicemailDetection] = useState("ML-based");
  const [idleReminders, setIdleReminders] = useState(true);
  const [idleReminderTime, setIdleReminderTime] = useState(4);
  const [idleReminderMessage, setIdleReminderMessage] = useState("I'm still here. Do you have any questions?");
  const [speakerBoost, setSpeakerBoost] = useState(false);
  const [callDuration, setCallDuration] = useState(20);
  const [recordingConsent, setRecordingConsent] = useState(false);
  const [askRecording, setAskrecording] = useState(false);
  const [recordings, setRecordings] = useState(true);
  const [transcripts, setTranscripts] = useState(true);

  return (
    <Box p={4} display="flex" flexDirection="column" gap={4}>
      <Typography variant="h6" fontWeight="bold">Call Configuration</Typography>
    {/* Pause Before... */}
      <Box sx={{display: "flex",justifyContent: "space-between", alignItems: "center", gap: "22rem"}}>
        <Box sx={{flexDirection: "column", width: "100%"}}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 1}}>Pause Before Speaking</Typography>
        <Typography variant="body2" color="textSecondary">
            The duration before the assistant starts speaking at the beginning of the call.
          </Typography>
        </Box>
        <Slider value={pauseBeforeSpeaking} onChange={(_, val) => setPauseBeforeSpeaking(val)} min={0} max={5} step={1} />
      </Box>
        {/* max idle */}
      <Box sx={{display: "flex",justifyContent: "space-between", alignItems: "center", gap: "22rem"}}>
      <Box sx={{flexDirection: "column", width: "100%"}}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 1}}>Max. Idle Duration</Typography>
        <Typography variant="body2" color="textSecondary">
            The assistant will disconnect after this period.
          </Typography>
        </Box>
        <Slider value={idleDuration} onChange={(_, val) => setIdleDuration(val)} min={5} max={60} step={5} />
      </Box>

        {/* vocie dection */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ minWidth: 240 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 1}}>Voicemail Detection</Typography>
          <Typography variant="body2" color="textSecondary" sx={{width: "21rem"}}>
            Choose between “time-based” check that identifies voicemail based on call duration, and “ML-based” detection that uses LLM.
          </Typography>
        </Box>
        <FormControl variant="outlined" sx={{ minWidth: "25rem" }}>
          <InputLabel id="voicemail-detection-label">Detection Type</InputLabel>
          <Select
            labelId="voicemail-detection-label"
            value={voicemailDetection}
            onChange={(e) => setVoicemailDetection(e.target.value)}
            label="Detection Type"
          >
            <MenuItem value="Time-based">Time-based</MenuItem>
            <MenuItem value="ML-based">ML-based</MenuItem>
          </Select>
        </FormControl>
      </Box>
    {/* reminders section */}
      <Box>
        <Box sx={{display: "flex",justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 1}}>Idle Reminders</Typography>
        <Switch checked={idleReminders} onChange={() => setIdleReminders(!idleReminders)} />
        </Box>
        {idleReminders && (
          <Box >
            <Box sx={{display: "flex", alignItems: "center" , gap: "6.5rem"}}>
            <Typography sx={{width: "100%"}}>AI Assistant reminds user after the set idle time</Typography>
            <Slider sx={{width: "43.5rem"}} value={idleReminderTime} onChange={(_, val) => setIdleReminderTime(val)} min={1} max={10} step={1} />
            </Box>
            <Box sx={{ float: 'right', marginTop: '1em' }}>
              <Typography varient="body2" sx={{mb: 1}}>Reminder Message</Typography>
              <TextField sx={{width: "24.8rem"}} fullWidth value={idleReminderMessage} onChange={(e) => setIdleReminderMessage(e.target.value)} />
            </Box>
          </Box>
        )}
      </Box>
        {/* speaker boost section */}
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center" ,}}>
        <Box sx={{flexDirection: "column"}}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 1}}>Speaker Boost</Typography>
        <Typography variant="body2" color="textSecondary">
            Amplifies the voice's likeness to the original speaker, which can slightly slow down the response time.
          </Typography>
          </Box>
        <Switch checked={speakerBoost} onChange={() => setSpeakerBoost(!speakerBoost)} />
      </Box>

      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{flexDirection: "column"}}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 1}}>Limit Call Duration</Typography>
        <Typography variant="body2" color="textSecondary">
            Sets a maximum duration for calls.
          </Typography>
          </Box>
          <Box sx={{flexDirection: "column", width: "24.5rem"}}>
          <Switch sx={{float: "inline-end !important"}} checked={callDuration > 0} onChange={() => setCallDuration(callDuration > 0 ? 0 : 20)} />
        {callDuration > 0 && (
          <Slider value={callDuration} onChange={(_, val) => setCallDuration(val)} min={1} max={60} step={1} />
        )}
          </Box>
      </Box>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{flexDirection: "column"}}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 1}}>Ask for Recording Consent</Typography>
          <Typography variant="body2" color="textSecondary">
            Sets a maximum duration for calls.
          </Typography>
        </Box>
        <Switch checked={recordingConsent} onChange={() => setRecordingConsent(!recordingConsent)} sx={{mb: 3}} />
      </Box>
      <Box sx={{display: "flex", justifyContent: 'end',}}>
      { recordingConsent && (
          <TextField
            sx={{width: "24.8rem"}}
            fullWidth
            value={idleReminderMessage}
            onChange={(e) => setIdleReminderMessage(e.target.value)}
            label="Idle Reminder Message"
            variant="outlined"
          />
        )}
        </Box>

      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{flexDirection: "column"}}>
      <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 1}}>Enable Recordings</Typography>
      <Typography variant="body2" color="textSecondary">
            Toggle to record calls for playback and easy review in the logs.
          </Typography>
          </Box>
        <Switch checked={recordings} onChange={() => setRecordings(!recordings)} />
      </Box>

      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box sx={{flexDirection: "column"}}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 1}}>Enable Transcripts</Typography>
        <Typography variant="body2" color="textSecondary">
            Toggle to record calls for playback and easy review in the logs.
          </Typography>
          </Box>
        <Switch checked={transcripts} onChange={() => setTranscripts(!transcripts)} />
      </Box>
    </Box>
  );
};

export default CallConfiguration;
