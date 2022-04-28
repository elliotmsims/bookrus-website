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
const countries = getCountries().data;
const regions = ["Asia", "Americas", "Africa", "Europe", "Oceania"];
const data1 = new Array(regions.length);
for (let i = 0; i < regions.length; i += 1) {
  const regionCountries = countries.filter(
    (c) => c.country_region === regions[i]
  );
  let max = 0;
  for (const c in Object.keys(regionCountries)) {
    if (regionCountries[c].country_population != null)
      max += regionCountries[c].country_population;
  }
  data1[i] = {
    name: regions[i],
    max,
    avg: Math.floor(max / regionCountries.length),
  };
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
const COLORS = [
  "#FF0000",
  "#FFA500",
  "#BFB800",
  "#008000",
  "#0000ff",
  "#4b0082",
  "#ee82ee",
];
const authors = getAuthors().data;
const nationalities = [
  "American",
  "British",
  "Australian",
  "French",
  "German",
  "Korean",
  "Indian",
];
const data2 = new Array(nationalities.length);
for (let i = 0; i < nationalities.length; i += 1) {
  data2[i] = {
    name: nationalities[i],
    value: Object.keys(
      authors.filter((a) => a.author_nationality === nationalities[i])
    ).length,
  };
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
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
const books = getBooks().data;
const ranges = [
  "1-100",
  "100-200",
  "200-300",
  "300-400",
  "400-500",
  "500-9999",
];
const numbers = [1, 100, 200, 300, 400, 500, 9999];
const data3 = new Array(numbers.length - 1);
for (let i = 0; i < numbers.length - 1; i += 1) {
  data3[i] = {
    name: ranges[i],
    value: books.filter(
      (b) => numbers[i] <= b.book_pages && b.book_pages <= numbers[i + 1]
    ).length,
  };
}

export default function Visualizations() {
  return (
    <Container>
      <br />
      <Row>
        <Carousel variant="dark" interval={null}>
          <Carousel.Item>
            <ResponsiveContainer width="99%" aspect={2}>
              <BarChart
                data={data1}
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
                  dataKey="max"
                  shape={<TriangleBar />}
                  label={{ position: "top" }}
                  fill="var(--logo-color)"
                />
                <Bar
                  dataKey="avg"
                  shape={<TriangleBar />}
                  label={{ position: "top" }}
                  fill="var(--background-color)"
                />
              </BarChart>
            </ResponsiveContainer>
          </Carousel.Item>
          <Carousel.Item>
            <Row
              style={{ textAlign: "center", color: "white", fontSize: "2vw" }}
            >
              {data2.map((entry, index) => (
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
                    data={data2}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {data2.map((entry, index) => (
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
            <ResponsiveContainer width="99%" aspect={2}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data3}>
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
