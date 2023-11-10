import React, { useEffect, useState } from "react";
import instance from "./axios";
import movieTrailer from 'movie-trailer';
import "./Row.css";
import YouTube from 'react-youtube';
const base_url = "https://image.tmdb.org/t/p/original/";
const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  const opts ={
    hight:"390",
    width:"100%",
    playerVars:{

      autoplay:1,
    }
  }
  
  /*console.table(movies);*/
  const handleClick = (movie)=>{
    if(trailerUrl){
      setTrailerUrl('');
    }else{
      movieTrailer(movie?.name || "").then(url =>{
          const urlParams = new URLSearchParams( new URL(url).search );
          setTrailerUrl(urlParams.get("v"));
      }).catch(error => console.log(error))
    }
  }
  return (
    <div className="row">
      <h3>{title}</h3>
      <div className="row__posters">
        {}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={()=>handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
};

export default Row;
