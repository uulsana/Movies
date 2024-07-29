# Movies
Сайт помогает пользователям искать, просматривать  и сохранять топовые фильмы в избранное. Используется API Kinopoisk для получения данные о фильмах. Приложение реализовано с использованием JavaScript, HTML и CSS.

## Оснавные функции
- Поиск фильмов: Пользователь может вводить ключевые слова для поиска фильмов. Приложение отправляет запрос к API для поиска фильмов по указанным ключевым словам и отображает результаты.
- Просмотр топовых фильмов: Приложение загружает и отображает список топовых фильмов по популярности.
- Добавление в избранное: Пользователь может добавлять фильмы в список избранных нажатием кнопки "Добавить в избранное". Информация о фильмах сохраняется в локальном хранилище браузера.
- Просмотр избранных фильмов: Пользователь может просматривать список избранных фильмов, который сохраняется между сессиями благодаря использованию локального хранилища.
- Удаление из избранного: Пользователь может удалять фильмы из списка избранных нажатием кнопки "Удалить из избранных".

## Технологии
- JavaScript: Основной язык программирования для реализации логики приложения.
- HTML: Используется для создания структуры веб-страницы.
- CSS: Применяется для стилизации элементов интерфейса.
- API Kinopoisk: Используется для получения данных о фильмах.
- Local Storage: Локальное хранилище браузера используется для сохранения списка избранных фильмов.


## Основной код


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>movie-app</title>
</head>
<body>
<header class="container">
    <div class="header__content">
        <a href="index.html" class="header__logo">Фильмовик</a>
    
    <form action="">
        <a  class="favMenu" href="favorite.html">Избранное</a>
        <input type="text" name="" id="" class="header__search" placeholder="Искать филмы:">
    </form>
</div>
    
    <div class="container">
        <div class="movies">
        </div>
    </div>

</header>

    <script src="main.js"></script>
</body>
</html> 
```


```javascript
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
```
