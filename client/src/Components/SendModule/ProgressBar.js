import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function ProgressBar({ title, label, value }) {
  var barColor = "primary";

  if (value > 100) {
    value = 100;
    barColor = "error";
  }

  return (
    <Box width="80%" marginBottom="4px" style={{ userSelect: "none" }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={value} color={barColor} />
    </Box>
  );
}
