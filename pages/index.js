import { useState, useEffect } from "react";
import Seo from "../components/Seo";

export default function Home({ results }) {
  return (
    <div className="container">
      <Seo title="Home" />
      {!results && <h4>Loading...</h4>}
      {results?.map((movie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

// 이 코드는 server 쪽에서 동작함.
// API Key를 숨길 수 있다. 여기서 반환한 props는 _app.js의 pageProps로 간다.
// page가 보여지기전에 데이터를 가지고 올 수 있다.
export async function getServerSideProps() {
  const { results } = await (
    await fetch("http://localhost:3000/api/movies")
  ).json();

  return {
    props: {
      results,
    },
  };
}
