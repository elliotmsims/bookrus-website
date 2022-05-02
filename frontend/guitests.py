import unittest
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

# Based on code from https://nander.cc/using-selenium-within-a-docker-container
class TestFrontendGui(unittest.TestCase):
    def setUp(self):
        self.url = "https://www.bookrus.me"

    def createDriver(self):
        chrome_options = Options()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_prefs = {}
        chrome_options.experimental_options["prefs"] = chrome_prefs
        # Disable images
        chrome_prefs["profile.default_content_settings"] = {"images": 2}
        return webdriver.Chrome(options=chrome_options)

    def testNavBarListing(self):
        expected_navbar = ["books", "authors", "countries", "visualizations", "provider visualizations", "search", "about"]
        driver = self.createDriver()
        driver.get(self.url)
        # Check if navbar buttons are listed
        navbar = driver.find_elements(by=By.XPATH, value="//a[@class='nav-link']")
        index = 0
        for option in navbar:
            option_text = option.get_attribute("innerHTML").lower()
            self.assertEqual(option_text, expected_navbar[index])
            index = index + 1

        driver.quit()

    def testNavBarButtons(self):
        driver = self.createDriver()
        driver.get(self.url)
        # Check if one of the navbar buttons are working
        navbar = driver.find_elements(by=By.XPATH, value="//a[@class='nav-link']")
        # Navigate to about page by clicking on button
        option = navbar[0]
        option_text = option.get_attribute("innerHTML").lower()
        driver.execute_script("arguments[0].click();", option)
        self.assertEqual(driver.current_url, self.url + "/" + option_text)
        driver.quit()

    def testAboutNavigation(self):
        driver = self.createDriver()
        driver.get(self.url + "/about")
        # Check for naked links (non-hyperlinks)
        links = driver.find_elements(by=By.TAG_NAME, value="a")
        for link in links:
            self.assertNotEqual(link.get_attribute("href"), link.text)
        driver.quit()

    def testBookNavigation(self):
        driver = self.createDriver()
        driver.get(self.url + "/books")
        # Check that the number of books listed is not 0
        count_elem = driver.find_element(by=By.XPATH, value="//span[@class='badge rounded-pill text-dark bg-light']")
        count_text = count_elem.get_attribute("innerHTML")
        pattern = re.findall("[0-9]+", count_text)
        count = pattern[2]
        self.assertNotEqual(count, "0")
        driver.quit()

    def testBookCardNavigation(self):
        # Keep track of original URL
        listing_url = self.url + "/books"
        driver = self.createDriver()
        driver.get(listing_url)
        # Check that the instances listed have a button to instance page
        container = driver.find_element(by=By.XPATH, value="//div[@class='Books']")
        card_elem = container.find_elements(by=By.XPATH, value="//div[@class='row row-cols-md-4 row-cols-2']//div[@class='row']")
        card_elem[0].click()
        self.assertNotEqual(driver.current_url, listing_url)
        driver.quit()

    def testBookInstanceNavigation(self):
        driver = self.createDriver()
        driver.get(self.url + "/books/1")
        # Check that the author linked is named
        author_elem = driver.find_element(by=By.TAG_NAME, value="h3")
        author_link = author_elem.find_element(by=By.TAG_NAME, value="a")
        self.assertNotEqual(author_link.text, "")
        driver.quit()

    def testAuthorNavigation(self):
        driver = self.createDriver()
        driver.get(self.url + "/authors")
        # Check that the number of authors listed is not 0
        count_elem = driver.find_element(by=By.XPATH, value="//span[@class='badge rounded-pill text-dark bg-light']")
        count_text = count_elem.get_attribute("innerHTML")
        pattern = re.findall("[0-9]+", count_text)
        count = pattern[2]
        self.assertNotEqual(count, "0")
        driver.quit()

    def testAuthorTableNavigation(self):
        listing_url = self.url + "/authors"
        driver = self.createDriver()
        driver.get(listing_url)
        # Check that the instances listed have a button to instance page
        container = driver.find_element(by=By.XPATH, value="//div[@class='Authors']")
        table_elem = container.find_element(by=By.TAG_NAME, value="tbody")
        button_elem = table_elem.find_elements(by=By.TAG_NAME, value="tr")
        driver.execute_script("arguments[0].scrollIntoView();", button_elem[0])
        driver.execute_script("arguments[0].click();", button_elem[0])
        self.assertNotEqual(driver.current_url, listing_url)
        driver.quit()

    def testAuthorInstanceNavigation(self):
        driver = self.createDriver()
        driver.get(self.url + "/authors/1")
        # Check that the nationality linked is named
        author_elem = driver.find_element(by=By.TAG_NAME, value="h3")
        author_link = author_elem.find_element(by=By.TAG_NAME, value="a")
        self.assertNotEqual(author_link.text, "")
        driver.quit()

    def testCountryNavigation(self):
        driver = self.createDriver()
        driver.get(self.url + "/countries")
        # Check that the number of countries listed is not 0
        count_elem = driver.find_element(by=By.XPATH, value="//span[@class='badge rounded-pill text-dark bg-light']")
        count_text = count_elem.get_attribute("innerHTML")
        pattern = re.findall("[0-9]+", count_text)
        count = pattern[2]
        self.assertNotEqual(count, "0")
        driver.quit()

    def testCountryCardNavigation(self):
        listing_url = self.url + "/countries"
        driver = self.createDriver()
        driver.get(listing_url)
        # Check that the instances listed have a button to instance page
        container = driver.find_element(by=By.XPATH, value="//div[@class='Countries']")
        card_elem = container.find_elements(by=By.XPATH, value="//div[@class='row row-cols-md-4 row-cols-2']//div[@class='row']")
        card_elem[0].click()
        self.assertNotEqual(driver.current_url, listing_url)
        driver.quit()

    def testCountryInstanceNavigation(self):
        driver = self.createDriver()
        driver.get(self.url + "/countries/2")
        # Check that at least 1 author linked is named
        author_elem = driver.find_element(by=By.TAG_NAME, value="h3")
        author_link = author_elem.find_element(by=By.TAG_NAME, value="a")
        self.assertNotEqual(author_link.text, "")
        driver.quit()


if __name__ == "__main__":
    unittest.main()
