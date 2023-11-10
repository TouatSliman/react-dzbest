import React, { useEffect, useState } from "react";
import instance from "./axios";
import requests from "./requests";
import "./banner.css";
function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(requests.fetchNetflixOriginals);
      const rnd = Math.floor(Math.random() * request.data.results.length - 1);
      setMovie(request.data.results[rnd]);
      return request;
    }
    fetchData();
  }, []);
  /*console.log(movie);*/
  function truncate(str, n) {
    return n < str?.length ? str.substr(0, n - 1) + " . . ." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `URL(
          https://image.tmdb.org/t/p/original${movie?.backdrop_path}
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_content">
        <h1 className="banner_title">
          {movie?.original_name || movie?.name || movie?.title}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner_discription">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner__fadebottom" />
    </header>
  );
}

export default Banner;
