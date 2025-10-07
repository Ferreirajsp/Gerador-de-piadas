const jokeBox = document.getElementById("joke-box");
const jokeBtn = document.getElementById("joke-btn");
const translateBtn = document.getElementById("translate-btn");

let lastJoke = ""; // stores the last joke

// Fetch a random English joke
async function getJoke() {
  jokeBox.textContent = "Loading joke...";
  translateBtn.style.display = "none";

  try {
    const response = await fetch("https://official-joke-api.appspot.com/jokes/random");
    const data = await response.json();

    const joke = `${data.setup} ${data.punchline}`;
    lastJoke = joke;

    jokeBox.innerHTML = `<p>${data.setup}</p><p><strong>${data.punchline}</strong></p>`;
    translateBtn.style.display = "inline-block";
  } catch (error) {
    jokeBox.textContent = "Oops! Could not load a joke. Try again.";
  }
}

// Translate the joke to Portuguese
async function translateJoke() {
  if (!lastJoke) return;

  jokeBox.textContent = "Translating...";
  translateBtn.style.display = "none";

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(lastJoke)}&langpair=en|pt-BR`
    );
    const data = await response.json();

    const translated = data.responseData.translatedText;
    jokeBox.innerHTML = `<p>${translated}</p>`;
  } catch (error) {
    jokeBox.textContent = "Error translating the joke. Try again.";
  }
}

jokeBtn.addEventListener("click", getJoke);
translateBtn.addEventListener("click", translateJoke);
