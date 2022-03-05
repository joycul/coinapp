import { fetchCoinTickers } from "../api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}





function Price() {
  const { coinId } = useParams<RouteParams>();
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );

   return (
     <>
    <h1>USD price: ${tickersData?.quotes.USD.price.toFixed(3)}</h1>
    <h1>최근 1년 변동률: {tickersData?.quotes.USD.percent_change_1y} %</h1>


    </>
   )}
 
 export default Price;