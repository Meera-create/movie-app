
const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const list = document.getElementById('movie-list');

const moviesArray = [];
let keyName = '';




const renderMoviesList = (filteredWord = '') => {

  if (moviesArray.length === 0) {
    list.classList.remove('visible');
    return;
  } else {
    list.classList.add('visible');
  }

  list.innerHTML = '';

  const filteredMovies = !filteredWord ?
    moviesArray : moviesArray.filter(movie =>
      movie.info.title.includes(filteredWord));



  filteredMovies.forEach((movie) => {
    const movieElement = document.createElement('li');
    movieElement.className = "movie-element";

    //map through object to find other key

    // const { getFormattedTitle } = moviesArray;

    for (const key in movie.info) {
      if (key !== 'title' && key !== '_title') {
        keyName = key;
      }
    }

    let { getFormattedTitle } = movie;
    getFormattedTitle = getFormattedTitle.bind(movie);
    //ensures the this keyword later refers to movie


    movieElement.innerHTML = `
    <div>
    <h2>${getFormattedTitle()}</h2>
    <p>${keyName}</p>
    <p>${movie.info[keyName]}</p>
    
    </div>
  `
    list.append(movieElement);
  })
};

const addMovieHandler = () => {

const inputTitle = document.getElementById('title').value;
const extraNameInput = document.getElementById('extra-name').value;
const extraValueInput = document.getElementById('extra-value').value;


  if (inputTitle.trim() === '' ||
    extraNameInput.trim() === '' ||
    extraValueInput.trim() === '')
  {  
    alert('enter a valid value');
  }

  const movieObject = {
    info: {
      set title(value) {
        if (value.trim() === '') {
          this._title === 'DEFAULT';
          return;
        }
        this._title = value;
      },

      get title() {
        return this._title;
      },
      [extraNameInput]: extraValueInput
      
    },
    id: Math.random().toString(),
    getFormattedTitle: function () {
      return this.info.title.toUpperCase();
    }
  };

  movieObject.info.title = inputTitle;
  //getter
  console.log(movieObject.info.title)

  moviesArray.push(movieObject);
  console.log(moviesArray);
  renderMoviesList();
  
};



const searchMovieHandler = () => {
  console.log(this, 'this refers to the object that triggered the event since its attached to an event handler');
  const filteredWords = document.getElementById('filter-title').value;
  renderMoviesList(filteredWords);
}


console.log(addMovieBtn)
addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);




