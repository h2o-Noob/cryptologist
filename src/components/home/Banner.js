import { Typography } from '@mui/material'
import React from 'react'
import './Banner.css'
import Carousel from './Carousel'

const Banner = ({currency, symbol}) => {

    return (
        <div className="banner">
            <div className="bannerMain">
                <div className="bannerHeading">
                    <Typography
                        variant="h1"
                        style={{
                            fontWeight: "700",
                            marginBottom: 15,
                            fontFamily: "Roboto",
                        }}
                    >
                        Cryptologist
                    </Typography>
                    <Typography
                        variant="h4"
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Roboto",
                        }}
                    >
                        The crypto doctor
                    </Typography>

                </div>
            </div>
            <Carousel currency={currency} symbol={symbol} />
        </div>
    )
}

export default Banner