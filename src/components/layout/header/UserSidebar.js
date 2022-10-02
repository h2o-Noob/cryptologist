import React, { useState } from "react";
import { Drawer, Avatar, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/UserActions";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from "react";
import { numberWithCommas } from "../../cryptos/AllCryptos";
import { getAllCryptos } from "../../../actions/CryptoActions";

export default function UserSidebar() {

  const dispatch = useDispatch()
  // const storage = JSON.parse(localStorage.getItem('Watchlist'))
  const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem('Watchlist')))
  const [state, setState] = useState({
    right: false,
  });
  const [url, setUrl] = useState("")

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { AllCryptos, loading } = useSelector((state) => state.allCrypto)


  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  console.log(AllCryptos)
  console.log(watchList)

  useEffect(() => {
    dispatch(getAllCryptos())
    if (user?.avatar) {
      setUrl(user.avatar.url)
    }
  }, [user])
  const logOut = () => {

    dispatch(logout())

    toggleDrawer();
  };
  const removeFromWatchlist = async (coin) => {
    let arr = [...watchList]

    const newArr = arr.filter(e => e !== coin.id)
    
    localStorage.setItem('Watchlist', JSON.stringify(newArr))
    window.location.reload();
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {user ? <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={url}
            alt={user.name || user.email}
          /> : null}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div style={{
              width: 350,
              padding: 25,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              fontFamily: "monospace",
              backgroundColor: "#36454F"
            }}>
              <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                height: "92%",
              }}>
                {user ? <Avatar
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    height: "92%",
                    width: "100%"
                  }}
                  src={url}
                  alt={user.name || user.email}
                /> : null}
                {user ? <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.name || user.email}
                </span> : 
                <Typography>Login with mail to display name</Typography>
                }
                <div style={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: "grey",
                  borderRadius: 10,
                  padding: 15,
                  paddingTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  overflowY: "scroll",
                }}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {AllCryptos.map((coin) => {
                    if (watchList?.includes(coin.id))
                      return (
                        <div style={{
                          padding: 10,
                          borderRadius: 5,
                          color: "black",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#EEBC1D",
                          boxShadow: "0 0 3px black",
                        }}>

                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {/* {symbol}{" "} */}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <DeleteIcon
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}

                </div>
              </div>
              <Button
                variant="contained"
                sx={{
                  height: "8%",
                  width: "100%",
                  backgroundColor: "#EEBC1D",
                  marginTop: 20,
                }}
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))
      }
    </div >
  );
}