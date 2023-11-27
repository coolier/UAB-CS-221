document.addEventListener('DOMContentLoaded', function() {
    // Load and display the saved reading list on page load
    displayReadingList();

    document.getElementById('search-button').addEventListener('click', function() {
        var searchText = document.getElementById('search-input').value;
        if (!searchText) {
            alert("Please enter a search query.");
            return;
        }
        
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchText)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => displayBooks(data))
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                alert("Failed to fetch book data. Please try again.");
            });
    });
});

function displayBooks(data) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = ''; // Clear previous results

    if (data.items && data.items.length > 0) {
        data.items.forEach(book => {
            const listItem = document.createElement('div');
            listItem.className = 'book-item';
            listItem.innerHTML = `
                <h3>${book.volumeInfo.title}</h3>
                <button class="details-button">Details</button>
                <button class="add-to-list-button">Add to Reading List</button>
                <div class="book-details" style="display: none;">
                    <p>Author(s): ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'N/A'}</p>
                    <p>Publisher: ${book.volumeInfo.publisher || 'N/A'}</p>
                    <p>Published Date: ${book.volumeInfo.publishedDate || 'N/A'}</p>
                </div>`;
            
            bookList.appendChild(listItem);

            listItem.querySelector('.details-button').addEventListener('click', function() {
                toggleBookDetails(listItem);
            });

            listItem.querySelector('.add-to-list-button').addEventListener('click', function() {
                addToReadingList(book);
            });
        });
    } else {
        bookList.innerHTML = '<p>No books found. Try another search.</p>';
    }
}

function addToReadingList(book) {
    let readingList = JSON.parse(localStorage.getItem('readingList')) || [];
    if (!readingList.some(b => b.id === book.id)) {
        readingList.push(book);
        localStorage.setItem('readingList', JSON.stringify(readingList));
        displayReadingList();
    }
}

function displayReadingList() {
    const readingListSection = document.getElementById('reading-list');
    readingListSection.innerHTML = '';

    let readingList = JSON.parse(localStorage.getItem('readingList')) || [];
    readingList.forEach(book => {
        const listItem = document.createElement('div');
        listItem.className = 'book-item';
        listItem.innerHTML = `
            <h3>${book.volumeInfo.title}</h3>
            <button class="details-button">Details</button>
            <button class="remove-from-list-button">Remove from Reading List</button>
            <div class="book-details" style="display: none;">
                <p>Author(s): ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'N/A'}</p>
                <p>Publisher: ${book.volumeInfo.publisher || 'N/A'}</p>
                <p>Published Date: ${book.volumeInfo.publishedDate || 'N/A'}</p>
            </div>`;

        readingListSection.appendChild(listItem);

        listItem.querySelector('.details-button').addEventListener('click', function() {
            toggleBookDetails(listItem);
        });

        listItem.querySelector('.remove-from-list-button').addEventListener('click', function() {
            removeFromReadingList(book, listItem);
        });
    });
}

function removeFromReadingList(bookToRemove, listItem) {
    let readingList = JSON.parse(localStorage.getItem('readingList')) || [];
    readingList = readingList.filter(book => book.id !== bookToRemove.id);
    localStorage.setItem('readingList', JSON.stringify(readingList));
    listItem.remove();
}

function toggleBookDetails(listItem) {
    const detailsDiv = listItem.querySelector('.book-details');
    if (detailsDiv.style.display === 'none') {
        detailsDiv.style.display = 'block';
        listItem.querySelector('.details-button').textContent = 'Hide Details';
    } else {
        detailsDiv.style.display = 'none';
        listItem.querySelector('.details-button').textContent = 'Details';
    }
}
