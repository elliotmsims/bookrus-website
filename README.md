1. 10AM Group 11

2. Hrithik Ramganesh, Matthew Escobar, William Eng, Francisco Reyna, Elliot Sims

3. BooksRUs

4. https://gitlab.com/10AMGroup11/cs373-idb

5. BooksRUs exists to emphasize the literary contributions of different cultures around the world. The app will include information
regarding famous publications around the globe, their authors, and the countries they hale from. The vision of BooksRUs is to connect
and spread knowledge from distant lifestyles and faraway populations to others through sharing inspiring stories, insightful biographies, 
and cross-country cultural exchange. This is because, ultimately, the more learned we are of each other, the more mindful we are of
the ways the world work.

6. URLs of at least three disparate data sources that you will programmatically scrape using a RESTful API (be very sure about this)
  https://developers.google.com/books/docs/overview
  https://en.wikipedia.org/wiki/List_of_novelists_by_nationality
  https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population
  https://pypi.org/project/Wikidata/
  https://rapidapi.com/natkapral/api/countries-cities/

7. Our three models are:
  * Authors
  * Books
  * Countries

8. Number of Instances Estimate:
  Authors: 400
  Books: 800
  Countries: 100

9. Model Attributes:
  * Authors:
    * Name
    * Nationality
    * Age
    * Gender
    * Publications
    * Awards
    * Genre(s)
    * Biography
  * Books:
      * Title
      * Author
      * Genre
      * Publisher
      * Publish Date
      * Description
      * Language
  * Countries:
      * Name
      * Code
      * Wikipedia Entry
      * Flag
      * Territories
      * Languages
      * Population
      * Area

10. Sortable Attributes:
  * Authors
    Nationality, Gender, Genre(s), Age, Language, 
  * Books
    Author, Date Published, Language, Genre, Title
  * Countries
    Coordinates, Book, Code, Language, Population

11. describe at least five additional attributes for each model that you could search for on the instance pages
each model must connect to at least two other models.
  * Authors
    Biography, Publications, Awards, Nationality, Name
  * Books
    Summary, Series, Pages, Publisher, Maturity Rating, Print Type, Country, Author
  * Countries
    Capitol, Authors, Books, Cities, Currency

12. each model must be rich with different media (e.g., feeds, images, maps, text, videos, etc.) (be very sure about this)
  * Author
    * Background
      * Birthplace
      * Childhood
      * Adulthood
      * Publications
    * Image
  * Book
    * Synopsis
    * Image
  * Countries
    * Description
    * Geographic Map
    * Capitol Image
    * Flag

13. describe at least two types of media for each model that you could display on the instance pages
  For each model, we will display both images and textual descriptions upon the instance pages. Text
  will serve the purpose of enriching the reader with information regarding who the author is/was, what
  the book is about, and what the culture of the country they're from is like. Images will grant the
  reader a stronger feel of who the author was, how the book appears, and what living in the author's
  home country must have felt like.

14. what three questions will you answer due to doing this data synthesis on your site?
  * Who are the most influential authors and works coming out of this country?
  * What cultural background inspired this author to write this book?
  * Why is one author's literature different from another's?
