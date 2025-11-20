import { useState } from "react";
import { Paper, Typography, Box, IconButton, InputAdornment, InputLabel, OutlinedInput, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ApiKeyCard = ({ title, description, fieldName, register, error, defaultValue, showBorder, showContent, ShowPadding }) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <Paper variant="outlined" sx={{ padding: ShowPadding ? 3 : 0, width: "100%", border: showBorder ? "1px solid #E6E8EE;" : "none"  }}>
      <Box sx={{}}>
      {showContent && (
          <>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>{title}</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2}}>
              {description}
            </Typography>
          </>
        )}
        <InputLabel sx={{textAlign: "left"}} htmlFor={fieldName}>{`Enter ${title}`}</InputLabel>
        <OutlinedInput
          fullWidth
          id={fieldName}
          aria-describedby={`outlined-${fieldName}`}
          inputProps={{ 'aria-label': fieldName }}
          placeholder={`Enter ${title}`}
          sx={{ display: "flex" }}
          defaultValue={defaultValue || ""}
          type={showKey ? "text" : "password"}
          {...register(fieldName, { required: `${title} is required` })}
          error={Boolean(error)}
          // endAdornment={
          //   <InputAdornment position="end">
          //     <IconButton onClick={() => setShowKey(!showKey)} edge="end">
          //       {showKey ? <VisibilityOff /> : <Visibility />}
          //     </IconButton>
          //   </InputAdornment>
          // }
        />
        {error && <FormHelperText error>{error.message}</FormHelperText>}
      </Box>
    </Paper>
  );
};

export default ApiKeyCard;
