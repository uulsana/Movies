const form = document.querySelector("form");
const search = document.querySelector(".header__search");
const moviesList = document.querySelector(".movies");
const moviesFav = document.querySelector(".moviesFav");

const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_TOP100 =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const API_URL_ID = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

getMovies(API_URL_TOP100);

let movieData, favMovie;

const favorites = localStorage.getItem("movies")
  ? JSON.parse(localStorage.getItem("movies"))
  : [];

async function getMovies(url) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  movieData = await response.json();
  showMovies(movieData);
  favMovie = await favorites.map((id) => {
    return movieData.films.find((movie) => movie.filmId === id);
  });
  showFavs(favMovie);
}

function showMovies(data) {
  data.films.forEach((movie) => {
    const movieList = document.createElement("div");
    movieList.classList.add("movie");
    localStorage;
    movieList.innerHTML = `
        <div class="movie__cover-inner">
        <img src="${movie.posterUrlPreview}" alt="${
      movie.nameRu
    }" class="movie_cover">
      <div class="movie__cover--darkened"></div>
    </div>
    <div class="movie__info">
    <div class="movie__title">${movie.nameRu}</div>
    <div class="movie__category">${movie.genres.map(
      (genre) => ` ${genre.genre}`
    )}</div>
          <div class="movie__average movie__average--${getClassByRate(
            movie.rating
          )}">${movie.rating}</div>
        <button onclick="addToFavorite(${movie.filmId})"
        
         class="favorite__btn">Добавить в избранное</button>
    </div>
        `;

    moviesList?.appendChild(movieList);
  });
}
function showFavs(data) {
  data.forEach((movie) => {
    const movieList = document.createElement("div");
    movieList.classList.add("movie");
    localStorage;
    movieList.innerHTML = `
          <div class="movie__cover-inner">
          <img src="${movie.posterUrlPreview}" alt="${
      movie.nameRu
    }" class="movie_cover">
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
      <div class="movie__title">${movie.nameRu}</div>
      <div class="movie__category">${movie.genres.map(
        (genre) => ` ${genre.genre}`
      )}</div>
            <div class="movie__average movie__average--${getClassByRate(
              movie.rating
            )}">${movie.rating}</div>
          <button onclick="removeFavorite(${movie.filmId})"
          
           class="favorite__btn">Удалить из избранных</button>
      </div>
          `;

    moviesFav?.appendChild(movieList);
  });
}
function addToFavorite(id) {
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("movies", JSON.stringify(favorites));
  } else {
    alert("Фильм уже в избранных");
  }
}
function removeFavorite(id) {
  const leftItems = favorites.filter((movieId) => movieId !== id);
  localStorage.setItem("movies", JSON.stringify(leftItems));
  window.location.reload();
  console.log(leftItems);
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    document.querySelector(".movies").innerHTML = "";
    getMovies(apiSearchUrl);

    search.value = "";
  }
});
function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "yellow";
  } else {
    return "red";
  }
}