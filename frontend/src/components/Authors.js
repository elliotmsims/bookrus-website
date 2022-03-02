import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Outlet, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const author_json = {
  "authors": [
      {
          "author": "George Orwell",
          "books": "1984",
          "bio": "Eric Arthur Blair (25 June 1903 – 21 January 1950), known by his pen name George Orwell, was an English novelist, essayist, journalist and critic.[1] His work is characterised by lucid prose, biting social criticism, total opposition to totalitarianism, and outspoken support of democratic socialism.[2][3][4] Orwell produced literary criticism and poetry, fiction and polemical journalism. He is known for the allegorical novella Animal Farm (1945) and the dystopian novel Nineteen Eighty-Four (1949). His non-fiction works, including The Road to Wigan Pier (1937), documenting his experience of working-class life in the north of England, and Homage to Catalonia (1938), an account of his experiences soldiering for the Republican faction of the Spanish Civil War (1936–1939), are as critically respected as his essays on politics and literature, language and culture. In 2008, The Times ranked George Orwell second among \"The 50 greatest British writers since 1945\".[5] Orwell's work remains influential in popular culture and in political culture, and the adjective \"Orwellian\"—describing totalitarian and authoritarian social practices—is part of the English language, like many of his neologisms, such as \"Big Brother\", \"Thought Police\", \"Two Minutes Hate\", \"Room 101\", \"memory hole\", \"Newspeak\", \"doublethink\", \"unperson\", and \"thoughtcrime\",[6][7] as well as providing direct inspiration for the neologism \"groupthink\".",
          "image": "https://en.wikipedia.org/wiki/George_Orwell"
      },
      {
          "author": "William Shakespeare",
          "books": "Hamlet",
          "bio": "William Shakespeare (bapt. 26 April 1564 – 23 April 1616)[a] was an English playwright, poet and actor. He is widely regarded as the greatest writer in the English language and the world's greatest dramatist.[2][3][4] He is often called England's national poet and the \"Bard of Avon\" (or simply \"the Bard\").[5][b] His extant works, including collaborations, consist of some 39 plays,[c] 154 sonnets, three long narrative poems, and a few other verses, some of uncertain authorship. His plays have been translated into every major living language and are performed more often than those of any other playwright.[7] His works continue to be studied and reinterpreted. Shakespeare was born and raised in Stratford-upon-Avon, Warwickshire. At the age of 18, he married Anne Hathaway, with whom he had three children: Susanna and twins Hamnet and Judith. Sometime between 1585 and 1592, he began a successful career in London as an actor, writer, and part-owner of a playing company called the Lord Chamberlain's Men, later known as the King's Men. At age 49 (around 1613), he appears to have retired to Stratford, where he died three years later. Few records of Shakespeare's private life survive; this has stimulated considerable speculation about such matters as his physical appearance, his sexuality, his religious beliefs and whether the works attributed to him were written by others.[8][9][10] Shakespeare produced most of his known works between 1589 and 1613.[11][12][d] His early plays were primarily comedies and histories and are regarded as some of the best works produced in these genres. He then wrote mainly tragedies until 1608, among them Hamlet, Romeo and Juliet, Othello, King Lear, and Macbeth, all considered to be among the finest works in the English language.[2][3][4] In the last phase of his life, he wrote tragicomedies (also known as romances) and collaborated with other playwrights. Many of Shakespeare's plays were published in editions of varying quality and accuracy in his lifetime. However, in 1623, two fellow actors and friends of Shakespeare's, John Heminges and Henry Condell, published a more definitive text known as the First Folio, a posthumous collected edition of Shakespeare's dramatic works that included all but two of his plays.[13] Its Preface was a prescient poem by Ben Jonson that hailed Shakespeare with the now famous epithet: \"not of an age, but for all time\".[13]",
          "image": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg"
      },
      {
          "author": "Leo Tolstoy",
          "books": "War and Peace",
          "bio": "Count Lev Nikolayevich Tolstoy[note 1] (/ˈtoʊlstɔɪ, ˈtɒl-/;[2] Russian: Лев Николаевич Толстой,[note 2] IPA: [ˈlʲef nʲɪkɐˈla(j)ɪvʲɪtɕ tɐlˈstoj] (audio speaker iconlisten); 9 September [O.S. 28 August] 1828 – 20 November [O.S. 7 November] 1910), usually referred to in English as Leo Tolstoy, was a Russian writer who is regarded as one of the greatest authors of all time.[3] He received nominations for the Nobel Prize in Literature every year from 1902 to 1906 and for the Nobel Peace Prize in 1901, 1902, and 1909. That he never won is a major controversy.[4][5][6][7] Born to an aristocratic Russian family in 1828,[3] Tolstoy's notable works include the novels War and Peace (1869) and Anna Karenina (1878),[8] often cited as pinnacles of realist fiction.[3] He first achieved literary acclaim in his twenties with his semi-autobiographical trilogy, Childhood, Boyhood, and Youth (1852–1856), and Sevastopol Sketches (1855), based upon his experiences in the Crimean War. His fiction includes dozens of short stories and several novellas such as The Death of Ivan Ilyich (1886), Family Happiness (1859), \"After the Ball\" (1911), and Hadji Murad (1912). He also wrote plays and numerous philosophical essays. In the 1870s, Tolstoy experienced a profound moral crisis, followed by what he regarded as an equally profound spiritual awakening, as outlined in his non-fiction work A Confession (1882). His literal interpretation of the ethical teachings of Jesus, centering on the Sermon on the Mount, caused him to become a fervent Christian anarchist and pacifist.[3] His ideas on nonviolent resistance, expressed in such works as The Kingdom of God Is Within You (1894), had a profound impact on such pivotal 20th-century figures as Mahatma Gandhi[9] and Martin Luther King Jr.[10] He also became a dedicated advocate of Georgism, the economic philosophy of Henry George, which he incorporated into his writing, particularly Resurrection (1899).",
          "image": "https://upload.wikimedia.org/wikipedia/commons/c/c6/L.N.Tolstoy_Prokudin-Gorsky.jpg"
      }
  ]
};

export function Authors() {
    return(
      <div class="Authors">
        <Container>
            <h1>Authors!</h1>

            <h3>Number of authors: {author_json.authors.length}</h3>

            <Row>
                <Col>Author Name</Col>
                <Col>Author Books</Col>
            </Row>
            
            {author_json.authors.map((author, index) => {
                return(
                    <Row>
                        <Col>
                            <Link to={`/authors/${index}`}>{author.author}</Link>
                        </Col>
                        <Col>{author.books}</Col>
                    </Row>
                )
            })}
        </Container>
      <Outlet />
      </div>
    )
}

export function Author() {
  let params = useParams();
  let author = getAuthor(parseInt(params.authorId, 10));
  return (
      <>
          <h1>Author: {author.author}</h1>

          <h3>Books: {author.books}</h3>

          <h3>Bio:</h3>

          <p>{author.bio}</p>

          <img src={author.image} alt={author.author} width="180" height="256"/>
      </>
  )
}

export function getAuthor(authorId) {
  return author_json.authors[authorId];
}