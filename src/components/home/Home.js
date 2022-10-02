import React from 'react'
import AllCryptos from '../cryptos/AllCryptos'
import Banner from './Banner'

const Home = ({currency, symbol}) => {

  return (
   <React.Fragment>
    <Banner currency={currency} symbol={symbol}/>
    <AllCryptos currency={currency} symbol={symbol}/>
   </React.Fragment>
  )
}

export default Home