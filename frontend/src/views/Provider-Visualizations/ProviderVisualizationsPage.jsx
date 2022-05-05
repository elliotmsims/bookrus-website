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
import {
  fgetCountries,
  fgetArticles,
  fgetCharities,
} from "../../services/API/apiCalls";
import styles from "./styles.module.css";

// BAR CHART
function getMax(arr, prop) {
  let max;
  for (let i = 0; i < arr.length; i += 1) {
    if (max == null || parseInt(arr[i][prop], 10) > parseInt(max[prop], 10))
      max = arr[i];
  }
  return max[prop].toFixed(2);
}

function getAvg(arr, prop) {
  return (getMax(arr, prop) / arr.length).toFixed(2);
}

function getBarChartData() {
  const ranges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 30],
  ];
  const data = new Array(ranges.length);
  for (let i = 0; i < data.length; i += 1) {
    const countries = fgetCountries(`${ranges[i][0]}-${ranges[i][1]}`).result;
    data[i] = {
      name: `${ranges[i][0]}-${ranges[i][1]}`,
      avg: getAvg(countries, "education_rate"),
      max: getMax(countries, "education_rate"),
    };
  }
  return data;
}

const getPath = (x, y, width, height) => `M${x},${y + height}
            C${x + width / 3},${y + height} ${x + width / 2},${
  y + height / 3
} ${x + width / 2}, ${y}
            C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
  y + height
} ${x + width}, ${y + height}
            Z`;

function TriangleBar(props) {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
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
function getRadarChartData() {
  const ranges = [
    [0, 10],
    [10, 100],
    [100, 1000],
    [1000, 5000],
    [5001, 100000],
  ];
  const data = new Array(ranges.length);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = {
      name: `${ranges[i][0]}-${ranges[i][1]}`,
      value: fgetCharities(`${ranges[i][0]}-${ranges[i][1]}`).count,
    };
  }
  return data;
}

export default function ProviderVisualizations() {
  const pieChartData = getPieChartData();
  const radarChartData = getRadarChartData();
  return (
    <Container>
      <br />
      <Row>
        <Carousel variant="dark" interval={null}>
          <Carousel.Item>
            <h1>Countries&apos; Avg and Max Education Rate by Homicide Rate</h1>
            <ResponsiveContainer width="99%" aspect={2}>
              <BarChart
                data={getBarChartData()}
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
                  shape={<TriangleBar />}
                  label={{ position: "top" }}
                  fill="var(--background-color)"
                />
                <Bar
                  dataKey="max"
                  shape={<TriangleBar />}
                  label={{ position: "top" }}
                  fill="var(--logo-color)"
                />
              </BarChart>
            </ResponsiveContainer>
          </Carousel.Item>
          <Carousel.Item>
            <h1>Number of News Articles by Language</h1>
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
            <h1>Number of Charities by Donor Range </h1>
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
                  For our first chart, we chose to look at homicide ranges of
                  countries since FindAHome had a good filter for it, and we
                  chose to compare education rates. We discovered that more
                  educated countries seem to be no different than uneducated
                  ones. Of course, many factors combined determine homicide
                  rate, and we are not implying education causes decreased
                  homicides, or vice-versa.
                </li>
                <li>
                  For our second chart, we chose the top seven languages used in
                  FindAHome&apos;s news articles. We found that there is a
                  Eurocentric bias in the data. European countries could produce
                  more news articles, but we definitely think the bias plays a
                  large role. Also, English dominates the other languages, which
                  is most likely the result of being the most universal plus the
                  data source is an English website (more bias).
                </li>
                <li>
                  For our third chart, we chose number of charities by donor
                  range for a similar reason as the first chart. We discovered
                  that the biggest percentage of charities have only a few
                  hundred donors. Popularity of charities above and below this
                  range taper off as a normal bell curve would. There are very
                  few charities with over a thousand donors. We suspect that
                  this is because charities can get a foothold market in its
                  immediate community, but not many can garner the attention of
                  huge swathes of people.
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
