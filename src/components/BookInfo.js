import React, { useEffect, useState } from 'react'
import * as BooksAPI from '../BooksAPI'
import { useParams } from "react-router-dom"
const BookInfo = () => {
    const [book, setBook] = useState(null);
    let params = useParams()
    const getBookDetails = () => {
        BooksAPI.get(params.id).then(data => { console.log(data); setBook(data) })
    }
    const handleChange = (e) => {
        BooksAPI.update(book, e.target.value)
        setBook(book)
        getBookDetails();
    }
    useEffect(() => {
        getBookDetails();
    }, []);
    return (
        <div className='container'>
            <div className="book-details">
                <div className="book-details-top">
                    <div className="book-cover" style={{ width: 154, height: 230, backgroundRepeat: "no-repeat", backgroundSize: "110%", backgroundImage: `url(${book?.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer book-info">
                        <select onChange={handleChange} value={book?.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-details-info">
                    <div className="book-title"><h2>{book?.title}</h2></div>
                    <div className="book-authors">{book?.authors.map((author, i) => <p key={i} className='author'>{author}</p>)}</div>
                    <p>subtitle: {book?.subtitle}</p>
                    <p>Published at: {book?.publishedDate}</p>
                    <p>Rating: {book?.maturityRating}</p>
                    <p>publisher: {book?.publisher}</p>
                </div>

            </div>
        </div>

    )
}

export default BookInfo