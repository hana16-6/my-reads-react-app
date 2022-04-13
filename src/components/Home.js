import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
const Home = () => {
    const [data, setData] = useState([])
    const [book, setBook] = useState({})
    const [seletedVal, setSeletedVal] = useState('');
    let navigate = useNavigate();
    const getAllBooks = () => {
        BooksAPI.getAll().then(data => setData(data));
    }
    const handleChange = (book, e) => {
        setSeletedVal(e.target.value)
        setBook(book)
        BooksAPI.update(book, e.target.value)
    }
    const showBookInfo = (id) => {
        navigate(`/BookInfo/${id}`)
    }
    useEffect(() => {
        getAllBooks();

    }, [seletedVal, setSeletedVal, book])
    return (
        <>
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {data.map(book => {
                                        return (
                                            book.shelf === "currentlyReading" && (
                                                <li key={book.id}>
                                                    <div className="book" >
                                                        <div className="book-top">
                                                            <div className="book-cover" onClick={() => showBookInfo(book.id)} style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                            <div className="book-shelf-changer">
                                                                <select id={book.id} onChange={(e) => { handleChange(book, e) }} value={book.shelf}>
                                                                    <option value="move" disabled>Move to...</option>
                                                                    <option value="currentlyReading">Currently Reading</option>
                                                                    <option value="wantToRead">Want to Read</option>
                                                                    <option value="read">Read</option>
                                                                    <option value="none">None</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="book-title">{book.title}</div>
                                                        <div className="book-authors">{book.authors.map((author, i) => <p key={i} className='author'>{author}</p>)}</div>
                                                    </div>
                                                </li>
                                            )
                                        )
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {data.map(book => {
                                        return (
                                            book.shelf === "wantToRead" && (
                                                <li key={book.id}>
                                                    <div className="book">
                                                        <div className="book-top">
                                                            <div className="book-cover" onClick={() => showBookInfo(book.id)} style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                                            <div className="book-shelf-changer">
                                                                <select id={book.id} value={book.shelf} onChange={(e) => { handleChange(book, e) }} >
                                                                    <option value="move" disabled>Move to...</option>
                                                                    <option value="currentlyReading">Currently Reading</option>
                                                                    <option value="wantToRead">Want to Read</option>
                                                                    <option value="read">Read</option>
                                                                    <option value="none">None</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="book-title">{book.title}</div>
                                                        <div className="book-authors">{book.authors.map((author, i) => <p key={i} className='author'>{author}</p>)}</div>
                                                    </div>
                                                </li>
                                            )
                                        )
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {data.map(book => {
                                        return (
                                            book.shelf === "read" && (
                                                <li key={book.id}>
                                                    <div className="book" >
                                                        <div className="book-top">
                                                            <div className="book-cover" onClick={() => showBookInfo(book.id)} style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                                            <div className="book-shelf-changer">
                                                                <select id={book.id} onChange={(e) => { handleChange(book, e) }} value={book.shelf}>
                                                                    <option value="move" disabled>Move to...</option>
                                                                    <option value="currentlyReading">Currently Reading</option>
                                                                    <option value="wantToRead">Want to Read</option>
                                                                    <option value="read">Read</option>
                                                                    <option value="none">None</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="book-title">{book.title}</div>
                                                        <div className="book-authors">{book.authors.map((author, i) => <p key={i} className='author'>{author}</p>)}</div>
                                                    </div>
                                                </li>
                                            )
                                        )
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link className='button' to="/SearchPage">SearchPage</Link>
                </div>
            </div>
        </>
    )
}

export default Home