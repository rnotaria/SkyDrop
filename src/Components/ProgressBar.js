import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function ProgressBar({ title, label, value }) {
  console.log(label);
  return (
    <Box width={"80%"}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={value} />
    </Box>
  );
}
