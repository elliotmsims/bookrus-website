import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Accordion,
  Table,
  Button,
} from "react-bootstrap";
import hrithik from "../../assets/member-images/hrithik.jpg";
import francis from "../../assets/member-images/francis.jpg";
import elliot from "../../assets/member-images/elliot.jpg";
import matthew from "../../assets/member-images/matthew.jpg";
import william from "../../assets/member-images/william.jpg";
import postman from "../../assets/documentation-images/postman.jpg";
import gitlab from "../../assets/documentation-images/gitlab.jpg";
import gbooks from "../../assets/api-images/googlebooks.png";
import wbank from "../../assets/api-images/worldbank.jpg";
import openlib from "../../assets/api-images/openlib.jpg";
import wiki from "../../assets/api-images/wiki.png";
import awsA from "../../assets/tools-images/awsA.png";
import awsEB from "../../assets/tools-images/awsEB.png";
import black from "../../assets/tools-images/black.png";
import discord from "../../assets/tools-images/discord.png";
import docker from "../../assets/tools-images/docker.png";
import eslint from "../../assets/tools-images/eslint.png";
import flask from "../../assets/tools-images/flask.png";
import namecheap from "../../assets/tools-images/namecheap.png";
import prettier from "../../assets/tools-images/prettier.png";
import react from "../../assets/tools-images/react.png";
import reactb from "../../assets/tools-images/reactb.png";
import reactr from "../../assets/tools-images/reactr.png";
import sqla from "../../assets/tools-images/sqla.png";
import "./styles.css";

const lightbackground = {
  backgroundColor: "white",
};

// "#997554"

class Member {
  constructor(name, username, image, bio, unittests, role) {
    this.name = name;
    this.username = username;
    this.commits = 0;
    this.issues = 0;
    this.image = image;
    this.bio = bio;
    this.unittests = unittests;
    this.role = role;
  }
}

const allInfo = [
  new Member(
    "Hrithik Ramganesh",
    "Hrithikr",
    hrithik,
    "I am a junior at the University of Texas at Austin. My favorite hobbies include watching netflix and playing a lot of basketball. I am fluent in python, java, and c++ for the most part.",
    0,
    "Frontend"
  ),
  new Member(
    "Francisco Reyna",
    "Francis0312",
    francis,
    "I am a third year computer science major at UT Austin. I am focusing on the backend of this project because I am proficient in Python and have used it during my time at Microsoft.",
    0,
    "Frontend"
  ),
  new Member(
    "Elliot Sims",
    "elliotsims",
    elliot,
    "I'm a third year CS major at UT Austin. My hometown is Montgomery, Texas which is north of Houston and birthplace of the Texas flag. I love the mountains and enjoy snowboarding in some good powder snow!",
    0,
    "Frontend"
  ),
  new Member(
    "Matthew Escobar",
    "Matt594",
    matthew,
    "Heyo, my name is Matthew Escobar and I’m a junior computer science major at the University of Texas at Austin. I’m a gamer at heart and I have a passion for meeting people. I’m versed in C, Java, and Python and I aspire to use my CS skills through artificial intelligence.",
    6,
    "Frontend"
  ),
  new Member(
    "William Eng",
    "willeng37",
    william,
    "I’m a junior CS major at the University of Texas at Austin. Outside of school, I like to play video games, cook and juggle. I have experience with Java, C, and Python, but am constantly seeking to learn more outside of my expertise.",
    28,
    "Frontend"
  ),
];

const dataSources = [
  {
    name: "Google Book API",
    url: "https://developers.google.com/books/docs/overview",
    description: "Gives book info and images",
    image: gbooks,
  },
  {
    name: "World Bank API",
    url: "https://datahelpdesk.worldbank.org/knowledgebase/articles/898590-country-api-queries",
    description: "Gives country info including their region",
    image: wbank,
  },
  {
    name: "Open Library API",
    url: "https://openlibrary.org/developers/api",
    description: "Gives book and author info",
    image: openlib,
  },
  {
    name: "Wiki API",
    url: "https://www.mediawiki.org/wiki/API:Main_page",
    description: "Multiple wikipedia apis to get long descriptions of objects",
    image: wiki,
  },
];

