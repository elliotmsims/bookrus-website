import app
import unittest
import json

class TestFlaskBackend(unittest.TestCase):
    def setUp(self):
        app.app.config["TESTING"] = True
        self.client = app.app.test_client()

    def testAuthorAll(self):
        with self.client:
            response = self.client.get("/authors")
            self.assertEqual(response.status_code, 200)
            res_json = json.loads(response.data)
            self.assertEqual(len(res_json["data"]), 10)

    def testAuthorById(self):
        with self.client:
            response = self.client.get("/authors/1")
            self.assertEqual(response.status_code, 200)
            res_json = json.loads(response.data)
            self.assertEqual(res_json["author_id"], 1)

    def testCountryAll(self):
        with self.client:
            response = self.client.get("/countries")
            self.assertEqual(response.status_code, 200)
            res_json = json.loads(response.data)
            self.assertEqual(len(res_json["data"]), 10)

    def testCountryById(self):
        with self.client:
            response = self.client.get("/countries/2")
            self.assertEqual(response.status_code, 200)
            res_json = json.loads(response.data)
            self.assertEqual(res_json["country_id"], 2)

    def testBookAll(self):
        with self.client:
            response = self.client.get("/books")
            self.assertEqual(response.status_code, 200)
            res_json = json.loads(response.data)
            self.assertEqual(len(res_json["data"]), 10)

    def testBookById(self):
        with self.client:
            response = self.client.get("/books/1")
            self.assertEqual(response.status_code, 200)
            res_json = json.loads(response.data)
            self.assertEqual(res_json["book_id"], 1)


if __name__ == "__main__":
    unittest.main()
