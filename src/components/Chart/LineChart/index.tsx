/* eslint-disable @typescript-eslint/no-explicit-any */
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi elemen yang dibutuhkan
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  chartData: {
    site_id: string;
    trx_date: string;
    total_rev: number;
    total_payload: number;
    total_traffic: number;
  }[];
  reports: string | null;
  handleClose: () => void;
  loading: boolean;
}

const LineChartProps: React.FC<{
  chartData: {
      trx_date: string;
      total_rev: number;
      total_payload: number;
      total_traffic: number;
  }[];
  loading: boolean;
}> = ({ chartData, loading }) => {
  const lineChartOptions = (title: string) => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: title },
    },
    scales: {
      x: {
        title: { display: true, text: "Date" },
        ticks: {
          callback: (value: any, index: number) => {
            const date = new Date(chartData[index].trx_date);
            return new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "2-digit",
            }).format(date);
          },
        },
      },
      y: { title: { display: true, text: title } },
    },
  });

  
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : chartData.length > 0 ? (
        <>
          <Line
            options={lineChartOptions("Revenue")}
            data={{
              labels: chartData.map((data) => data.trx_date),
              datasets: [
                {
                  label: "Total Revenue Daily",
                  data: chartData.map((data) => data.total_rev),
                  borderColor: "rgb(229, 43, 83)",
                  backgroundColor: "rgb(229, 43, 83)",
                  tension: 0.1,
                },
              ],
            }}
          />
          <Line
            options={lineChartOptions("Payload")}
            data={{
              labels: chartData.map((data) => data.trx_date),
              datasets: [
                {
                  label: "Total Payload Daily",
                  data: chartData.map((data) => data.total_payload),
                  borderColor: "rgb(54, 162, 235)",
                  backgroundColor: "rgb(54, 162, 235)",
                  tension: 0.1,
                },
              ],
            }}
          />
          <Line
            options={lineChartOptions("Traffic")}
            data={{
              labels: chartData.map((data) => data.trx_date),
              datasets: [
                {
                  label: "Total Traffic Daily",
                  data: chartData.map((data) => data.total_traffic),
                  borderColor: "rgb(250, 121, 0)",
                  backgroundColor: "rgb(250, 121, 0)",
                  tension: 0.1,
                },
              ],
            }}
          />
        </>
      ) : (
        <p>No chart data available</p>
      )}
    </>
  );
};

    //   const formatChartData = (
    //     key: keyof (typeof chartData)[0],
    //     color: string
    //   ) => ({
    //     labels: chartData.map((data) => data.trx_date),
    //     datasets: [
    //       {
    //         label: key,
    //         data: chartData.map((data) => data[key]),
    //         borderColor: color,
    //         backgroundColor: color,
    //         tension: 0.1,
    //       },
    //     ],
    //   });
export default LineChartProps;
