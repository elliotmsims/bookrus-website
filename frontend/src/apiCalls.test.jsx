// Jest test file for apiCalls
const api = require('./apiCalls')

test('API Call to get all countries (1st page) is successful', () => {
    const data = api.getCountries(1);
    expect(data).toBeDefined();
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBe(10);
});

test('API Call to get a single country instance is successful', () => {
    const data = api.getCountry(2);
    expect(data).toBeDefined();
    expect(data).toBeInstanceOf(Object);
});

test('API Call to get all authors (1st page) is successful', () => {
    const data = api.getAuthors(1);
    expect(data).toBeDefined();
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBe(10);
});

test('API Call to get a single author instance is successful', () => {
    const data = api.getAuthor(2);
    expect(data).toBeDefined();
    expect(data).toBeInstanceOf(Object);
});

test('API Call to get all books (1st page) is successful', () => {
    const data = api.getBooks(1);
    expect(data).toBeDefined();
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBe(10);
});

test('API Call to get a single book instance is successful', () => {
    const data = api.getBook(2);
    expect(data).toBeDefined();
    expect(data).toBeInstanceOf(Object);
});