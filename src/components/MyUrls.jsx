import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import NavBar from "./Navbar";

export default function MyUrls() {
  const [key, setKey] = useState("");
  const [btnHidden, setBtnHidden] = useState(true);
  const [urlList, setUrlList] = useState([]);
  const [urlBoxList, setUrlBoxList] = useState([]);
  const [displayBox, setDisplayBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const url = "https://urlshortner-be.herokuapp.com";

  useEffect(() => {
    if (key.length > 0) {
      setBtnHidden(false);
    } else {
      setBtnHidden(true);
    }
  }, [key]);

  const getListOfURLS = () => {
    setLoading(true);
    fetch(`${url}/listByKey/${key}`)
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((data) => {
        if (data[0].message) setUrlList([]);
        else setUrlList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUrls = (shortUrl) => {
    setLoading(true);
    fetch(`${url}/deleteurl`, {
      method: "DELETE",
      body: JSON.stringify({
        key: key,
        url: shortUrl,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        setLoading(false);
        getListOfURLS();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UrlBox = (props) => {
    return (
      <div className=" mt-3 ms-3 me-3" style={{ backgroundColor: "#F1F3F4" }}>
        <label htmlFor="longurl" className="form-label ms-3 mt-3">
          long Url :
        </label>
        <input
          id={props.shortUrl}
          className="form-control ms-4"
          style={{ width: "50%" }}
          value={props.longUrl}
          readOnly
        ></input>
        <label htmlFor="shorturl" className="form-label ms-3 mt-2">
          short Url :
        </label>
        <input
          id={props.shortUrl + "abc"}
          className="form-control ms-4"
          style={{ width: "30%" }}
          value={props.shortUrl}
          readOnly
        ></input>
        <button
          className="btn btn-danger ms-4 mt-3 mb-2"
          onClick={() => deleteUrls(props.shortUrl)}
        >
          Delete
        </button>
      </div>
    );
  };

  useEffect(() => {
    var urlBoxArray = [];
    for (const v of urlList) {
      urlBoxArray.push(
        <UrlBox
          longUrl={v.longUrl}
          shortUrl={v.shortUrl}
          key={v.shortUrl}
        ></UrlBox>
      );
    }
    setUrlBoxList([...urlBoxArray]);
  }, [urlList]);

  return (
    <div>
      <NavBar />
      <div className="mt-4">
        <label
          htmlFor="userkey"
          className="form-label ms-3"
          style={{ display: "inline" }}
        >
          Key :
        </label>
        <input
          id="userkey"
          className="form-control ms-4"
          style={{ width: "10%", display: "inline" }}
          onChange={(e) => setKey(e.target.value)}
        ></input>
        <button
          className="btn btn-success ms-5 mb-1"
          disabled={btnHidden}
          onClick={() => {
            setDisplayBox(true);
            setUrlList([]);
            getListOfURLS();
          }}
        >
          Search
        </button>
      </div>
      {loading ? (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={80}
          width={50}
          timeout={5000}
          className="ms-4"
        />
      ) : displayBox ? (
        urlList.length > 0 ? (
          urlBoxList
        ) : (
          <p className="ms-3 mt-3" style={{}}>
            No URL's associated with this key.
          </p>
        )
      ) : (
        <p></p>
      )}
    </div>
  );
}
