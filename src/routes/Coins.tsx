import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: #6c6cd4;
  color:  ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  height: 55px;
  a{
    padding: 10px;
    display: flex;
    align-items: center;
  }
  &:hover{
  a {
    color: ${(props) => props.theme.accentColor}
  }
}
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;


const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props. theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}


function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await (
  //       await fetch("https://api.coinpaprika.com/v1/coins")
  //     ).json();

  //     setCoins(response.slice(0,100));
  //     setLoading(false);
  //   })();
  // }, []);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
      <Loader>로딩 중...</Loader>
      ) : (
      <CoinList>
        {data?.slice(0, 100).map((coin) => (
        <Coin key={coin.id}>
          <Link 
            to={{
              pathname: `/coinapp/${coin.id}`,
              state: { name: coin.name }
            }}
          >
            <Img 
              src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
            />
            {coin.name} &rarr;
            </Link>
        </Coin>
        ))}
      </CoinList>
      )}
    </Container>
   )
 
 
  }
 export default Coins;