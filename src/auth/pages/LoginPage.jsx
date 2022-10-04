import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { chekingAuthentication, startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth";
import { useMemo } from "react";

export const LoginPage = () => {
  const { status, errorMessage }  = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });

  const isAuthenticating = useMemo(() => status === 'cheking', [status])

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({email, password}))
  };
  const onGoogleSingIn = ()=>{
    dispatch(startGoogleSingIn())
  }
  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} display={!!errorMessage ? "" : "none"} sx={{mt: 1 }}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" 
              disabled = {isAuthenticating}
              fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" 
              disabled = {isAuthenticating}
              fullWidth
              onClick={onGoogleSingIn}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
