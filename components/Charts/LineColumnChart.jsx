"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";

// Dynamically import ReactApexChart to prevent SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const LineColumnChart = ({ Data }) => {
  console.log(Data);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowWidth(
          window.innerWidth > 1400 && window.innerWidth < 1900
            ? 1500
            : window.innerWidth > 1900 && window.innerWidth < 2500
            ? 1900
            : window.innerWidth > 2500 && window.innerWidth < 3400
            ? 2500
            : window.innerWidth * 0.9
        );
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const series = [
    {
      name: "Sales Amount (PKR)",
      type: "column",
      data: Data.map((dt) => dt.salesAmount),
      color: "#000",
    },
    {
      name: "Sales Payment (PKR)",
      type: "line",
      data: Data.map((dt) => dt.salesPayment),
      color: "#8C9AA6",
    },
  ];

  const Labels = Data.map((dt) => dt.name);

  const options = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: Labels,
    xaxis: {
      type: "category",
    },
    yaxis: [
      {
        opposite: true,
      },
      {
        title: {},
      },
    ],
  };

  if (windowWidth === 0) return null; // Prevent rendering on the server

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={
          windowWidth > 1400 && windowWidth < 1900
            ? 350
            : windowWidth > 1900 && windowWidth < 2500
            ? 450
            : windowWidth > 2500 && windowWidth < 3400
            ? 550
            : windowWidth < 1400
            ? 300
            : 650
        }
        width={windowWidth}
      />
    </div>
  );
};

LineColumnChart.propTypes = {
  Data: PropTypes.arrayOf(
    PropTypes.shape({
      customer_name: PropTypes.string.isRequired,
      salesAmount: PropTypes.number.isRequired,
      salesPayment: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LineColumnChart;
