const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function () {

  let numberOfGuests = localStorage.getItem("numberOfGuests");
  let observers = [];
  let selectedDishes = JSON.parse(localStorage.getItem("selectedDishes"));

  if (numberOfGuests === null){
    numberOfGuests = 4;
  }else{
    numberOfGuests = parseInt(numberOfGuests, 10);
  }
  if (selectedDishes === null){
    selectedDishes = []
  }
  const updateLocalStorage = function(){
    localStorage.setItem("selectedDishes", JSON.stringify(selectedDishes));
    localStorage.setItem("numberOfGuests", numberOfGuests);
    console.log("updated localStorage. selectedDishes and numberOfGuests:");
    console.log(selectedDishes);
    console.log(numberOfGuests);
  }

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    notifyObservers();
    updateLocalStorage();
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };

  // API Calls

  this.getAllDishes = function (query, type) {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query='+query+"&type="+type;
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  //function that returns a dish of specific ID
	this.getDish = function (id) {
    let url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+id+"/information";
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }
  
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error);
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error);
    }
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addToMenu = function(id, type){
    this.getDish(id)
    .then((newDish)=>{
      newDish.dishType = type;
      selectedDishes.push(newDish);
      notifyObservers();
      updateLocalStorage();
    });
  }

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		return selectedDishes;
	}

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DinnerModel();
