import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { useTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useMutation } from "@tanstack/react-query";
import {loginUser} from "@/api/authApi";

// Third-party
import { useForm } from "react-hook-form";

// Project
import { APP_DEFAULT_PATH, AUTH_USER_KEY } from "@/config";
import { emailSchema, passwordSchema } from "@/utils/validationSchema";
import useLocalStorage from "@/hooks/useLocalStorage";

// Icons
import { IconEye, IconEyeOff } from "@tabler/icons-react";

// Mock user credentials
const userCredentials = [
  { title: "Admin", email: "Test@mail.com", password: "$Testing1" },
  // { title: "Admin", email: "admin@trixlyai.com", password: "Admin@123" },
  // { title: "User", email: "user@trixlyai.com", password: "User@123" }
];

/***************************  AUTH - LOGIN  ***************************/

export default function AuthLogin({ inputSx }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState("");

    // Use the useLocalStorage hook
    const [authUser, setAuthUser] = useLocalStorage(AUTH_USER_KEY, null);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: { email: "Test@mail.com", password: "$Testing1" } });

  // Handle form submission
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data));
      navigate(APP_DEFAULT_PATH);
    },
    onError: (error) => {
      setLoginError(error.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (formData) => {
    setLoginError("");
    mutation.mutate(formData);
  };


  const commonIconProps = { size: 16, color: theme.palette.grey[700] };

  return (
    <>
      <Stack direction="row" sx={{ gap: 1, mb: 2 }}>
        {userCredentials.map((credential) => (
          <Button
            key={credential.title}
            variant="outlined"
            color="secondary"
            sx={{ flex: 1 }}
            onClick={() => reset({ email: credential.email, password: credential.password })}
          >
            {credential.title}
          </Button>
        ))}
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <Box>
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              {...register("email", emailSchema)}
              placeholder="info@trixlyai.com"
              fullWidth
              error={Boolean(errors.email)}
              sx={inputSx}
            />
            {errors.email?.message && <FormHelperText error>{errors.email.message}</FormHelperText>}
          </Box>

          <Box>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              {...register("password", passwordSchema)}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your password"
              fullWidth
              error={Boolean(errors.password)}
              endAdornment={
                <InputAdornment
                  position="end"
                  sx={{ cursor: "pointer", WebkitTapHighlightColor: "transparent" }}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <IconEye {...commonIconProps} /> : <IconEyeOff {...commonIconProps} />}
                </InputAdornment>
              }
              sx={inputSx}
            />
            <Stack direction="row" alignItems="center" justifyContent={errors.password ? "space-between" : "flex-end"} width={1}>
              {errors.password?.message && <FormHelperText error>{errors.password.message}</FormHelperText>}
              <Link
                to="/forgot-password"
                component="a"
                underline="hover"
                variant="caption"
                style={{ color: "inherit", textDecoration: "none", fontWeight: "bold", marginTop: "6px" }}
              >
                Forgot Password?
              </Link>
            </Stack>
          </Box>
        </Stack>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={mutation.isPending}
          endIcon={mutation.isPending && <CircularProgress color="secondary" size={16} />}
          sx={{ minWidth: 120, mt: { xs: 1, sm: 4 }, "& .MuiButton-endIcon": { ml: 1 } }}
        >
          Sign In
        </Button>

        {loginError && (
          <Alert sx={{ mt: 2 }} severity="error" variant="filled" icon={false}>
            {loginError}
          </Alert>
        )}
      </form>
    </>
  );
}

AuthLogin.propTypes = { inputSx: PropTypes.any };
