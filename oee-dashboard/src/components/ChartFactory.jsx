import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function ChartFactory({ view, chart, title }) {
  const type =
    view === "column"
      ? "column"
      : view === "line"
      ? "line"
      : "pie";

  const options =
    type === "pie"
      ? {
          chart: { type: "pie" },
          title: { text: "" },
          credits: { enabled: false },
          series: [
            {
              name: title || "",
              data: chart?.pieData || [],
            },
          ],
        }
      : {
          chart: { type },
          title: { text: "" },
          credits: { enabled: false },
          xAxis: { categories: chart?.categories || [] },
          yAxis: { title: { text: "" } },
          series: chart?.series || [],
        };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}
