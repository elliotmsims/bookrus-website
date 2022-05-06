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
import { getAuthors, getCountries } from "../../services/API/apiCalls";
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
function getPieChartData(authors) {
  const nationalities = [
    "American",
    "British",
    "Australian",
    "French",
    "German",
    "Korean",
    "Indian",
  ];
  const data = new Array(nationalities.length);
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
function getRadarChartData(authors) {
  const ranges = [
    [1, 20],
    [21, 40],
    [41, 60],
    [61, 80],
    [81, 100],
    [101, 9999],
  ];
  const data = new Array(ranges.length);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = {
      name: `${ranges[i][0]}-${ranges[i][1]}`,
      value: Object.keys(
        authors.filter(
          (a) =>
            ranges[i][0] <= a.author_work_count &&
            a.author_work_count <= ranges[i][1]
        )
      ).length,
    };
  }
  return data;
}

export default function Visualizations() {
  const authors = getAuthors().data;
  const pieChartData = getPieChartData(authors);
  const radarChartData = getRadarChartData(authors);
  return (
    <Container>
      <br />
      <Row>
        <Carousel variant="dark" interval={null}>
          <Carousel.Item>
            <h1 className={styles.title}>
              Regions&apos; Avg and Max Country Population
            </h1>
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
            <h1 className={styles.title}>
              Distribution of Author Nationalities
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
            <h1 className={styles.title}>Distribution of Author Work Counts</h1>
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
              <u>Interesting Things We Discovered:</u>
              <ul>
                <li>
                  For our first chart, we looked at the population data of
                  regions around the world. We found that Asia is highly
                  populous, and its max country population is over a billion
                  higher than the next largest region&apos;s max. Asia&apos;s
                  average population is also higher than most regions&apos; max.
                  It puts into perspective how many people live in this one land
                  area.
                </li>
                <li>
                  For our second chart, we looked at the distribution of
                  nationalities of authors. We discovered that our book data
                  must be English-language biased considering the large amount
                  of authors from English-speaking countries. However, there is
                  some representation of other nationalities/languages such as
                  French and even Korean. Our data comes from Google&apos;s
                  book/author database. Since Google is an American company, it
                  is understandable that there is a bias, however, English books
                  are also just popular.
                </li>
                <li>
                  For our third chart, we looked at multiple ranges of work
                  count totals for authors. We discovered most authors were in
                  the 1-20 range, which means they only released a few works.
                  However, interestingly, the second highest range is 101-9999.
                  This implies authors tend to write only a few works or the
                  complete opposite, a ton of works. Keep in mind though that
                  101-9999 is an extremely large range compared to the other
                  size 20 ranges. Therefore, it also makes sense that such a
                  large range would have a high work count total. We included it
                  to group authors that wrote a significant amount of books in
                  one range.
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
