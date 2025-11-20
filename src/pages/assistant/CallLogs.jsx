import { useState } from "react";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Grid,
  Select,
  MenuItem,
  Drawer,
  Tabs,
  Tab,
  Button
} from "@mui/material";
import { IconChevronUp, IconChevronDown, IconX } from "@tabler/icons-react";

function CallLogRow({ log, onExpand }) {
  return (
    <TableRow>
      <TableCell>
        <IconButton onClick={() => onExpand(log)} size="small">
          <IconChevronUp />
        </IconButton>
      </TableCell>
      <TableCell>{log.recipientName}</TableCell>
      <TableCell>{log.to}</TableCell>
      <TableCell>{log.from}</TableCell>
      <TableCell>{log.status}</TableCell>
    </TableRow>
  );
}

export default function CallLogs({ id }) {
  const [filter, setFilter] = useState("Last month");
  const [selectedLog, setSelectedLog] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  const callLogs = [
    {
      recipientName: "John Doe",
      to: "+123456789",
      from: "+987654321",
      status: "Completed",
      duration: "15",
      notes: "Discussed cloud migration strategies.",
      date: "2025-03-01"
    },
    {
      recipientName: "Jane Smith",
      to: "+111222333",
      from: "+444555666",
      status: "Missed",
      duration: "0",
      notes: "No answer, will retry later.",
      date: "2025-02-15"
    }
  ];

  const filteredLogs = callLogs.filter((log) => {
    const today = new Date();
    const logDate = new Date(log.date);
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);
    return filter === "Last week" ? logDate >= lastWeek : logDate >= lastMonth;
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Call Logs for Assistant {id}
      </Typography>

      <Grid container spacing={2} justifyContent="flex-end" alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="Last week">Last week</MenuItem>
            <MenuItem value="Last month">Last month</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell><b>Recipient Name</b></TableCell>
              <TableCell><b>To</b></TableCell>
              <TableCell><b>From</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.map((log, index) => (
              <CallLogRow key={index} log={log} onExpand={setSelectedLog} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Drawer anchor="right" open={!!selectedLog} onClose={() => setSelectedLog(null)}>
        {selectedLog && (
          <Box sx={{ width: 300, p: 2, position: "relative" }}>
            <IconButton
              onClick={() => setSelectedLog(null)}
              sx={{ position: "absolute", top: 10, right: 10 }}
            >
              <IconX />
            </IconButton>
            <Typography variant="h6" sx={{ textAlign: "center" }}>Call Details</Typography>
            <Tabs
             value={tabIndex}
             onChange={(e, newValue) => setTabIndex(newValue)}
             sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
             <Tab label="Details" sx={{ fontSize: "13px" }} />
             <Tab label="Recording" sx={{ fontSize: "13px" }} />
             <Tab label="Transcription" sx={{ fontSize: "13px" }} />
            </Tabs>


            {tabIndex === 0 && (
              <Box sx={{ p: 2 }}>
                <Typography variant="body2">Recipient: {selectedLog.recipientName}</Typography>
                <Typography variant="body2">To: {selectedLog.to}</Typography>
                <Typography variant="body2">From: {selectedLog.from}</Typography>
                <Typography variant="body2">Status: {selectedLog.status}</Typography>
              </Box>
            )}

            {tabIndex === 1 && (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2, mt: 8 }}>
                <audio controls style={{ width: "100%" }}>
                  <source src="dummy-audio.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 4, backgroundColor: '#1a1a2e', color: '#fff'  }}
                  href="dummy-audio.mp3"
                  download="Recording.mp3"
                >
                  Download Recording
                </Button>
              </Box>
            )}

            {tabIndex === 2 && (
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" sx={{ textAlign: "left" }}><b>Agent:</b> Hi, this is Ella Calling from Dr. Micheal's Clinic. Am I talking to John Doe right now?</Typography>
                <Typography variant="body2" sx={{ textAlign: "right", color: "green" }}><b>John Doe:</b> Yes. It's me, please.</Typography>
              </Box>
            )}
          </Box>
        )}
      </Drawer>
    </Container>
  );
}
