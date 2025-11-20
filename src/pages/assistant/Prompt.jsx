import { useState } from "react";
import { Box, Container, Card, CardContent, CardHeader, TextField, Button } from "@mui/material";

export default function PromptSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState("Hey there!");
  const [promptText, setPromptText] = useState(
    "CloudInnovate - Outbound Sales Call Script\n\n" +
      "BACKGROUND INFO:\n\n" +
      "Introduction: You are Jordan, a Senior Sales Representative at CloudInnovate, focusing on businesses " +
      "interested in enhancing their project management with cloud-based solutions. Your mission is to introduce " +
      "them to CloudInnovate’s comprehensive suite designed to improve collaboration, efficiency, and project tracking.\n\n" +
      "Product Information: CloudInnovate offers an array of tools encompassing task management, time tracking, " +
      "resource allocation, and analytics. It's celebrated for its intuitive interface, seamless integrations, and stellar " +
      "customer support.\n\n" +
      "Target Audience: Businesses leveraging substantial cloud infrastructure aiming to refine their project management " +
      "practices.\n\n" +
      "Value Proposition: CloudInnovate aids in optimizing cloud operations, achieving cost savings, and boosting performance."
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", maxHeight: "100vh", p: 3 }}>
      <Container maxWidth="lg">
        <Card sx={{ p: 2, boxShadow: 5, borderRadius: 3, minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <CardHeader title="Prompt" sx={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }} />
          <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Greeting Message"
              variant="outlined"
              fullWidth
              value={greetingMessage}
              onChange={(e) => setGreetingMessage(e.target.value)}
              disabled={!isEditing}
            />
            <TextField
              label="Prompt"
              variant="outlined"
              fullWidth
              multiline
              rows={12}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              disabled={!isEditing}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "auto" }}>
              {isEditing ? (
                <Button variant="contained" color="primary" onClick={() => setIsEditing(false)} sx={{ px: 4, py: 1 }}>
                  Save
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} sx={{ px: 4, py: 1, backgroundColor: '#1a1a2e', color: '#fff' }}>
                  Edit
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}