"use strict";

const API_URL = "https://gutendex.com/books";
const MAX_TITLE_LENGTH = 70;

async function getData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch data");
    const { results } = await response.json();
    return results;
  } catch (error) {
    throw new Error("Data is not found");
  }
}

const section = document.querySelector('section');
const bookContainer = document.querySelector("#bookContainer");

const createBooks = ({ id, formats, title, authors }) => {
  const elements = {
    box: document.createElement("div"),
    titleRow: document.createElement("div"),
    overGround: document.createElement("div"),
    author: document.createElement("h3"),
    title: document.createElement("p"),
    open: document.createElement("a")
  };

  elements.open.href = `../html/book.html?id=${id}`;
  elements.box.classList.add("box");
  elements.titleRow.classList.add("titleRow");
  elements.overGround.classList.add("overGround");

  elements.box.style.backgroundImage = `url("${formats["image/jpeg"]}")`;
  elements.title.textContent = title.length < MAX_TITLE_LENGTH 
    ? title 
    : `${title.slice(0, MAX_TITLE_LENGTH)}...`;
  elements.author.textContent = (authors[0]?.name || "Author is not found").replaceAll(",", "");
  elements.open.textContent = "More";

  elements.titleRow.append(elements.author, elements.title);
  elements.overGround.append(elements.titleRow, elements.open);
  elements.box.append(elements.overGround);
  bookContainer.append(elements.box);
};

const init = async () => {
  try {
    const data = await getData();
    data.forEach(createBooks);
    section.remove();
  } catch (error) {
    console.error("Failed to initialize:", error);
  }
};

init();
