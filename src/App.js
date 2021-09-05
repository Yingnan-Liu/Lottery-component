import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "./components/Item";
import Button from "./components/Button";
import List from "./components/List";
import "./App.css";
const baseUrl = "http://localhost:3000/prizePool";
const getPrize = "http://localhost:3000/prizeResult";

const App = () => {
  const [prizePool, setPrizePool] = useState([]);
  const [stone, setStone] = useState(750);
  const [lotteryList, setLotteryList] = useState([]);
  const [active, setActive] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isLottery, setIsLottery] = useState(false);
  const [lotteryIndex, setLotteryIndex] = useState(null);

  const getAll = () => {
    axios.get(baseUrl).then((res) => {
      setPrizePool(res.data);
      console.log(res.data);
      setLoaded(true);
    });
  };
  const getResult = () => {
    return axios.get(getPrize);
  };
  useEffect(getAll, []);

  const handleLottery = () => {
    if (isLottery) {
      return;
    }
    setIsLottery(true);

    if (stone < 200) {
      alert("矿石不足");
      return;
    }
    //抽奖过程
    setStone(stone - 200);
    //获取后端抽奖结果
    getResult().then((res) => {
      let { index } = res.data;
      console.log("res.data:", index);
      setLotteryIndex(index);
    });

    //动效
    const move = lotteryIndex - 1 + 9 * 2;
    console.log("lotteryIndex", lotteryIndex);
    let i = 1;
    let circleRun = setInterval(() => {
      if (i <= move) {
        setActive((i + 1) % 9);
        i++;
      } else {
        clearInterval(circleRun);
        console.log("prize:", prizePool[lotteryIndex]);

        console.log("lotteryList:", lotteryList);
        setIsLottery(false);
        if (lotteryIndex === 1) {
          setStone(stone + 66);
        }
      }
    }, 150);
  };

  return (
    <div className="App">
      <div className="bg">
        {loaded ? (
          <div className="board">
            <div className="boardContainer">
              <div className="row">
                <div>
                  <Item num={1} prize={prizePool[0]} active={active} />
                </div>
                <div>
                  <Item num={2} prize={prizePool[1]} active={active} />
                </div>
                <div>
                  <Item num={3} prize={prizePool[2]} active={active} />
                </div>
              </div>
              <div className="row">
                <div>
                  <Item num={8} prize={prizePool[7]} active={active} />
                </div>
                <div>
                  <Button handleLottery={handleLottery} />
                </div>
                <div>
                  <Item num={4} prize={prizePool[3]} active={active} />
                </div>
              </div>
              <div className="row">
                <div>
                  <Item num={7} prize={prizePool[6]} active={active} />
                </div>
                <div>
                  <Item num={6} prize={prizePool[5]} active={active} />
                </div>
                <div>
                  <Item num={5} prize={prizePool[4]} active={active} />
                </div>
              </div>
            </div>
            <div className="remind-text">
              当前矿石数：{stone}
              <div>200矿石/次</div>
            </div>
          </div>
        ) : (
          <div className="loading">加载数据...</div>
        )}
      </div>
      <div className="lottery-list">
        <div className="list-head">获奖记录</div>
        <ul>{/* <List list={lotteryList} /> */}</ul>
        <div>active:{active}</div>
        <div>lotteryIndex:{lotteryIndex}</div>
        <div>prize:</div>
      </div>
    </div>
  );
};

export default App;