const tools = [
  {
    name: "React",
    url: "https://reactjs.org/",
    description: "JS library to build the frontend",
    image: react,
  },
  {
    name: "React-Bootstrap",
    url: "https://react-bootstrap.github.io/",
    description: "Provides Bootstrap as React components",
    image: reactb,
  },
  {
    name: "React-Router",
    url: "https://reactrouter.com/",
    description: "Enables navigation between pages",
    image: reactr,
  },
  {
    name: "Prettier",
    url: "https://prettier.io/",
    description: "Code formater used for frontend",
    image: prettier,
  },
  {
    name: "Eslint/Eslint-Config-Airbnb",
    url: "https://eslint.org/",
    description: "Linter for JS/JSX",
    image: eslint,
  },
  {
    name: "Postman",
    url: "https://www.postman.com/",
    description: "Used to document our API",
    image: postman,
  },
  {
    name: "Namecheap",
    url: "https://react-bootstrap.github.io/",
    description: "Domain provider and register",
    image: namecheap,
  },
  {
    name: "AWS Amplify",
    url: "https://aws.amazon.com/amplify/",
    description: "Hosting service for the website",
    image: awsA,
  },
  {
    name: "Gitlab",
    url: "https://about.gitlab.com/",
    description: "Version control system",
    image: gitlab,
  },
  {
    name: "Discord",
    url: "https://discord.com/",
    description: "Communication platform with video share",
    image: discord,
  },
  {
    name: "Flask",
    url: "https://flask.palletsprojects.com/en/2.1.x/",
    description: "Python framework for backend",
    image: flask,
  },
  {
    name: "SQL Alchemy",
    url: "https://www.sqlalchemy.org/",
    description: "Python SQL toolkit",
    image: sqla,
  },
  {
    name: "AWS Elastic-Beanstalk",
    url: "https://aws.amazon.com/elasticbeanstalk/",
    description: "Hosting for backend db",
    image: awsEB,
  },
  {
    name: "Black",
    url: "https://pypi.org/project/black/",
    description: "Python code formatter",
    image: black,
  },
  {
    name: "Docker",
    url: "https://www.docker.com/",
    description: "Package applications into containers",
    image: docker,
  },
];

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["user"] }] */

