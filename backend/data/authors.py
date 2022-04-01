from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import json
import credentials
import wikipediaapi
import urllib
from os.path import exists

# TODO Add cross-model data to db
# Books to authors
# Books to countries
# Authors to books
# Authors to countries
# Countries to authors
# Countries to books

app = Flask(__name__)
app.debug = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config["SQLALCHEMY_DATABASE_URI"] = credentials.db_login
db = SQLAlchemy(app)

# Define Author table/data model
class Author(db.Model):
    author_id = db.Column(db.Integer, primary_key=True)
    author_name = db.Column(db.String())
    author_birth_date = db.Column(db.String())
    author_death_date = db.Column(db.String())
    author_top_work = db.Column(db.String())
    author_work_count = db.Column(db.Integer)
    author_bio = db.Column(db.String())
    author_image = db.Column(db.String())


def __init__(
    self,
    author_name="NaN",
    author_birth_date="NaN",
    author_death_date="NaN",
    author_top_work="NaN",
    author_work_count=0,
    author_bio="NaN",
    author_image="NaN",
):
    self.author_name = author_name
    self.author_birth_date = author_birth_date
    self.author_death_date = author_death_date
    self.author_top_work = author_top_work
    self.author_work_count = author_work_count
    self.author_bio = author_bio
    self.author_image = author_image


db.create_all()

# Read CSV
# csv.field_size_limit(sys.maxsize)
# author_list = []
# author_set = set()
# with open('ol_dump_authors_2022-03-02_processed.csv', 'r') as file:
#     reader = csv.reader(file, delimiter="\t")
#     for row in reader:
#         s = row[-1].replace('|','')
#         data = json.loads(s)
#         if 'name' in data and 'birth_date' in data:
#             if data['name'] not in author_set:
#                 new_author = Author(author_name=data["name"], author_birth_date=data["birth_date"])
#                 author_list.append(new_author)
#                 author_set.add(data['name'])

# Read TXT
lists = [
    "List of American novelists.txt",
    "List of Australian novelists.txt",
    "List of English novelists.txt",
    "List of French novelists.txt",
    "List of Korean novelists.txt",
    "List of novelists by nationality.txt",
    "List of Scottish novelists.txt",
]
wiki = wikipediaapi.Wikipedia("en")


def load_file_position():
    with open("position.txt", "r") as file:
        text_and_line = (
            lists.index(file.readline().replace("\n", "")),
            int(file.readline()),
        )
    return text_and_line


def check_categories_keyword(page):
    for cat in page.categories.keys():
        if "novelists" in cat or "writer" in cat:
            return True
    return False


author_list = []
author_set = set()
position = (0, 0)
if exists("position.txt"):
    position = load_file_position()
for x in range(int(position[0]), len(lists)):
    i = position[1]
    texts = lists[x]
    with open(texts, "r") as file:
        fulltext = file.readlines()
        for y in range(int(position[1]), len(fulltext)):
            i += 1
            line = fulltext[y]
            name = line.partition(":")[0]
            str = urllib.parse.quote(name, safe="")
            request_url = "https://openlibrary.org/search/authors.json?q=" + str
            r = urllib.request.urlopen(request_url)
            data = json.loads(r.read())
            if data["numFound"] == 0:
                continue
            else:
                item = data["docs"][0]
                if item["name"] not in author_set:
                    page = wiki.page(name)
                    if not check_categories_keyword(page):
                        print(name)
                        continue
                    new_author = Author(author_name=name, author_bio=page.summary)
                    if "birth_date" in item:
                        new_author.author_birth_date = item["birth_date"]
                    if "death_date" in item:
                        new_author.author_death_date = item["death_date"]
                    if "top_work" in item:
                        new_author.author_top_work = item["top_work"]
                    if "work_count" in item:
                        new_author.author_work_count = item["work_count"]
                    request_img_url = (
                        "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles="
                        + str
                        + "&piprop=original"
                    )
                    ri = urllib.request.urlopen(request_img_url)
                    image = json.loads(ri.read())
                    key = list(image["query"]["pages"].keys())[0]
                    image_id = image["query"]["pages"][key]
                    if "original" in image_id:
                        new_author.author_image = image_id["original"]["source"]
                    author_list.append(new_author)
                    author_set.add(item["name"])
            if len(author_list) % 100 == 0:
                db.session.add_all(author_list)
                db.session.commit()
                with open("position.txt", "w") as pos:
                    print(texts, file=pos)
                    print(i, file=pos)
    position = (x + 1, 0)

db.session.add_all(author_list)
db.session.commit()
