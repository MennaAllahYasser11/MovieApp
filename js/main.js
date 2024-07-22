document.addEventListener('DOMContentLoaded', () => {
    const API = 'https://api.themoviedb.org/3/movie/popular?api_key=fac192585bcefe69fdb0f28dd1dbdbdb';
    console.log(API);
    const API_KEY = 'fac192585bcefe69fdb0f28dd1dbdbdb';
    const movieCardsContainer = document.getElementById("movie-cards");
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const paginationButtons = document.getElementById("pagination-buttons");
    const MOVIES_PER_PAGE = 18;
    const MAX_MOVIES = 60;
    let currentPage = 1;
    // Function to fetch and display movies
     function fetchMovies(API, page = 1) {
      fetch(`${API}&page=${page}`)
        .then(response => response.json())
        .then(data => {
          movieCardsContainer.innerHTML = ''; // Clear previous results 
          const moviesToShow = data.results.slice(0, MOVIES_PER_PAGE);  
          data.results.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-4", "movie-card");
            card.innerHTML = `
              <div class="card h-100">  
               <img src="https://image.tmdb.org/t/p/w500${movie.poster_path }" onerror="this.onerror=null; this.src='../img/movieIMG.jpg';" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">${movie.title}</h5>
                  <p class="card-text">${movie.overview}</p>
                  <a href="details.html?id=${movie.id}" target="_blank" class="details-button BTNdetails color text-decoration-none p-1 text-center ">Details</a>
                </div>
              </div>
            `;   
            movieCardsContainer.appendChild(card);
          });
  
          // onerror event for the image tag to handle the case when the image from the API is not available. If the image fails to load, you can set a default image in the onerror handler.
          createPaginationButtons(Math.ceil(Math.min(data.total_results, MAX_MOVIES) / MOVIES_PER_PAGE));
        })
    } 
    function createPaginationButtons(totalPages) {
      paginationButtons.innerHTML = ''; 
      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        li.innerHTML = `<a class=" color p-2 m-1 text-decoration-none" href="#">${i}</a>`;
        // if (i === currentPage) {
        //   li.classList.add('active');
        // }
        li.addEventListener('click', (e) => {
          e.preventDefault(); 
          currentPage = i; 
          fetchMovies(currentQueryURL, currentPage); 
        });
        paginationButtons.appendChild(li); }}
    function fetchPopularMovies(page = 1) {
      const popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
      fetchMovies(popularMoviesURL, page);
    }  
  
    let currentQueryURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    
    searchButton.addEventListener('click', () => {
      const query = searchInput.value;
      if (query) {
        currentQueryURL = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`;
        currentPage = 1; // Reset to the first page on new search
        fetchMovies(currentQueryURL, currentPage);
      }});  
    
    document.getElementById('home-link').addEventListener('click', (e)=>{
      e.preventDefault();  
      currentQueryURL=`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
      currentPage=1;
      searchInput.value=null; 
      fetchPopularMovies(currentPage);
    });
  fetchPopularMovies(currentPage);
  });
  
  emailjs.init('NlQi0xL0wXRFQnzgM');  // public key or user id in emailjs server
  document.getElementById('contact-form').addEventListener('submit', function(event) {
   event.preventDefault(); // Prevent the default form submission
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    emailjs.send('service_h8x9ttx', 'template_4rifttj', {  
      from_name: name,
      from_email: email,
      message_html: message
    }).then(function(response) {
      Swal.fire({   
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {  
          document.getElementById('contact-form').reset(); 
        } });
    }, function(error) {
      Swal.fire({   
        title: 'Error',   text: 'An error occurred. Please try again later.', icon: 'error', confirmButtonText: 'OK'
      });
      console.error('Error sending email:', error);});});
  
  