// About page
export default function About() {
  const [baseUserData] = useState(allInfo);
  const [commitData, setCommitData] = useState(0);
  const [issueData, setIssueData] = useState(0);
  useEffect(() => {
    const getCommits = async () => {
      await axios
        .get(
          "https://gitlab.com/api/v4/projects/33828757/repository/contributors"
        )
        .then((response) => response.data)
        .then((data) => {
          let commits = 0;
          data.forEach((user) => {
            const mem = baseUserData.find(
              (con) => con.username === user.name || con.name === user.name
            );
            if (mem !== undefined) {
              mem.commits += user.commits;
              commits += user.commits;
            }
          });
          setCommitData(commits);
        });
    };
    getCommits();
  }, []);

  useEffect(() => {
    const getIssues = async () => {
      let issues = 0;
      Promise.all(
        baseUserData.map(async (user) => {
          await axios
            .get(
              `https://gitlab.com/api/v4/projects/33828757/issues_statistics?author_username=${user.username}`
            )
            .then((response) => response.data)
            .then((data) => {
              user.issues = data.statistics.counts.all;
              issues += user.issues;
            });
        })
      ).then(() => {
        setIssueData(issues);
      });
    };
    getIssues();
  }, []);
  return (
    <div style={lightbackground}>
      <Container>
        <br />
        <h2>Project Info</h2>
        <Row>
          <Accordion flush alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Objective</Accordion.Header>
              <Accordion.Body>
                BooksRUs exists to emphasize the literary contributions of
                different cultures around the world. The app will include
                information regarding famous publications around the globe,
                their authors, and the countries they hale from. The vision of
                BooksRUs is to connect and spread knowledge from distant
                lifestyles and faraway populations to others through sharing
                inspiring stories, insightful biographies, and cross-country
                cultural exchange. This is because, ultimately, the more learned
                we are of each other, the more mindful we are of the ways the
                world work.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Integration</Accordion.Header>
              <Accordion.Body>
                Connecting books to their authors is not too interesting.
                However, once we integrated the author&apos;s country into the
                data model, we discovered how location and culture influences
                their writing. This additional context provides a deeper
                understanding between the reader and the book. Our website hopes
                to display these relationships and help readers learn more about
                their favoriate books/authors.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Phase Leaders</Accordion.Header>
              <Accordion.Body>
                <Table striped borderless hover variant="dark">
                  <thead>
                    <tr>
                      <th>Phase #</th>
                      <th>Name</th>
                      <th>GitLab ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Matthew Escobar</td>
                      <td>@matt594</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>William Eng</td>
                      <td>@willeng37</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Elliot Sims</td>
                      <td>@elliotsims</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Hrithik Ramganesh</td>
                      <td>@hrithikr</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Documentation</Accordion.Header>
              <Accordion.Body>
                <div className="d-grid gap-2">
                  <Button
                    variant="outline-dark"
                    href="https://documenter.getpostman.com/view/19701903/UVkvJYLx"
                    target="_blank"
                  >
                    API documentation from Postman
                  </Button>
                  <Button
                    variant="outline-dark"
                    href="https://gitlab.com/10AMGroup11/bookrus"
                    target="_blank"
                  >
                    Source code from Gitlab
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
        <h2>The Team</h2>
        <br />
        <Row
          md={3}
          className="mx-auto"
          style={{ justifyContent: "space-evenly" }}
        >
          {baseUserData.map((dev) => (
            <Col key={dev.name}>
              <Card style={{ border: "1px solid white" }}>
                <Card.Img
                  className="about-img"
                  variant="bot"
                  src={dev.image}
                  style={{ height: 370 }}
                />
                <Card.Body>
                  <Card.Title>{dev.name}</Card.Title>
                  <Card.Subtitle className="text-muted">
                    {dev.role}
                  </Card.Subtitle>
                  <br />
                  <Card.Subtitle className="text-muted">
                    GitLab: {dev.username}
                  </Card.Subtitle>
                  <Card.Text>{dev.bio}</Card.Text>
                  <ListGroup variant="flush">
                    <ListGroupItem>Commits: {dev.commits}</ListGroupItem>
                    <ListGroupItem>Issues: {dev.issues}</ListGroupItem>
                    <ListGroupItem>Tests: {dev.unittests}</ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
              <br />
            </Col>
          ))}
        </Row>
        <br />
        <Row>
          <Col>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Total Commits: {commitData}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Total Issues: {issueData}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Total Unit Tests: 34</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <h2>Data Sources/APIs</h2>
        <br />
        <Row
          md="auto"
          className="mx-auto"
          style={{ justifyContent: "space-evenly" }}
        >
          {dataSources.map((source) => (
            <Col key={source.name}>
              <Card
                className="text-center"
                style={{ width: "12rem", border: "1px solid white" }}
              >
                <Card.Img
                  variant="bot"
                  className="about-img"
                  src={source.image}
                  style={{ height: 200 }}
                />
                <Card.Body>
                  <Card.Title>{source.name}</Card.Title>
                  <Card.Text>{source.description}</Card.Text>
                  <Button
                    variant="outline-dark"
                    href={source.url}
                    target="_blank"
                  >
                    More Info
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <br />
        <h2>Tools</h2>
        <br />
        <Row
          md="auto"
          className="mx-auto"
          style={{ justifyContent: "space-evenly" }}
        >
          {tools.map((source) => (
            <Col
              key={source.name}
              className="cards"
              style={{ justifyContent: "space-evenly" }}
            >
              <Card
                className="text-center"
                style={{ width: "12rem", border: "1px solid white" }}
              >
                <Card.Img
                  variant="bot"
                  className="about-img"
                  src={source.image}
                  style={{ height: 200 }}
                />
                <Card.Body>
                  <Card.Title>{source.name}</Card.Title>
                  <Card.Text>{source.description}</Card.Text>
                  <Button
                    variant="outline-dark"
                    href={source.url}
                    target="_blank"
                  >
                    More Info
                  </Button>
                </Card.Body>
              </Card>
              <br />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
