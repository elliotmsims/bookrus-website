/* eslint-disable no-restricted-syntax */
import { Carousel, Row, Col, Container, Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fgetCountries, fgetArticles } from "../../services/API/apiCalls";
import styles from "./styles.module.css";

// BAR CHART
function getBarChartData(countries) {
  const ranges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 30],
  ];
  const data = new Array(ranges.length);
  for (let i = 0; i < data.length; i += 1) {
    const subrange = countries.filter(
      (c) => ranges[i][0] <= c.homicide_rate && c.homicide_rate < ranges[i][1]
    );
    let total = 0;
    let maximum = 0;
    for (let j = 0; j < subrange.length; j += 1) {
      const value = subrange[j].life_expectancy;
      total += value;
      if (maximum < value) {
        maximum = value;
      }
    }
    data[i] = {
      name: `${ranges[i][0]}-${ranges[i][1]}`,
      avg: Math.round((total / subrange.length + Number.EPSILON) * 100) / 100,
      max: maximum,
    };
  }
  return data;
}

// PIE CHART
function getPieChartData() {
  const languages = ["en", "es", "de", "pt", "nl", "it", "fr"];
  const data = new Array(languages.length);
  const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
  for (let i = 0; i < languages.length; i += 1) {
    data[i] = {
      name: languageNames.of(languages[i]),
      value: fgetArticles(languages[i]).count,
    };
  }

  return data;
}

const COLORS = [
  "#FF0000",
  "#FFA500",
  "#BFB800",
  "#008000",
  "#0000ff",
  "#4b0082",
  "#ee82ee",
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: "2vw" }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// RADAR CHART
function getRadarChartData(countries) {
  const ranges = [
    [41, 50],
    [51, 60],
    [61, 70],
    [71, 80],
    [81, 90],
    [90, 100],
  ];
  const data = new Array(ranges.length);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = {
      name: `${ranges[i][0]}-${ranges[i][1]}`,
      value: Object.keys(
        countries.filter(
          (c) =>
            ranges[i][0] <= c.voter_turnout && c.voter_turnout < ranges[i][1]
        )
      ).length,
    };
  }
  return data;
}

export default function ProviderVisualizations() {
  const countries = fgetCountries().result;
  const radarChartData = getRadarChartData(countries);
  const pieChartData = getPieChartData();
  return (
    <Container>
      <br />
      <Row>
        <Carousel variant="dark" interval={null}>
          <Carousel.Item>
            <h1 className={styles.title}>
              Countries&apos; Avg and Max Life Expectancy by Homicide Rate
            </h1>
            <ResponsiveContainer width="99%" aspect={2}>
              <BarChart
                data={getBarChartData(countries)}
                margin={{
                  top: 5,
                  right: 80,
                  left: 80,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="avg"
                  label={{ position: "top" }}
                  fill="var(--background-color)"
                />
                <Bar
                  dataKey="max"
                  label={{ position: "top" }}
                  fill="var(--logo-color)"
                />
              </BarChart>
            </ResponsiveContainer>
          </Carousel.Item>
          <Carousel.Item>
            <h1 className={styles.title}>
              Distribution of Languages in News Articles
            </h1>
            <Row
              style={{ textAlign: "center", color: "white", fontSize: "2vw" }}
            >
              {pieChartData.map((entry, index) => (
                <Col
                  style={{
                    backgroundColor: `${COLORS[index % COLORS.length]}`,
                  }}
                >
                  {entry.name}
                </Col>
              ))}
            </Row>
            <Row>
              <ResponsiveContainer width="99%" aspect={2}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        // eslint-disable-next-line react/no-array-index-key
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <h1 className={styles.title}>
              Distribution of Voter Turnout Rate in Countries
            </h1>
            <ResponsiveContainer width="99%" aspect={2}>
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={radarChartData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Carousel.Item>
        </Carousel>
      </Row>
      <br />
      <br />
      <Row fluid>
        <Card
          fluid
          className={styles.card}
          style={{
            border: "3px solid #000",
            backgroundColor: "var(--logo-color)",
          }}
        >
          <Card.Body>
            <b>
              <u>
                Interesting Things We Discovered (from FindAHome&apos;s API):
              </u>
              <ul>
                <li>
                  For our first chart, we looked at countries&apos; average and
                  max life expectancies if they were grouped by homicide rate.
                  We noticed a general trend of decreasing life expectancy as
                  homicide rate increased. FindAHome&apos;s country database is
                  not large, so our chart might not show the entire story.
                  Regardless, it is interesting that the worst homicide rate
                  range has the biggest gap between average and max life
                  expectancy. Lastly, we can conclude from our chart that many
                  of the factors that influence life expectancy also influence
                  homicide rate. No country&apos;s homicide total will
                  significantly affect life expectancy, but it can serve as an
                  indicator of the factors. (factors like poverty, healthcare
                  quality, etc.)
                </li>
                <li>
                  For our second chart, we looked at the distribution of
                  languages in the news articles of FindAHome&apos;s database.
                  Similar to our nationalities of authors distribution, we found
                  the same English-language bias. However, they used a European
                  data source, but since English is the most universal language
                  in that area the bias still exists. The lack of Asian
                  languages, which have a significant amount of speakers,
                  further expresses the bias. Regardless, we can conclude that
                  English news articles are popular in many areas of the world,
                  and the language is relatively universal.
                </li>
                <li>
                  For our third chart, we looked at the distribution of voter
                  turnout rate in countries. We discovered most countries have
                  61-70% of the population show up to vote in elections. This is
                  a relatively positive sign for democracy. It can be higher,
                  but we consider that range to be decent. Even better is that
                  the distribution is slighly skewed to higher voter turnout
                  rates. If we included more data in our chart, we could
                  possibly find factors that help indicate voter turnout.
                </li>
              </ul>
            </b>
          </Card.Body>
        </Card>
      </Row>
      <br />
    </Container>
  );
}
