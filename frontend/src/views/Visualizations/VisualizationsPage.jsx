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
  getAuthors,
  getCountries,
  getBooks,
} from "../../services/API/apiCalls";
import styles from "./styles.module.css";

// BAR CHART
function getBarChartData() {
  const countries = getCountries().data;
  const regions = {
    Asia: { count: 0, total: 0, max: 0 },
    Americas: { count: 0, total: 0, max: 0 },
    Africa: { count: 0, total: 0, max: 0 },
    Europe: { count: 0, total: 0, max: 0 },
    Oceania: { count: 0, total: 0, max: 0 },
  };
  for (let i = 0; i < countries.length; i += 1) {
    const region = countries[i].country_region;
    if (countries[i].country_population != null && region in regions) {
      regions[region].count += 1;
      regions[region].total += countries[i].country_population;
      if (regions[region].max < countries[i].country_population) {
        regions[region].max = countries[i].country_population;
      }
    }
  }
  const data = new Array(5);
  let i = 0;
  for (const region of Object.keys(regions)) {
    data[i] = {
      name: region,
      avg: Math.floor(regions[region].total / regions[region].count),
      max: regions[region].max,
    };
    i += 1;
  }
  return data;
}

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
  x + width / 2
}, ${y}
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
  const authors = getAuthors().data;
  const data = new Array(7);
  const nationalities = [
    "American",
    "British",
    "Australian",
    "French",
    "German",
    "Korean",
    "Indian",
  ];
  for (let i = 0; i < data.length; i += 1) {
    data[i] = {
      name: nationalities[i],
      value: Object.keys(
        authors.filter((a) => a.author_nationality === nationalities[i])
      ).length,
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
  index,
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
// function getRadarChartData() {
//   const ranges = {
//     "1-100": {
//       data: getBooks(null, null, null, null, null, null, )
//     },
//     "100-200",
//     "200-300",
//     "300-400",
//     "400-500",
//     "500-9999",
//   };

// }

// const books = getBooks().data;
// const ranges = [
//   "1-100",
//   "100-200",
//   "200-300",
//   "300-400",
//   "400-500",
//   "500-9999",
// ];
// const numbers = [1, 100, 200, 300, 400, 500, 9999];
// const data3 = new Array(numbers.length - 1);
// for (let i = 0; i < numbers.length - 1; i += 1) {
//   data3[i] = {
//     name: ranges[i],
//     value: books.filter(
//       (b) => numbers[i] <= b.book_pages && b.book_pages <= numbers[i + 1]
//     ).length,
//   };
// }

export default function Visualizations() {
  const pieChartData = getPieChartData();
  return (
    <Container>
      <br />
      <Row>
        <Carousel variant="dark" interval={null}>
          <Carousel.Item>
            <h1>Top 5 Regions&apos; Max and Average Country Population</h1>
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
            <h1>Top 7 Nationalities of Authors</h1>
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
            <h1>Books Grouped by Length</h1>
            <ResponsiveContainer width="99%" aspect={2}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={null}>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </b>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}
