import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
  darkMode: boolean;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}


function Chart({ coinId, darkMode }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "차트 로딩 중..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => [
              new Date(price.time_open),
              price.open, price.high, price.low, price.close
                
              ]),
            },
          ]}
          options={{
            theme: {
              mode: darkMode ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },

            },

            yaxis: {
              show: false,
            },
            xaxis: {

              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },

            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;