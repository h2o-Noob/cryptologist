import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import Home from "./components/home/Home"
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/UserActions";
import SingleCrypto from "./components/cryptos/SingleCrypto";
import WebFont from "webfontloader";

function App() {

  useEffect(() => {
      WebFont.load({
        google: {
          families: ["Roboto", "Droid Sans", "Baloo 2"],
        },
      })
    store.dispatch(loadUser());
  }, []);

  let currency = "INR"
    let symbol = "₹"
    if(localStorage.getItem('currency')){
        currency = localStorage.getItem('currency')
    }
    if(localStorage.getItem('symbol')){
        symbol = localStorage.getItem('symbol')
    }

  return (
    <BrowserRouter>
      <Header />
      <div style={{
        backgroundColor: "#36454F",
        color: "white",
        minHeight: "100vh",
      }}>
        <Routes>
          <Route exact path="/" element={<Home  currency={currency} symbol={symbol}/>} />
          <Route exact path="/coins/:id" element={<SingleCrypto currency={currency} symbol={symbol}/>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
