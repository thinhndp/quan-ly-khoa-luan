import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup} from "shards-react";
import Chart from "react-apexcharts";

import './styles.css';

const Heatmap = () => {
  const [ options, setOptions ] = useState({
    // plotOptions: {
    //   heatmap: {
    //     colorScale: {
    //       ranges: [{
    //           from: -30,
    //           to: 5,
    //           color: '#00A100',
    //           name: 'low',
    //         },
    //         {
    //           from: 6,
    //           to: 20,
    //           color: '#128FD9',
    //           name: 'medium',
    //         },
    //         {
    //           from: 21,
    //           to: 45,
    //           color: '#FFB200',
    //           name: 'high',
    //         }
    //       ]
    //     }
    //   }
    // }
    dataLabels: {
      enabled: false
    },
    colors: ["#008FFB"],
    title: {
      text: 'Hiệu suất'
    },
  });
  const [ series, setSeries ] = useState([
    {
      name: "Mon",
      data: [{
        x: 'W1',
        y: 22
      }, {
        x: 'W2',
        y: 29
      }, {
        x: 'W3',
        y: 13
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }]
    },
    {
      name: "Mon",
      data: [{
        x: 'W1',
        y: 22
      }, {
        x: 'W2',
        y: 29
      }, {
        x: 'W3',
        y: 13
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }]
    },
    {
      name: "Mon",
      data: [{
        x: 'W1',
        y: 22
      }, {
        x: 'W2',
        y: 29
      }, {
        x: 'W3',
        y: 13
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }]
    },
    {
      name: "Mon",
      data: [{
        x: 'W1',
        y: 22
      }, {
        x: 'W2',
        y: 29
      }, {
        x: 'W3',
        y: 13
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }]
    },
    {
      name: "Mon",
      data: [{
        x: 'W1',
        y: 22
      }, {
        x: 'W2',
        y: 29
      }, {
        x: 'W3',
        y: 13
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }]
    },
    {
      name: "Mon",
      data: [{
        x: 'W1',
        y: 22
      }, {
        x: 'W2',
        y: 29
      }, {
        x: 'W3',
        y: 13
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }, {
        x: 'W4',
        y: 32
      }]
    },
    {
      name: "Tue",
      data: [
        {
          x: 'W1',
          y: 43
        }, {
          x: 'W2',
          y: 43
        }, {
          x: 'W3',
          y: 43
        }, {
          x: 'W4',
          y: 43
        }, {
          x: 'W4',
          y: 43
        }, {
          x: 'W4',
          y: 43
        }, {
          x: 'W4',
          y: 43
        }, {
          x: 'W4',
          y: 43
        }, {
          x: 'W4',
          y: 43
        }, {
          x: 'W4',
          y: 43
        }, {
          x: 'W4',
          y: 43
        }, {
          x: 'W4',
          y: 43
        }, {
          x: 'W4',
          y: 43
        }, {
          x: 'W4',
          y: 43
        }, {
          x: 'W4',
          y: 43
        }, {
          x: 'W4',
          y: 43
        }
      ]
    }
  ]);
  return (
    <Card small className="card-post mb-4">
      <CardBody className="chart-container">
        <div id="chart">
          {/* <ReactApexChart options={this.state.options} series={this.state.series} type="heatmap" height={350} /> */}
          {/* <Chart
            options={options}
            type="heatmap"
            height={350}
          /> */}
          <Chart
            options={options}
            series={series}
            type="heatmap"
            // width="500"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default Heatmap;