import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider }from "@mui/material/styles";
import UserSidebar from "./UserSidebar";
import AuthModal from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import currencySymbol from 'currency-symbol';

const data = require("./Currency.json")
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    }
  });

function Header() {

    const dispatch = useDispatch()
    const [currency, setCurrency] = useState("INR")
    const { user, isAuthenticated } = useSelector((state) => state.user);

    const navigate = useNavigate();

    
    const handleChange = (e) => {
      setCurrency(e.target.value)
      localStorage.setItem('currency', e.target.value.slice(0, 3))
      localStorage.setItem('symbol', e.target.value.slice(3))
      window.location.reload()
    }
    // console.log(currency)

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar sx={{backgroundColor: "#304ffe"}} position="static">
                <Container>
                    <Toolbar>
                        <Typography
                            onClick={() => navigate(`/`)}
                            variant="h6"
                            sx={{
                                flex: 1,
                                color: "gold",
                                fontFamily: "Roboto",
                                fontWeight: "bold",
                                cursor: "pointer",
                                fontSize: "2rem"
                              }}
                        >
                            Cryptologist 
                        </Typography>
                        <Select
                            variant="outlined"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currency}
                            sx={{ width: 130, height: 40, marginLeft: 15, color: "white" }}
                            onChange={handleChange}
                            placeholder="Choose currency"
                            >
                            {
                              Object.values(data)[0]?.map((e) => {
                                return <MenuItem value={e.ISOCurrencyCode + e.CurrencySymbol}>{e.ISOCurrencyCode}&nbsp;&nbsp;{e.CurrencySymbol}</MenuItem>
                              })
                            }
                        </Select>
                        {isAuthenticated ? <UserSidebar /> : <AuthModal />}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default Header;