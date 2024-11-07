const main = document.getElementById("main");

let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
const displayWatchlist = (movies) => {
    main.innerHTML = ""; 

    if (movies.length === 0) {
        main.innerHTML = `<p>Your watchlist is empty.</p>`;
        return;
    }

    movies.forEach((movie) => {
        const { imgurl, title, vote_average, overview } = movie; 
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
            <img src="${imgurl}" alt="${title}"/>
            <div class="movie-info">        
                <h3>${title}</h3> <!-- Removed the 'watched' class -->
                <span class="${getClassByRate(vote_average)}">Rating: ${vote_average}</span>
                <p>${overview}</p>
                <br>
                <button class="remove" onclick="removeFromWatchlist('${title}')">Remove</button>
            </div>
        `;
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


const removeFromWatchlist = (title) => {
    watchlist = watchlist.filter(movie => movie.title !== title);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    displayWatchlist(watchlist);
    alert(`${title} has been removed from your watchlist.`);
};

displayWatchlist(watchlist);
