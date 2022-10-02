// trending crypto reducer
export const TrendingCryptoReducer = (state = { TrendingCrypto: [] }, action) => {
    switch (action.type) {
      case "TRENDING_CRYPTO_REQUEST":
        return {
          loading: true,
          AllCrypto: [],
        };
      case "TRENDING_CRYPTO_SUCCESS":
        return {
          loading: false,
          TrendingCrypto: action.payload,
        };
      case "TRENDING_CRYPTO_FAIL":
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
};

// all cryptos reducer
export const AllCryptosReducer = (state = { AllCryptos: [] }, action) => {
    switch (action.type) {
      case "ALL_CRYPTO_REQUEST":
        return {
          loading: true,
          AllCryptos: [],
        };
      case "ALL_CRYPTO_SUCCESS":
        return {
          loading: false,
          AllCryptos: action.payload,
        };
      case "ALL_CRYPTO_FAIL":
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
};

// single crypto reducer
export const SingleCryptosReducer = (state = { SingleCrypto: {} }, action) => {
  switch (action.type) {
    case "SINGLE_CRYPTO_REQUEST":
      return {
        loading: true,
        SingleCrypto: {},
      };
    case "SINGLE_CRYPTO_SUCCESS":
      return {
        ...state,
        loading: false,
        SingleCrypto: action.payload,
      };
    case "SINGLE_CRYPTO_FAIL":
      return {
        error: null,
        loading: false
      };
    default:
      return state;
  }
};