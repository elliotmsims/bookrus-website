import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const book_json = {
    "book_count": 3,
    "books": [
        {
            "title": "1984",
            "author": "George Orwell",
            "synopsis": "It is 1984, and the worlds' three major powers-Oceania, Eurasia and Eastasia-are constantly at war. In Oceania, where the Party is in power, the thought police unearth every act of dissent, and Big Brother is always watching. Winston Smith, a dutiful citizen of Oceania, works for the Ministry of Truth as a propaganda writer who rewrites history to suit the needs of the authoritarian government. But when Winston falls in love with fellow worker Julia, they begin to question the very system they work for, placing them in immense danger. Pursuing their forbidden love affair, Winston plans a rebellion against the Party in order to regain the freedom to shape his own future. But the ever-watchful Big Brother will not tolerate opposition, and for those who speak up against the system or dare to think what the Party does not want them to think, Room 101 awaits them . . . 1984 is George Orwell's haunting prophesy of the future, which has held multiple generations of readers spellbound in its chilling and terrifying vision of life under a totalitarian regime. Powerful and unforgettable, this still-relevant novel explores the obliteration of truth, individuality and liberty in a world where the ruling power seeks to control everything, from information to thought and memory.",
            "image": "http://books.google.com/books/content?id=ag5ongEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        },
        {
            "title": "Hamlet",
            "author": "William Shakespeare",
            "synopsis": "Here are the books that help teach Shakespeare plays without the teacher constantly needing to explain and define Elizabethan terms, slang, and other ways of expression that are different from our own. Each play is presented with Shakespeare's original lines on each left-hand page, and a modern, easy-to-understand \"translation\" on the facing right-hand page. All dramas are complete, with every original Shakespearian line, and a full-length modern rendition of the text. These invaluable teaching-study guides also include: Helpful background information that puts each play in its historical perspective. Discussion questions that teachers can use to spark student class participation, and which students can use as springboards for their own themes and term papers. Fact quizzes, sample examinations, and other features that improve student comprehension of what each play is about.",
            "image": "http://books.google.com/books/content?id=TqpK54ASXGkC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        },
        {
            "title": "War and Peace",
            "author": "Leo Tolstoy",
            "synopsis": "Presents a new translation of the classic reflecting the life and times of Russian society during the Napoleonic Wars, in a book accompanied by an index of historical figures, textual annotation, a chapter summary, and an introduction.",
            "image": "http://books.google.com/books/content?id=bL3VlijouIwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        }
    ]
};

export function Model() {
    return(
        <div class="Model">
            <Outlet />
        </div>
    )
}

export function Books() {
    return(
        <div class="Books">
            <Container>
                <h1>Books!</h1>

                <h3>Number of books: {book_json.book_count}</h3>

                <Row>
                    <Col>Book Title</Col>
                    <Col>Book Author</Col>
                </Row>
                
                {book_json.books.map((book) => {
                    return(
                        <Row>
                            <Col>{book.title}</Col>
                            <Col>{book.author}</Col>
                        </Row>
                    )
                })}
            </Container>
            <Outlet />
        </div>
    )
}

export function Book() {
    let params = useParams();
    let book = getBook(parseInt(params.bookId, 10));
    return (
        <>
            <h1>Book: {book.title}</h1>

            <h3>Author: {book.author}</h3>

            <h3>Synopsis:</h3>

            <p>{book.synopsis}</p>

            <img src={book.image} alt={book.title} />
        </>
    )
}

export function getBook(bookId) {
    return book_json.books[bookId];
}

export function Authors() {
    return(
        <div class="Authors">
            <Container>
                <h2>Authors!</h2>
            </Container>
        </div>
    )
}

export function Countries() {
    return(
        <div class="Countries">
            <Container>
                <h1>Countries!</h1>
            </Container>
        </div>
    )
}