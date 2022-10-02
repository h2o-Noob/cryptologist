import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllCryptos } from '../../actions/CryptoActions';
import { Container } from '@mui/system';
import { createTheme, LinearProgress, Pagination, TextField, ThemeProvider, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blue, grey } from '@mui/material/colors';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function AllCryptos({currency, symbol}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { AllCryptos, loading } = useSelector((state) => state.allCrypto)

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  console.log(currency)
  useEffect(() => {
    if(currency){
      dispatch(getAllCryptos(currency))
    }
  }, [])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#304ffe"
      },
      type: "dark",
    },
  });

  const rows = ["Coin", "Price", "24h Change", "Market Cap"]

  const handleSearch = () => {
    return AllCryptos.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Roboto" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          // sx={{fontColor: "white"}}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper} sx={{ textAlign: "center", backgroundColor: 'black' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#304ffe"}}>
                {rows.map((item) => {
                  return <TableCell sx={{ fontSize: "1.3rem", color: "white"}}>{item}</TableCell>
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      key={row.name}
                      onClick={() => navigate(`/coins/${row.id}`)}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                    >
                      <TableCell component="th" scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                          color: "white",
                          fontSize: "0.8rem"
                        }}>
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <Typography>
                        <Typography sx={{
                          fontSize: "1.5rem"
                        }}>{row.symbol.toUpperCase()}</Typography>
                        <Typography sx={{
                          fontSize: "0.8rem",
                          color: "#6b6b6b"
                        }}>{row.name}</Typography>
                        </Typography>
                        
                      </TableCell>
                      <TableCell sx={{ fontSize: "1rem", color: "white" }} align="left">{symbol}{row.current_price}</TableCell>
                      {profit ? 
                      <TableCell sx={{ fontSize: "1rem", color: "green" }} align="left">+{row.price_change_percentage_24h.toString().slice(0, 6)}%</TableCell>
                      :
                      <TableCell sx={{ fontSize: "1rem", color: "red" }} align="left">{row.price_change_percentage_24h.toString().slice(0, 6)}%</TableCell>
                    }
                      <TableCell sx={{ fontSize: "1rem", color: "white" }} align="left">{symbol}{numberWithCommas(row.market_cap.toString().slice(0, 8))}M</TableCell>
                    </TableRow>
                  )
                }
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={parseInt((handleSearch()?.length / 10).toFixed(0))}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
          // color="#304ffe"
          color="secondary"
          // classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
