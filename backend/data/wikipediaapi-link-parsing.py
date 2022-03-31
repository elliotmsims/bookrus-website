import wikipediaapi


def print_links(page, file):
    links = page.links
    for title in sorted(links.keys()):
        try:
            print("%s\t%s\t%s" % (title, links[title], links[title].fullurl), file=file)
        except:
            pass


wiki = wikipediaapi.Wikipedia("en")
lists = [
    "List of American novelists",
    "List of Australian novelists",
    "List of English novelists",
    "List of French novelists",
    "List of Korean novelists",
    "List of novelists by nationality",
    "List of Scottish novelists",
]

for s in lists:
    page = wiki.page(s)
    with open(s + ".txt", "a") as file:
        print_links(page, file)
