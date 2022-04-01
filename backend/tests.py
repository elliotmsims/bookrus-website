import unittest
import requests


class TestFlaskBackend(unittest.TestCase):
    def setUp(self):
        self.headers = {"Accept": "application/vnd.api+json"}

    def testAuthorAll(self):
        response = requests.get("https://api.bookrus.me/author", headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_json = response.json()
        self.assertEqual(len(response_json["data"]), 10)

    def testAuthorById(self):
        response = requests.get("https://api.bookrus.me/author/1", headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_json = response.json()
        self.assertEqual(response_json["data"]["attributes"]["author_id"], 1)

    def testCountryAll(self):
        response = requests.get("https://api.bookrus.me/country", headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_json = response.json()
        self.assertEqual(len(response_json["data"]), 10)

    def testCountryById(self):
        response = requests.get(
            "https://api.bookrus.me/country/1", headers=self.headers
        )
        self.assertEqual(response.status_code, 200)
        response_json = response.json()
        self.assertEqual(response_json["data"]["attributes"]["country_id"], 1)

    def testBookAll(self):
        response = requests.get("https://api.bookrus.me/book", headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_json = response.json()
        self.assertEqual(len(response_json["data"]), 10)

    def testBookById(self):
        response = requests.get("https://api.bookrus.me/book/1", headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_json = response.json()
        self.assertEqual(response_json["data"]["attributes"]["book_id"], 1)


if __name__ == "__main__":
    unittest.main()
