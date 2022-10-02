import React, { useEffect, useState } from 'react'
import './Carousel.css'
import AliceCarousel from "react-alice-carousel";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingCrypto } from '../../actions/CryptoActions'

const Carousel = ({currency, symbol}) => {

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const dispatch = useDispatch()

    console.log(currency)
    const { TrendingCrypto } = useSelector((state) => state.trendingCrypto)
    
    useEffect(() => {
        dispatch(getTrendingCrypto(currency))
    }, [currency])
    
    const items = TrendingCrypto?.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;

        return (
            <Link className="carouselItem" to={`/coins/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });
    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <div className="carousel">
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
                autoPlay
            />
        </div>
    )
}

export default Carousel