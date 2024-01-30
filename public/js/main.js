
// Get the search query from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('query');

// Function to fetch movie information based on search query
function searchMovies(searchTerm) {
    const apiKey = '9a429287e0b2946058f067633d6c7c1e';
    const movieInfoContainer = document.getElementById('movie-info');
    const trailersContainer = document.getElementById('trailers');

    if (!searchTerm) {
        movieInfoContainer.innerHTML = '<p>Please enter a movie name.</p>';
        trailersContainer.innerHTML = ''; // Clear trailers container
        return;
    }

    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                // Display search results
                displaySearchResults(data.results);
            } else {
                movieInfoContainer.innerHTML = '<p>No movies found.</p>';
                trailersContainer.innerHTML = ''; // Clear trailers container
            }
        })
        .catch(error => {
            console.error('Error fetching movie information:', error);
            movieInfoContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
            trailersContainer.innerHTML = ''; // Clear trailers container
        });
}

// Function to display search results
function displaySearchResults(results) {
    const movieInfoContainer = document.getElementById('movie-info');
    const trailersContainer = document.getElementById('trailers');

    movieInfoContainer.innerHTML = ''; // Clear previous results
    trailersContainer.innerHTML = ''; // Clear trailers container

    results.forEach(movie => {
        const title = movie.title;
        const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        const overview = movie.overview;
        const releaseDate = movie.release_date;

        // Create elements to display movie information
        const movieElement = document.createElement('div');
        movieElement.innerHTML = `
            <h2>${title}</h2>
            <img src="${posterUrl}" class="movieImg" alt="${title} Poster">
            <p><strong>Overview:</strong> ${overview}</p>
            <p><strong>Release Date:</strong> ${releaseDate}</p>
        `;
        movieElement.addEventListener('click', () => fetchAndDisplayMovieDetails(movie.id));

        movieInfoContainer.appendChild(movieElement);
    });
}

// Function to fetch movie details and trailers for a specific movie
function fetchAndDisplayMovieDetails(movieId) {
    const apiKey = '9a429287e0b2946058f067633d6c7c1e';
    const movieInfoContainer = document.getElementById('movie-info');
    const trailersContainer = document.getElementById('trailers');

    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

    fetch(movieDetailsUrl)
        .then(response => response.json())
        .then(movieData => {
            // Display movie details
            const title = movieData.title;
            const posterUrl = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`;
            const overview = movieData.overview;
            const releaseDate = movieData.release_date;

            movieInfoContainer.innerHTML = `
                    <div class="img-wrapper">
                     <div class="wrapper">
                    <h2>${title}</h2>
                    <img src="${posterUrl}" alt="${title} Poster" class="img">
                   <div class="content">
                   <p><strong>Overview:</strong> ${overview}</p>
                   <p><strong>Release Date:</strong> ${releaseDate}</p>
                   </div>
                    <hr>   
                    </div>           
                </div>
                
            `;

            // Fetch and display trailers for the selected movie
            fetchMovieTrailers(movieId);
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
            movieInfoContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
            trailersContainer.innerHTML = ''; // Clear trailers container
        });
}

// Function to fetch trailers for a movie
function fetchMovieTrailers(movieId) {
    const apiKey = '9a429287e0b2946058f067633d6c7c1e';
    const trailersContainer = document.getElementById('trailers');

    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Filter the results to include only trailers
            const trailers = data.results.filter(video => video.type === 'Trailer');

            // Display trailers on your website
            displayTrailers(trailers);
        })
        .catch(error => {
            console.error('Error fetching movie trailers:', error);
        });
}

// Function to display trailers
function displayTrailers(trailers) {
    const trailersContainer = document.getElementById('trailers');

    trailersContainer.innerHTML = ''; // Clear trailers container

    trailers.forEach(trailer => {
        // Display trailer details (name, key, etc.)
        const name = trailer.name;
        const trailerKey = trailer.key; // YouTube or Vimeo video ID

        // Create HTML elements to display trailer
        const trailerElement = document.createElement('div');
        trailerElement.classList.add('trailer');
        trailerElement.innerHTML = `
            <h3>${name}</h3>
            <iframe width="350" height="315" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allowfullscreen></iframe>
        `;

        trailersContainer.appendChild(trailerElement);
    });
}

// Perform movie search on page load
searchMovies(searchTerm);

// Event listener for the search input
searchInput.addEventListener('input', searchMovies);



//   Search function
function openSearchModal() {
    document.getElementById('searchModal').style.display = 'block';
  }

  function closeSearchModal() {
    document.getElementById('searchModal').style.display = 'none';
  }

// function tmdbHandler(){
//     window.open('https://www.themoviedb.org/', '_blank');
// }