const prompt = require('prompt-sync')();
const dayjs = require('dayjs');
const fs = require('fs');

let books = [];

const getBooks = () => {
    const data = fs.readFileSync('books.json');
    const books = JSON.parse(data);

    if (!books) {
        return [];
    }

    return books;
};

const printBooks = () => {
    console.clear();
    console.log('Favorite Books:');

    let i = 1;

    for (const book of books) {
        console.log(`${i}. ${book.title} (${book.interest})`);
        console.log(`Added: ${book.added}\n`);

        i++;
    }
};

const showBooks = () => {
    printBooks();
    prompt('Press enter to continue');
};

const addBook = () => {
    console.clear();
    console.log('Add a book');

    const title = prompt('Enter book title: ');
    const interest = prompt('Enter your interest: ');
    const added = dayjs().format('DD/MM/YYYY HH:mm:ss');

    const book = {
        title,
        interest,
        added,
    };

    books.push(book);
};

const editBook = () => {
    printBooks();

    const index = prompt('Enter book index: ');
    const book = books[index - 1];

    console.clear();
    console.log('Edit a book');

    const title = prompt(`Enter book title (${book.title}): `);
    const interest = prompt(`Enter your interest (${book.interest}): `);

    book.title = title;
    book.interest = interest;
};

const removeBook = () => {
    printBooks();

    const index = prompt('Enter book index: ');
    const book = books[index - 1];

    console.clear();
    console.log('Remove a book');

    console.log(`Are you sure you want to remove ${book.title}?`);

    const confirm = prompt('Enter yes or no: ');

    if (confirm == 'yes') {
        books.splice(index - 1, 1);
    }
};

const save = () => {
    const data = JSON.stringify(books);

    fs.writeFileSync('books.json', data);
};

books = getBooks();

let running = true;

while (running) {
    console.clear();
    console.log('Favorite Book Library');
    console.log('1. List books');
    console.log('2. Add a book');
    console.log('3. Edit a book');
    console.log('4. Remove a book');
    console.log('5. Save & exit');

    const choice = prompt('Enter your choice: ');

    if (choice == 1) {
        showBooks();
    } else if (choice == 2) {
        addBook();
    } else if (choice == 3) {
        editBook();
    } else if (choice == 4) {
        removeBook();
    } else if (choice == 5) {
        save();
        running = false;
    }
}
