import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
const SearchPage = () => {
    const [data, setData] = useState([])
    const [getAllData, setGetAllData] = useState([])
    const [searchVal, setSearchVal] = useState('')
    const [seletedVal, setSeletedVal] = useState('');
    const [book, setBook] = useState({})

    const getAllBooks = () => {
        BooksAPI.getAll().then(data => setGetAllData(data.filter(book => book.shelf)));
    }

    const handleChange = (e) => {
        setSearchVal(e.target.value.trim())
        BooksAPI.search(e.target.value.trim()).then(data => {
            if (e.target.value === '') {
                setData([])
            } else {
                let newDate = data.filter((book, i) => book.hasOwnProperty('imageLinks'))
                setData(newDate);
                data.forEach((book, i) => {
                    for (let homeData in getAllData) {
                        if (book.id === getAllData[homeData].id) {
                            book.shelf = getAllData[homeData].shelf
                        }
                    }
                })

            }
        })
    }
    const handleSelection = (book, e) => {
        setSeletedVal(e.target.value)
        if (book.hasOwnProperty('shelf')) {
            setBook(book)
            updateApi(book, e.target.value)
        } else {
            book.shelf = e.target.value
            setBook(book)
            updateApi(book, e.target.value)

        }
    }
    const updateApi = (book, seletedVal) => {
        BooksAPI.update(book, seletedVal)

    }
    useEffect(() => {
        getAllBooks();

    }, [seletedVal, setSeletedVal, book, searchVal])



    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">Home</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={handleChange} />

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {data?.map(book => {
                        return <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks?.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select id={book.id} onChange={(e) => { handleSelection(book, e) }} value={book.shelf}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors?.map((author, i) => <p key={i} className='author'>{author}</p>)}</div>
                            </div>

                        </li>
                    })}
                </ol>
            </div>
        </div>
    )
}

export default SearchPage