
document.addEventListener('DOMContentLoaded', () => {
  // Showing Base URL used
  const baseUrl = 'http://localhost:3000';
  // DOM Element by id function
  const getElement = (id) => document.getElementById(id);
// getting HTMLS elements by id
  const beerList = getElement('beer-list');
  const beerName = getElement('beer-name');
  const beerImage = getElement('beer-image');
  const beerDescription = getElement('beer-description');
  const reviewList = getElement('review-list');
  const descriptionForm = getElement('description-form');
  const descriptionInput = getElement('description');
  const reviewForm = getElement('review-form');
  const reviewInput = getElement('review');

  // Function to update beer details shown on the page
  const displayBeerDetails = (beer) => {
    beerName.textContent = beer.name;
    beerImage.src = beer.image_url;
    beerDescription.textContent = beer.description;
    reviewList.innerHTML = '';
    // Reviews for the selected beer
    beer.reviews.forEach((review) => {
      const li = document.createElement('li');
      li.textContent = review;
      reviewList.appendChild(li);
    });
  };
  // Beer description form handler
  const handleDescriptionFormSubmit = (event) => {
    event.preventDefault();
    const newDescription = descriptionInput.value;
    if (newDescription) {
      beerDescription.textContent = newDescription;
    }
  };
  // Beer review form 
  const handleReviewFormSubmit = (event) => {
    event.preventDefault();
    const newReview = reviewInput.value;
    if (newReview) {
      const li = document.createElement('li');
      li.textContent = newReview;
      reviewList.appendChild(li);
      reviewInput.value = ''; // Clear the input field
    }
  };
   // Fetch beer details
  fetch(`${baseUrl}/beers/1`)
    .then((response) => response.json())
    .then((beer) => {
      displayBeerDetails(beer);
    })
    .catch((error) => console.error('Error fetching beer details:', error));
  // Fetch a list of beers and show on the webpage
  fetch(`${baseUrl}/beers`)
    .then((response) => response.json())
    .then((beers) => {
      beers.forEach((beer) => {
        //Create a list item for each beer and add it to the beer list
        const li = document.createElement('li');
        li.textContent = beer.name;
        li.dataset.id = beer.id;
        beerList.appendChild(li);
        // creating an event listener to show details when a beer is clicked
        li.addEventListener('click', () => displayBeerDetails(beer));
      });
    })
    .catch((error) => console.error('Error fetching beer list:', error));
  // add an event listener to the description and review forms for submission
  descriptionForm.addEventListener('submit', handleDescriptionFormSubmit);
  reviewForm.addEventListener('submit', handleReviewFormSubmit);
});
