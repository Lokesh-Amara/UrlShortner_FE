import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import NavBar from "./Navbar";

export default function Home() {
  const [key, setKey] = useState("default");
  const [longUrl, setLongUrl] = useState("");
  const [btnHidden, setBtnHidden] = useState(true);
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const url = "https://urlshortner-be.herokuapp.com";

  useEffect(() => {
    if (longUrl.length > 0) {
      setBtnHidden(false);
    } else {
      setBtnHidden(true);
    }
  }, [longUrl]);

  const convertUrl = () => {
    setLoading(true);
    fetch(`${url}/shorturl`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userkey: key,
        url: longUrl,
      }),
    })
      .then((res) => {
        setLoading(false);
        return res.text();
      })
      .then((data) => setShortUrl(data))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="container ">
        <div className="row mt-3">
          <div className="col-4"></div>
          <div className="col-4  " style={{ backgroundColor: "#F1F3F4" }}>
            <div className=" mt-3 mb-3">
              <label className="form-label " htmlFor="userkey">
                Key :
              </label>
              <input
                type="text"
                id="userkey"
                className="form-control "
                placeholder="(optional)"
                onChange={(e) => setKey(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="longurl" className="form-label">
                URL :
              </label>
              <input
                type="url"
                className="form-control"
                id="longurl"
                required
                onChange={(e) => setLongUrl(e.target.value)}
              />
            </div>
            <button
              className="btn btn-success mb-3"
              disabled={btnHidden}
              onClick={convertUrl}
            >
              Convert
            </button>
            {loading ? (
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={80}
                width={50}
                timeout={5000}
                className="ms-4"
              />
            ) : (
              shortUrl.length > 0 && (
                <div className="mb-3">
                  <label htmlFor="longurl" className="form-label">
                    Shrot URL :
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="longurl"
                    value={shortUrl}
                    readOnly
                  />
                </div>
              )
            )}
          </div>
          <div className="col-4 "></div>
        </div>
      </div>
    </div>
  );
}
