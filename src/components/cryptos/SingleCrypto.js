import {
    Typography, Button,
    LinearProgress,
} from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToWatchlist, getSingleCrypto } from "../../actions/CryptoActions";

import { numberWithCommas } from "./AllCryptos";
import CryptoChart from "./CryptoChart";

const CoinPage = ({currency, symbol}) => {

    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [coin, setCoin] = useState();
    const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem('Watchlist')))

    const { user, isAuthenticated } = useSelector((state) => state.user)

    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
            setCoin(data)
        }
        fetchData();
    }, [])

    var inWatchlist = watchList?.includes(coin?.id);

    const addToWatchlist = () => {
        let arr = []

        if (!watchList) {
            arr.push(id)
        }
        else {
            arr = [...watchList]
            arr.push(id)
        }

        let uniqueArr = arr.filter((c, index) => {
            return arr.indexOf(c) === index;
        });
        localStorage.setItem('Watchlist', JSON.stringify(uniqueArr))
        window.location.reload();
    }

    return (
        <Fragment>
            {coin ? (
                <div style={{
                    display: "flex",
                }}>
                    <div style={{
                        width: "30%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: 25,
                        borderRight: "2px solid grey",
                    }}>
                        {coin.image ? <img
                            src={coin?.image.large}
                            alt={coin?.name}
                            height="200"
                            style={{ marginBottom: 20 }}
                        /> : null}
                        <Typography variant="h3" style={{
                            marginBottom: 20,
                            fontFamily: "roboto",
                        }}>
                            {coin?.name}
                        </Typography>
                        <Typography variant="subtitle1" style={{
                            width: "100%",
                            fontFamily: "roboto",
                            padding: 25,
                            paddingBottom: 15,
                            paddingTop: 0,
                            textAlign: "justify",
                        }}>
                        </Typography>
                        <div style={{
                            alignSelf: "start",
                            padding: 25,
                            paddingTop: 10,
                            width: "100%",
                        }}>
                            <span style={{ display: "flex" }}>
                                <Typography variant="h5" style={{
                                    fontWeight: "bold",
                                    marginBottom: 20,
                                    fontFamily: "roboto"
                                }}>
                                    Rank:
                                </Typography>
                                &nbsp; &nbsp;
                                <Typography
                                    variant="h5"
                                    style={{
                                        fontWeight: "light",
                                        fontFamily: "roboto"
                                    }}
                                >
                                    {numberWithCommas(coin?.market_cap_rank)}
                                </Typography>
                            </span>
                            <span style={{ display: "flex" }}>
                                <Typography variant="h5" style={{
                                    fontWeight: "bold",
                                    marginBottom: 20,
                                    fontFamily: "roboto"
                                }}>
                                    Current Price:
                                </Typography>
                                &nbsp; &nbsp;
                                <Typography
                                    variant="h5"
                                    style={{
                                        fontFamily: "roboto"
                                    }}
                                >
                                    {symbol}{" "}
                                    {numberWithCommas(
                                        coin?.market_data.current_price[currency.toLowerCase()]
                                    )}
                                </Typography>
                            </span>
                            <span style={{ display: "flex" }}>
                                <Typography variant="h5" style={{
                                    fontWeight: "bold",
                                    marginBottom: 20,
                                    fontFamily: "roboto"
                                }}>
                                    Market Cap:
                                </Typography>
                                &nbsp; &nbsp;
                                <Typography
                                    variant="h5"
                                    style={{
                                        fontFamily: "roboto"
                                    }}
                                >
                                    {symbol}{" "}
                                    {numberWithCommas(
                                           coin?.market_data.market_cap[currency.toLowerCase()]                                            
                                            .toString()
                                            .slice(0, -6)
                                    )}
                                </Typography>
                            </span>
                            {!isAuthenticated || inWatchlist ? (
                                null
                            ) : (
                                <Button
                                    variant="outlined"
                                    style={{
                                        width: "80%",
                                        height: 40,
                                        backgroundColor: "#304ffe",
                                        color: "white",
                                        fontFamily: "roboto"
                                    }}
                                    onClick={addToWatchlist}
                                >
                                add to watch list
                                </Button>
                            )}
                        </div>
                    </div>
                    <CryptoChart coin={coin} />
                </div>
            ) : (
                <LinearProgress style={{ backgroundColor: "gold" }} />
            )}
        </Fragment>
    );
};

export default CoinPage;