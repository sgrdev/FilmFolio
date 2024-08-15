const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    
            <a href="movie-details.html?id=${movie.id}">
              ${
                movie.poster_path
                  ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />`
                  : `<img src="img/no-image.jpg" alt="${movie.title}" />`
              }
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                  <small class="text-muted">Release: ${
                    movie.release_date
                  }</small>
                </p>
              </div>
            </a>
          `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    
            <a href="tv-details.html?id=$show.id}">
              ${
                show.poster_path
                  ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}" />`
                  : `<img src="img/no-image.jpg" alt="${show.name}" />`
              }
              <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                  <small class="text-muted">Air Date: ${
                    show.first_air_date
                  }</small>
                </p>
              </div>
            </a>
          `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

async function displayMovieDetails() {
  const movieID = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieID}`);
  console.log(movieID);
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="detail-top">
              <div>
                <a href="movie-details.html?id=${movie.id}">
              ${
                movie.poster_path
                  ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />`
                  : `<img src="img/no-image.jpg" alt="${movie.title}" />`
              }
              </div>
              <div>
                <h2>${movie.title}</h2>
                <p>
                  <i class="fa-solid fa-star" style="color: goldenrod"></i>
                  ${movie.vote_average.toFixed(1)}/10
                </p>
                <p>Release Date: ${movie.release_date}</p>
                <p>
                  ${movie.overview}
                </p>
                <h5>Genres</h5>
                <ul class="list-group">
                  ${movie.genres
                    .map((genre) => `<li>${genre.name}</li>`)
                    .join('')}
                </ul>
                <a href="${movie.homepage}" target="_blank" class="btn">
                  Visit Movie Homepage</a
                >
              </div>
            </div>
            <div class="details-bottom">
              <h2>Movie Info</h2>
              <ul>
                <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
                  movie.budget
                )}</li>
                <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
                  movie.revenue
                )}</li>
                <li><span class="text-secondary">Runtime:</span> ${
                  movie.runtime
                } minutes</li>
                <li><span class="text-secondary">Status:</span> ${
                  movie.status
                }</li>
              </ul>
              <h4>Production Companies</h4>
              <div class="list-group">${movie.production_companies
                .map((company) => `<span>${company.name}</span>`)
                .join('')}</div>
             
            </div>
          </div>
  `;
  document.querySelector('#movie-details').appendChild(div);
}

async function displayShowDetails() {
  const showID = window.location.search.split('=')[1];
  console.log(showID);

  const div = document.createElement('div');
  div.innerHTML = `
  <div class="detail-top">
              <div>

              ${
                show.poster_path
                  ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}" />`
                  : `<img src="img/no-image.jpg" alt="${show.name}" />`
              }
              </div>
              <div>
                <h2>${show.name}</h2>
                <p>
                  <i class="fa-solid fa-star" style="color: goldenrod"></i>
                   ${show.vote_average.toFixed(1)} / 10
                </p>
                <p>Release Date: ${show.last_air_date}</p>
                <p>
                  ${show.overview}
                </p>
                <h5>Genres</h5>
                <ul class="list-group">
                  ${show.genres
                    .map((genre) => `<li>${genre.name}</li>`)
                    .join('')}
                </ul>
                <a href="${show.homepage}" target="_blank" class="btn">
                  Visit show Homepage</a
                >
              </div>
            </div>
            <div class="details-bottom">
              <h2>show Info</h2>
              <ul>
                <li><span class="text-secondary">Number of Episodes:</span> $${
                  show.number_of_episodes
                }</li>
                <li><span class="text-secondary">Last Episode To Air:</span> ${
                  show.last_episode_to_air.name
                }</li>
                <li><span class="text-secondary">Status:</span> ${
                  show.status
                }</li>
              </ul>
              <h4>Production Companies</h4>
              <div class="list-group">${show.production_companies
                .map((company) => `<span>${company.name}</span>`)
                .join('')}</div>

            </div>
          </div>
  `;
  document.querySelector('#show-details').appendChild(div);
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = '3e34206224fcf40f2db33b7ee7ed9e2b';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  return data;
}

//hightlight active link
function highLightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

//INIT app
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
  }
  highLightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
