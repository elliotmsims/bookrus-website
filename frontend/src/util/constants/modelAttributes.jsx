/* eslint-disable import/prefer-default-export */
export const modelAttributes = {
  Books: {
    book_title: "Title",
    book_author: "Author",
    book_language: "Language",
    book_categories: "Genre",
    book_pages: "Length",
  },
  Authors: {
    author_name: "Author Name",
    author_top_work: "Best Work",
    author_work_count: "Work Count",
    author_genre: "Main Genre",
    author_nationality: "Nationality",
  },
  Countries: {
    country_name: "Country Name",
    country_region: "Region",
    country_population: "Population",
    country_lat: "Latitude",
    country_long: "Longitude",
  },
};

export const modelSpecialAttributes = {
  Books: {
    name: "book_title",
    image: "book_image",
    id: "book_id",
  },
  Authors: {
    name: "author_name",
    image: "author_image",
    id: "author_id",
  },
  Countries: {
    name: "country_name",
    image: "country_image",
    id: "country_id",
  },
};
