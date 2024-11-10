'use strict'

const aboutContainer = document.querySelector("#aboutContainer");
const section = document.querySelector('section');

async function getData() {
  try {
    const response = await fetch("https://gutendex.com/books");
    return await response.json();
  } catch {
    throw new Error("Data is not found");
  }
}

const createList = ({ subjects }) => {
  const ul = document.createElement("ul");
  const categoryList = document.createElement('li');
  const category = document.createElement('h2');
  category.textContent = 'Cathegory:';
  categoryList.append(category);
  ul.append(categoryList);
  subjects.forEach(subject => {
    const li = document.createElement("li");
    li.textContent = subject;
    ul.append(li);
  });
  return ul;
};

const createHtmlPage = (book) => {
  const elements = {
    box: document.createElement("div"),
    imgBox: document.createElement("img"),
    authorRow: document.createElement("div"),
    author: document.createElement("h1"),
    years: document.createElement("p"),
    title: document.createElement("h2"),
    category: createList(book),
    buttonRow: document.createElement("div"),
    read: document.createElement("a"),
    download: document.createElement("a")
  };

  elements.imgBox.src = book.formats["image/jpeg"];
  elements.author.textContent = `Author: ${book.authors[0].name.replaceAll(",", "")}` || "Author is not found";
  elements.years.textContent = `${book.authors[0].birth_year}-${book.authors[0].death_year}`;
  elements.title.textContent = `Title: ${book.title}`;

  elements.read.textContent = "Read online";
  elements.read.href = book.formats["text/html"];
  elements.read.target = "_blank";
  elements.download.textContent = "Download";
  elements.download.href = book.formats["application/octet-stream"];
  elements.download.target = "_blank";

  elements.authorRow.append(elements.author, elements.years);
  elements.buttonRow.append(elements.read, elements.download);
  elements.box.append(elements.imgBox, elements.authorRow, elements.title, elements.category, elements.buttonRow);

  elements.box.classList.add('sectionsBox');
  elements.authorRow.classList.add('authorRow');
  elements.buttonRow.classList.add('buttonRow');

  return elements.box;
};

const init = async () => {
  const { results } = await getData();
  const bookId = new URLSearchParams(window.location.search).get("id");
  const book = results.find(book => book.id === parseInt(bookId));

  section.remove();
  aboutContainer.append(book ? createHtmlPage(book) : "Book not found");
};

init();
