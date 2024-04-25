const mobileBtn = document.getElementById("mobileBtn");
const mobileMenu = document.querySelector(".mobile-menu");
const cardsContainer = document.querySelector(".cards-container");
const loadMoreBtn = document.querySelector(".load-more-btn");
const about = document.getElementById("about");
const contact = document.getElementById("contact");
const aboutMobile = document.getElementById("aboutmobile");
const contactMobile = document.getElementById("contactmobile");
let visible = true;

about.addEventListener("click", function () {
  window.scrollTo({
    top: window.innerHeight * 3,
    behavior: "smooth",
  });
});
contact.addEventListener("click", function () {
  window.scrollTo({
    top: window.innerHeight * 4,
    behavior: "smooth",
  });
});

aboutMobile.addEventListener("click", function () {
  window.scrollTo({
    top: window.innerHeight * 3,
    behavior: "smooth",
  });
});

contactMobile.addEventListener("click", function () {
  window.scrollTo({
    top: window.innerHeight * 6,
    behavior: "smooth",
  });
});

mobileBtn.addEventListener("click", function () {
  if (visible) {
    mobileMenu.classList.add("visible");
    visible = false;
  } else {
    mobileMenu.classList.remove("visible");
    visible = true;
  }
});

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,ja",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
}

const url =
  "https://newsapi.org/v2/top-headlines?country=jp&apiKey=14324535cfa648328788e77a445e9c59";
let maxCardsToShow = 4;
let newsData = [];

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    newsData = data.articles;
    showCards(newsData);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function showCards(newsData) {
  const filteredData = newsData.slice(0, maxCardsToShow);
  cardsContainer.innerHTML = "";

  filteredData.forEach((article) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("cards");

    const imgElement = document.createElement("img");
    imgElement.src = article.urlToImage;
    imgElement.alt = article.title;
    imgElement.classList.add("cardImg");

    const titleElement = document.createElement("h1");
    titleElement.textContent = article.title;
    titleElement.classList.add("title");

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = article.description;
    descriptionElement.classList.add("description");

    const authorElement = document.createElement("h4");
    authorElement.textContent = article.author;
    authorElement.classList.add("author");

    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(titleElement);
    cardDiv.appendChild(descriptionElement);
    cardDiv.appendChild(authorElement);

    cardsContainer.appendChild(cardDiv);
  });

  if (maxCardsToShow >= newsData.length) {
    loadMoreBtn.classList.add("hidden");
  }
}

loadMoreBtn.addEventListener("click", function () {
  maxCardsToShow += 4;
  showCards(newsData);
});

function reveal() {
  let reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

