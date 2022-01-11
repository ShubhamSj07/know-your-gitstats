import Chart from "chart.js";

const buildScales = axes => {
  const scales = {
    xAxes: [
      {
        ticks: {
          fontFamily: "Inter",
          fontColor: "#f6f8fa",
          fontSize: 12,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontFamily: "Inter",
          fontColor: "#f6f8fa",
          fontSize: 12,
        },
      },
    ],
  };

  return axes ? scales : null;
};

const buildLegend = legend => {
  const legendConfig = {
    position: "right",
    labels: {
      fontFamily: "Inter",
      fontColor: "#f6f8fa",
    },
  };
  return legend ? legendConfig : null;
};

const buildChart = config => {
  // console.log({ config });
  const { canvasElement, chartType, labels, data, backgroundColor, axes, legend } =
    config;

  return new Chart(canvasElement, {
    type: chartType,
    responsive: true,
    maintainAspectRatio: false,
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: buildScales(axes),
      legend: buildLegend(legend),
      tooltips: {
        titleFontFamily: "Inter",
        bodyFontFamily: "Inter",
        cornerRadius: 3,
      },
    },
  });
};

export default buildChart;
