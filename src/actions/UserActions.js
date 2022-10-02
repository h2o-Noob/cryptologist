import axios from 'axios'
import Web3 from 'web3';

// signup
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: "REGISTER_USER_REQUEST" });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`https://cryptologist.herokuapp.com/api/register`, {name, email, password}, config);


        dispatch({ type: "REGISTER_USER_SUCCESS", payload: data.user });
    } catch (error) {
        dispatch({
            type: "REGISTER_USER_FAIL",
            payload: error.response.data.error,
        });
    }
};

// login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_REQUEST" });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `https://cryptologist.herokuapp.com/api/login`,
            { email, password },
            config
        );

        localStorage.setItem("userId", data.user._id)
        localStorage.setItem("token", data.token)

        dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
    } catch (error) {
        dispatch({ type: "LOGIN_FAIL", payload: error.response.data.error });
    }
};

// metamask login 
export const metaMaskLogin = () => async (dispatch) => {
    try {
        dispatch({ type: "META_LOGIN_REQUEST" });

        const detectCurrentProvider = () => {
            let provider;
            if (window.ethereum) {
                provider = window.ethereum;
            } else if (window.web3) {
                provider = window.web3.currentProvider;
            } else {
                alert("Non-ethereum browser detected. You should install Metamask");
            }
            return provider;
        };

        const onConnect = async () => {
            try {
                const currentProvider = detectCurrentProvider();
                if (currentProvider) {

                    await currentProvider.request({ method: 'eth_requestAccounts' });
                    const web3 = new Web3(currentProvider);
                    const userAccount = await web3.eth.getAccounts();
                    const account = userAccount[0]; 

                    localStorage.setItem("metaId", account)
                    dispatch({ type: "META_LOGIN_SUCCESS", payload: account});

                }
            } catch (err) {
                console.log(err);
            }
        }
        onConnect()
    } catch (error) {
        dispatch({ type: "META_LOGIN_FAIL", payload: error.response.data.error });
    }
};

//load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LOAD_USER_REQUEST" });

        const config = { headers: { "Content-Type": "application/json" } };

        if(localStorage.getItem('metaId')){
            dispatch({ type: "LOAD_USER_SUCCESS" , payload: localStorage.getItem('metaId')})
            return
        }
        const id = localStorage.getItem('userId') 
        const { data } = await axios.post(
            `https://cryptologist.herokuapp.com/api/me`,
            { id },
            config
        );
        data.user ? dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user }) : dispatch({ type: "LOAD_USER_FAIL", payload: "user not logged in" })
    } catch (error) {
        dispatch({ type: "LOAD_USER_FAIL", payload: error.response.data.error });
    }
};

// logout user 
export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_USER_REQUEST" });

        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        localStorage.removeItem('metaId')


        dispatch({ type: "LOGOUT_USER_SUCCESS" });
        window.location.reload()
        // dispatch({ type: "LOAD_USER_SUCCESS" });
    } catch (error) {
        dispatch({ type: "LOAD_USER_FAIL", payload: error.response.data.error });
    }
};