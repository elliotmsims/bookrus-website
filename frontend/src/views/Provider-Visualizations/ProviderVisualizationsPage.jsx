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
import styles from "./styles.module.css";

// BAR CHART
function getBarChartData() {
  const data = [
    { name: "0-1", avg: 85, max: 90 },
    { name: "1-2", avg: 83, max: 86 },
    { name: "2-3", avg: 76, max: 80 },
    { name: "3+", avg: 70, max: 79 },
  ];
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
  const data = [
    { name: "English", value: 3000 },
    { name: "Spanish", value: 1500 },
    { name: "Italian", value: 900 },
    { name: "German", value: 300 },
    { name: "French", value: 300 },
    { name: "Chinese", value: 200 },
    { name: "Japanese", value: 200 },
  ];
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
  const data = [
    { name: "0-50", value: 1500 },
    { name: "51-200", value: 700 },
    { name: "201-500", value: 200 },
    { name: "501-1000", value: 600 },
    { name: "1001-5000", value: 500 },
    { name: "5000+", value: 1300 },
  ];
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
                  educated countries tend to have a lower homicide range. Of
                  course, many factors combined determine homicide rate, and we
                  are not implying education causes decreased homicides, or
                  vice-versa.
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
                  donors. We suspect that this is due to many charities never
                  gaining popularity or an increase in new charities. The second
                  largest percentage has 5000+ donors. These are usually the big
                  charities that people know by name and will have large money
                  goals/funding.
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
