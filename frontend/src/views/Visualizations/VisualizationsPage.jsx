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
  const data = new Array(6);
  const ranges = [
    [1, 20],
    [21, 40],
    [41, 60],
    [61, 80],
    [81, 100],
    [101, 9999],
  ];
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
            <h1>Top 5 Regions&apos; Avg and Max Country Population</h1>
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
            <h1>Distribution of Author Work Counts</h1>
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
                  For our first chart, we chose the top five largest regions to
                  prevent our bar chart from being overloaded with regions.
                  Also, smaller regions will logically have tiny populations
                  relative to the larger regions, and therefore, the bars would
                  be not visible. With our data, we found that Asia is the most
                  populous with a crazy max country population over a billion
                  higher than the next region&apos;s max! However, its average
                  is not as high as the the next region&apos;s max so it has
                  many smaller countries too.
                </li>
                <li>
                  For our second chart, we chose the top seven nationalities of
                  authors for similar reasons as the first chart. We discovered
                  that our data very English language biased, and specifically,
                  American English biased. However, there is some representation
                  of other nationalities/languages such as French and even
                  Korean. Our data comes comes from Google&apos;s book/author
                  database, and therefore, it logically makes sense that there
                  exist a bias. Regardless, English books are very popular, and
                  there are many good English authors!
                </li>
                <li>
                  For our third chart, we chose multiple ranges of work count
                  totals for authors, and it pulls from the our entire author
                  database. We found that the 1-20 range is by far the most
                  popular since many authors only release a few works. However,
                  interestingly, the second highest range is 101-9999. This
                  implies authors tend to write only a few works or the complete
                  opposite, a ton of works. Lastly, keep in mind that 101-9999
                  is an extremely large range compared to the other 20 count
                  ranges. Therefore, it makes sense that such a large range
                  would have a high work count total, but we included it to
                  group all authors that write many books together.
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
