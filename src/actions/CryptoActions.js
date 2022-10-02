import axios from 'axios'

// get trending cryptos
export const getTrendingCrypto = (currency) => async (dispatch) => {
  try {
    dispatch({ type: "TRENDING_CRYPTO_REQUEST" });

    let link = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

    const { data } = await axios.get(link);

    dispatch({
      type: "TRENDING_CRYPTO_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "TRENDING_CRYPTO_FAIL",
      payload: error.response.data.message,
    });
  }
};

// get all cryptos
export const getAllCryptos = (currency) => async (dispatch) => {
  try {
    dispatch({ type: "ALL_CRYPTO_REQUEST" });

    let link

    currency ? link = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false` 
    :
    link = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${localStorage.getItem('currency')}&order=market_cap_desc&per_page=100&page=1&sparkline=false`

    const { data } = await axios.get(link);

    dispatch({
      type: "ALL_CRYPTO_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ALL_CRYPTO_FAIL",
      payload: error.response.data.message,
    });
  }
};

// get single crypto 
export const getSingleCrypto = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SINGLE_CRYPTO_REQUEST" });

    let link = `https://api.coingecko.com/api/v3/coins/${id}`
    const { data } = await axios.get(link);

    dispatch({
      type: "SINGLE_CRYPTO_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "SINGLE_CRYPTO_FAIL",
      payload: error.response.data.message,
    });
  }
};

// get currency
export const getCurrency = () => async (dispatch) => {
  try {
    const config = { headers: { "Apikey": "fef487b3-6324-44a5-8142-214bdeae214d" } };
    let link = `https://api.cloudmersive.com/currency/exchange-rates/list-available`
    const { data } = await axios.post(link, config);
    return data.currencies
  } catch (error) {
    console.log(error)
  }
};
