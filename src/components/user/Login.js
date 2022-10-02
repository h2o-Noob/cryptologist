import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { login, metaMaskLogin } from "../../actions/UserActions";

const Login = ({ handleClose }) => {

  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async () => {
    if (!email || !password) {
    //   setAlert({
    //     open: true,
    //     message: "Please fill all the Fields",
    //     type: "error",
    //   });
      return;
    }
    dispatch(login(email, password))
    // window.location.reload()
  };

  const handleMeta = async () => {
    dispatch(metaMaskLogin())
    handleClose()
    // window.location.reload()
  }

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        // style={{color: "white"}}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        // style={{color: "white"}}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: "#EEBC1D" }}
      >
        Login
      </Button>

      <Button
        variant="contained"
        size="large"
        onClick={handleMeta}
        style={{ backgroundColor: "#EEBC1D" }}
      >
        sign in with MetaMask
      </Button>
    </Box>
  );
};

export default Login;