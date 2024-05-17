import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h2">Welcome to Hypercare</Typography>
      <Typography variant="subtitle1">
        Connect with your healthcare colleagues through real-time scheduling,
        on-call management, and secure messaging on any device.
      </Typography>
    </Container>
  );
}
