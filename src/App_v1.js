import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const ApiKey = "5cd151cc";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoaing] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState("Loading...");
  const [query, setQuery] = useState("inception");
  const [selectedId, setSelectedId] = useState("");

  // fetch(`http://www.omdbapi.com/?apikey=${ApiKey}&s=${query}`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.Search));

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoaing(true);
          if (query.length < 3) {
            setLoaderMessage("");
            return;
          }
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${ApiKey}&s=${query}`
          );

          if (!response.ok) {
            throw new Error("Movie Not Found");
          }
          const data = await response.json();
          // console.log(data.Response);
          if (data.Response === "False") throw new Error("Movie Not Found !");
          setMovies(data.Search);
          // console.log(data.Search);
          // console.log(movies);
          setIsLoaing(false);
        } catch (err) {
          // console.log(err.message);
          setLoaderMessage(err.message);
        }
      }
      fetchMovies();
    },
    [query]
  );
  // console.log(movies);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResult movie={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader loaderMessage={loaderMessage} />
          ) : (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
        </Box>
        {/* <WatchedBox /> */}
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCLoseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader({ loaderMessage }) {
  return (
    <div className="loader">
      <h2>{loaderMessage}</h2>
    </div>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      {/* <Logo />
      <SearchBar /> */}
      {/* <NumResult /> */}
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function SearchBar({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResult({ movie }) {
  return (
    <p className="num-results">
      Found <strong>{movie.length}</strong> results
    </p>
  );
}

function MovieDetails({ selectedId, onCLoseMovie }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [movieRating, setMovieRating] = useState(0);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: realeased,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // console.log(title, year, realeased);
  // console.log(movie);
  useEffect(
    function () {
      async function getMovieDetail() {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${ApiKey}&i=${selectedId}`
        );
        const data = await response.json();
        // console.log(data);
        setMovie(data);
        setIsLoading(false);
      }

      getMovieDetail();
    },
    [selectedId]
  );
  return (
    <div>
      {isLoading ? (
        <Loader loaderMessage={"Loading..."} />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCLoseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`}></img>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {realeased} &bull;{runtime}
              </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxRating={10} size={26} onSet={setMovieRating} />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
          {/* {selectedId} */}
        </div>
      )}
    </div>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

// function ListBox({ children }) {
//   const [isOpen1, setIsOpen1] = useState(true);
//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen1((open) => !open)}
//       >
//         {isOpen1 ? "–" : "+"}
//       </button>
//       {isOpen1 && children}
//     </div>
//   );
// }
function MovieList({ movies, onSelectMovie, selectedId, onCLoseMovie }) {
  // const [movies, setMovies] = useState(tempMovieData);
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onSelectMovie={onSelectMovie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  // function handleClick(id) {
  //   // if (selectedId === null) {
  //   //   onSelectMovie(id);
  //   // } else if (selectedId === id) {
  //   //   onCLoseMovie();
  //   // } else {
  //   //   onSelectMovie(id);
  //   // }
  //   if (selectedId === id) {
  //     onCLoseMovie();
  //   } else {
  //     onSelectMovie(id);
  //   }
  // }
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
          <span></span>
        </p>
      </div>
    </li>
  );
}

// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);
//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           {" "}
//           <Summary watched={watched} />
//           <WatchedMovieList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {
        isOpen && children
        // <>
        //   {" "}
        //   <Summary watched={watched} />
        //   <WatchedMovieList watched={watched} />
        // </>
      }
    </div>
  );
}
function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
