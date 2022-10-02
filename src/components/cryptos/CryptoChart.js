import axios from "axios";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
// import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import {
    CircularProgress,
    createTheme,
    ThemeProvider
} from "@mui/material";
// import SelectButton from "./SelectButton";
// import { chartDays } from "../config/data";
// import { CryptoState } from "../CryptoContext";

const CryptoChart = ({ coin }) => {

    const chartDays = [
        {
            label: "24 Hours",
            value: 1,
        },
        {
            label: "30 Days",
            value: 30,
        },
        {
            label: "3 Months",
            value: 90,
        },
        {
            label: "1 Year",
            value: 365,
        },
    ];

    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(90);
    //   const { currency } = CryptoState();
    const currency = "inr"

    const fetchHistoricData = async () => {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=90`);

        setHistoricData(data.prices);
    };

    useEffect(() => {
        fetchHistoricData();
    }, [days, currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    let Xdata = []
    let tempYdata = []
    historicData?.map((i) => Xdata.push(new Date(i[0]).getDate()+"/"+new Date(i[0]).getMonth()+"/"+new Date(i[0]).getFullYear()))
    historicData?.map((i) => tempYdata.push(i[1].toString()))
    
    const Ydata = tempYdata.map((e) => e.slice(0, 8))
    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [...Xdata],
            
            labels: {
                style: {
                    colors: "#fff",
                    // marginLeft: "10rem",
                    fontSize: "16px",
                    fontWeight: 800,
                    offsetX: 100
                },
                minHeight: 120,
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#fff"
                }
            }
        },
        stroke: {
            width: [1, 1],
            curve: 'straight'
        },
        dataLabels: {
            enabled: false
        },
        
    }
    const series = [
        {
            name: "series-1",
            data: [...Ydata]
        }
    ]

    return (
        <ThemeProvider theme={darkTheme}>
            <div style={{
                width: "75%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 25,
                padding: 40,
                //   [theme.breakpoints.down("md")]: {
                //     width: "100%",
                //     marginTop: 0,
                //     padding: 20,
                //     paddingTop: 0,
                //   }
            }}>
                {!historicData ? (
                    <CircularProgress
                        style={{ color: "gold" }}
                        size={250}
                        thickness={1}
                    />
                ) : (
                    <>
                        <Chart
                            options={options}
                            series={series}
                            type="line"
                            width="350%"

                        />
                        {/* {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))} */}
                    </>
                )}
            </div>
        </ThemeProvider>
    );
};

export default CryptoChart;