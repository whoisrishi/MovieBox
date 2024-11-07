const IMGPATH = "https://image.tmdb.org/t/p/w1280";
// const APIKEY = "04c35731a5ee918f014970082a0088b1"; // (exposed intentionally) 
const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1";
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=`;

const main = document.getElementById("main");
const search = document.getElementById("search");
const header = document.getElementById("header");

function isLogged() {
  return localStorage.getItem("username") && localStorage.getItem("password") ? true : false;}

  

if (isLogged()==!false) {
  header.innerHTML += `
  <div>
  <a href="./myMovieBox.html" >My Watchlist</a>
  <a href="./myAccount.html">My Account</a>
  </div>
  `;
} else {
  header.innerHTML += `<div id="loginbtn">
  <a href="./login.html" >Login</a></div> `;
}

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];



async function fetchMovies(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const movieRes = data.results;
    
    if (movieRes.length === 0) {
      main.innerHTML = `<p>No results found.</p>`;
    } else {
      displayMovies(movieRes);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    main.innerHTML = `<p>Error fetching movies. Please try again later.</p>`;
  }
}



function addToWatchlist(movie) {
  if(isLogged()==true){
    console.log("dafds")
        if (!watchlist.some(item => item.id === movie.id)) {
          watchlist.push(movie);
          localStorage.setItem("watchlist", JSON.stringify(watchlist));
          alert(`${movie.title} has been added to your watchlist!`);
        } else {
          alert(`${movie.title} is already in your watchlist.`);
        }}
  else{
    alert("You need to logged in")
  }
}


const displayMovies = (movies) => {
  main.innerHTML = ""; 

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    
    movieElement.innerHTML = `
    <img src="${IMGPATH + poster_path}" alt="${title}"/>
    <div class="movie-info">        
    <h3>${title}</h3>
    <span class="${getClassByRate(vote_average)}">Rating: ${vote_average}</span>        
    </div>
    <div class="overview">
    <h3>Overview:</h3>
    ${overview}
    </div>
    <button class="add-to-watchlist">Add to WatchList</button>
    `;
    
    const addToWatchlistBtn = movieElement.querySelector(".add-to-watchlist");
    addToWatchlistBtn.addEventListener("click", () => addToWatchlist(movie));
    
    main.appendChild(movieElement);
  });
};





const getClassByRate = (rating) => {
  if (rating >= 8) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
};


const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
searchBtn.addEventListener("click",   
  () => {
    const searchTerm = searchInput.value.trim();
    console.log("Search term:", searchTerm);
    fetchMovies(SEARCHAPI+searchTerm);
    searchInput.value = "";
});
  

fetchMovies(APIURL);