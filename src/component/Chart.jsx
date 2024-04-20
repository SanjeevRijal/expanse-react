import Plot from "react-plotly.js";
import { useState, useEffect } from "react";
import axios from "axios";

function Chart() {
  const accessToken = localStorage.getItem("accessToken");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("https://expense-management-ncvd.onrender.com/chart_data", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const responseData = response.data
        const list = Object.keys(responseData).map(name => ({ name, amount: responseData[name] }));
        setChartData(list);
      });
  }, [accessToken]); // Added accessToken as dependency for useEffect

  const labels = chartData.map((budget) => budget.name);
  const values = chartData.map((budget) => budget.amount);

  let data = [
    {
    values: values,
    labels: labels,
    type: "pie",
    textinfo: "label+percent",
    insidetextfont: { color: "#e5e7eb" }
    },
];

  return (
    <div className="displayGrpah">
      <Plot
            data={data}
            layout={{
            width: 400,
            height: 475,
            title: {
                text: 'Spending Per Head',
                font: {
                    font:"Roboto,sans-serif",
                  size: 20, // Specify font size
                  color: 'black', // Specify font color
                  weight: 'bold' // Specify font weight
                }
              },
            color: "#e5e7eb",
            paper_bgcolor:'rgba(45,34,120,0)',
            plot_bgcolor:'rgba(0,0,0,0)',
            font:{
                family: "Archivo Narrow"
            }
            }}
        />
    </div>
  );
}

export default Chart;
