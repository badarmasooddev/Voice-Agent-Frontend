import React, { useState } from "react";

// @mui
import { Box, Stack, Typography } from "@mui/material";

// @project
import MainCard from "@/components/MainCard";
import Legend from "@/components/third-party/chart/Legend";
import LinearProgressWithLabel from "@/components/progress/LinearProgressWithLabel";

// dummy Data
const totalCalls = 462;
const data = {
  answered: { count: 359, percentage: 77.7, color: "green" },
  missed: { count: 103, percentage: 22.3, color: "orange" },
  busy: { count: 27, percentage: 5.8, color: "gray" }
};

export default function CampaignPerformance() {
  const [visibility, setVisibility] = useState({
    answered: true,
    missed: true,
    busy: true
  });

  const legendItems = Object.keys(data).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    color: data[key].color,
    visible: visibility[key],
    id: key
  }));

  return (
    <MainCard sx={{ width: "35%" }}>
      <Stack sx={{ gap: 3.75 }}>
        <Stack direction="row" sx={{ alignItems: "end", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="h4">Campaigns Performance Overview</Typography>
            <Typography variant="caption" color="grey.700">
              Pick up rate of campaign calls.
            </Typography>
          </Stack>
        </Stack>
        <Legend items={legendItems} onToggle={(id) => setVisibility((prev) => ({ ...prev, [id]: !prev[id] }))} />
      </Stack>
      <Box sx={{ my: 2, position: "relative", height: 10, bgcolor: "lightgray", borderRadius: 5 }}>
        {Object.keys(data).map((key, index) => {
          const width = `${data[key].percentage}%`;
          const left = `${Object.keys(data).slice(0, index).reduce((acc, k) => acc + (visibility[k] ? data[k].percentage : 0), 0)}%`;
          return visibility[key] ? (
            <Box key={key} sx={{ position: "absolute", left, width, height: "100%", bgcolor: data[key].color, borderRadius: index === 0 ? "5px 0 0 5px" : index === Object.keys(data).length - 1 ? "0 5px 5px 0" : "0" }}>
              <Typography
                variant="body2"
                sx={{ position: "absolute",bottom: "-30px", left: "40%", transform: "translateX(-50%)", color: "black" }}
              >
                {data[key].percentage}%
              </Typography>
            </Box>
          ) : null;
        })}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
        <Typography variant="body1" fontWeight="bold">
          Total
        </Typography>
        <Typography variant="body1">{totalCalls}</Typography>
      </Box>
      {Object.keys(data).map((key) =>
        visibility[key] ? (
          <Stack key={key} direction="row" sx={{ justifyContent: "space-between", alignItems: "center", py: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width: 12, height: 12, bgcolor: data[key].color, borderRadius: "50%" }} />
              <Typography variant="body1">{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
            </Stack>
            <Typography variant="body1">{data[key].count}</Typography>
            <Typography variant="body1">{data[key].percentage}%</Typography>
          </Stack>
        ) : null
      )}
    </MainCard>
  );
}
