import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup} from "shards-react";
import Chart from "react-apexcharts";

import './styles.css';

const Heatmap = ({ series, height }) => {
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
      text: 'Lịch Log'
    },
    chart: {
      events: {
        click: function(event, chartContext, config) {
          console.log(event);
          console.log(chartContext);
          console.log(config);
        }
      }
    }
  });

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
          { height && (
            <Chart
              options={options}
              series={series}
              type="heatmap"
              height={height}
              // width="500"
            />
          ) }
          { !height && (
            <Chart
              options={options}
              series={series}
              type="heatmap"
            />
          ) }
        </div>
      </CardBody>
    </Card>
  );
};

export default Heatmap;
