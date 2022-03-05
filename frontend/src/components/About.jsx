import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import hrithik from "../assets/hrithik.jpg";
import francis from "../assets/francis.jpg";
import elliot from "../assets/elliot.jpg";
import matthew from "../assets/matthew.jpg";
import william from "../assets/william.jpg";

import "bootstrap/dist/css/bootstrap.min.css";

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
    "francis0312",
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
    0,
    "Frontend"
  ),
  new Member(
    "William Eng",
    "willeng37",
    william,
    "I’m a junior CS major at the University of Texas at Austin. Outside of school, I like to play video games, cook and juggle. I have experience with Java, C, and Python, but am constantly seeking to learn more outside of my expertise.",
    0,
    "Frontend"
  ),
];

const dataSources = [
  {
    name: "Google Book API",
    url: "https://developers.google.com/books/docs/overview",
    description: "Gives book info and images",
  },
  {
    name: "Geo Country API",
    url: "https://rapidapi.com/natkapral/api/countries-cities/",
    description: "Gives country info and link to their wiki",
  },
  {
    name: "World Bank Country/Region API",
    url: "https://datahelpdesk.worldbank.org/knowledgebase/articles/898590-country-api-queries",
    description: "Gives country info including their region",
  },
  {
    name: "Open Library API",
    url: "https://openlibrary.org/developers/api",
    description: "Gives book and author info",
  },
  {
    name: "Wiki API",
    url: "https://www.mediawiki.org/wiki/API:Main_page",
    description: "Multiple wikipedia apis to get long descriptions of objects",
  },
];

const tools = [
  {
    name: "React",
    url: "https://reactjs.org/",
    description: "JS library to build the frontend",
  },
  {
    name: "React-Bootstrap",
    url: "https://react-bootstrap.github.io/",
    description: "Provides Bootstrap as React components",
  },
  {
    name: "React-Router",
    url: "https://reactrouter.com/",
    description: "Enables navigation between pages",
  },
  {
    name: "Prettier",
    url: "https://prettier.io/",
    description: "Code formater used for all files",
  },
  {
    name: "Eslint/Eslint-Config-Airbnb",
    url: "https://eslint.org/",
    description: "Linter for JS/JSX",
  },
  {
    name: "Postman",
    url: "https://www.postman.com/",
    description: "Used to document our API",
  },
  {
    name: "Namecheap",
    url: "https://react-bootstrap.github.io/",
    description: "Domain provider and register",
  },
  {
    name: "AWS Amplify",
    url: "https://aws.amazon.com/amplify/",
    description: "Hosting service for the website",
  },
  {
    name: "Gitlab",
    url: "https://about.gitlab.com/",
    description: "Version control system",
  },
  {
    name: "Discord",
    url: "https://discord.com/",
    description: "Communication platform with video share",
  },
];

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["user"] }] */

// About page
export default function About() {
  const [baseUserData] = useState(allInfo);
  const [commitData, setCommitData] = useState(0);
  const [issueData, setIssueData] = useState(0);
  const [unitData] = useState(0);

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
              (con) => con.username === user.username || con.name === user.name
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
    <Container>
      <h3>Objective:</h3>
      <p>
        BooksRUs exists to emphasize the literary contributions of different
        cultures around the world. The app will include information regarding
        famous publications around the globe, their authors, and the countries
        they hale from. The vision of BooksRUs is to connect and spread
        knowledge from distant lifestyles and faraway populations to others
        through sharing inspiring stories, insightful biographies, and
        cross-country cultural exchange. This is because, ultimately, the more
        learned we are of each other, the more mindful we are of the ways the
        world work.
      </p>
      <h3>Integration:</h3>
      <p>
        Connecting books to their authors is not too interesting. However, once
        we integrated the author&apos;s country into the data model, we
        discovered how location and culture influences their writing. This
        additional context provides a deeper understanding between the reader
        and the book. Our website hopes to display these relationships and help
        readers learn more about their favoriate books/authors.
      </p>
      <Link to="https://www.postman.com/booksrus/workspace/ccb2dbee-a37a-4961-81e3-4de867746837/api/3429211e-f767-46d8-ae5a-5c2ca170b6fc">
        <br />
        Postman API
        <br />
      </Link>
      <Row
        md={3}
        className="mx-auto"
        style={{ justifyContent: "space-evenly" }}
      >
        {baseUserData.map((dev) => (
          <Col>
            <Card>
              <Card.Img
                variant="top"
                src={dev.image}
                style={{ textAlign: "center" }}
              />
              <Card.Body>
                <Card.Title>{dev.name}</Card.Title>
                <Card.Subtitle className="text-muted">{dev.role}</Card.Subtitle>
                <br />
                <Card.Subtitle className="text-muted">
                  GitLab: {dev.username}
                </Card.Subtitle>
                <Card.Text>{dev.bio}</Card.Text>
              </Card.Body>
              <ListGroup>
                <ListGroupItem>Commits: {dev.commits}</ListGroupItem>
                <ListGroupItem>Issues: {dev.issues}</ListGroupItem>
                <ListGroupItem>Tests: {dev.unittests}</ListGroupItem>
              </ListGroup>
            </Card>
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
              <Card.Title>Total Unit Tests: {unitData}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="sources">
        <Col className="datasources">
          <h3>Data Sources/APIs:</h3>
          {dataSources.map((source) => (
            <Row>
              <h5>
                <a href={source.url}>{source.name}</a>
              </h5>
              <p>{source.description}</p>
            </Row>
          ))}
        </Col>
        <Col className="tools">
          <h3>Tools:</h3>
          {tools.map((source) => (
            <Row>
              <h5>
                <a href={source.url}>{source.name}</a>
              </h5>
              <p>{source.description}</p>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
