import React, { useState } from 'react';
import Item from './components/Item';
import Button from './components/Button';
import List from './components/List'
import './App.css';

const initialPrizePool = [{ "name": "66矿石", "prob": .3 },
{ "name": "2号奖品", "prob": .1 },
{ "name": "3号奖品", "prob": .1 },
{ "name": "4号奖品", "prob": .1 },
{ "name": "5号奖品", "prob": .1 },
{ "name": "6号奖品", "prob": .1 },
{ "name": "7号奖品", "prob": .1 },
{ "name": "8号奖品", "prob": .1 }];


const App = () => {
  // const [prizePool, setPrizePool] = useState(initialPrizePool);
  const prizePool = initialPrizePool;
  const [stone, setStone] = useState(2000);
  const [lotteryList, setLotteryList] = useState([]);
  const [active, setActive] = useState(null);

  const handleLottery = () => {
    if (stone < 200) {
      alert('矿石不足');
      return;
    }
    //抽奖过程
    setStone(stone - 200);
    const accProb = []
    prizePool.map(p => p.prob).reduce((pre, cur, i) => accProb[i] = pre + cur, 0)
    let lotteryIndex = Math.random();
    for (let i = 0; i < accProb.length; i++) {
      if (lotteryIndex <= accProb[i]) {
        lotteryIndex = i + 1;
        break;
      }
    }
    const move = lotteryIndex - 1 + 9 * 2;
    console.log('lo', lotteryIndex)
    console.log('move', move);
    let i = 1;
    let circleRun = setInterval(() => {
      if (i <= move) {
        setActive((i + 1) % 9);
        i++;
      } else {
        
        clearInterval(circleRun);
        setLotteryList([...lotteryList, prizePool[lotteryIndex - 1]])
      }
    }, 200)


  }

  return (
    <div className="App">
      <div className='bg'>
        <div>
          当前矿石数：{stone}
        </div>
        <div className="board">
          <div className='boardContainer'>
            <div className='row'>
              <div><Item num={1} prize={prizePool[0]} active={active} /></div>
              <div><Item num={2} prize={prizePool[1]} active={active} /></div>
              <div><Item num={3} prize={prizePool[2]} active={active} /></div>
            </div>
            <div className='row'>
              <div><Item num={8} prize={prizePool[7]} active={active} /></div>
              <div>
                <Button text='抽奖' handleLottery={handleLottery} />
                <div>200矿石/次</div>
              </div>
              <div><Item num={4} prize={prizePool[3]} active={active} /></div>
            </div>
            <div className='row'>
              <div><Item num={7} prize={prizePool[6]} active={active} /></div>
              <div><Item num={6} prize={prizePool[5]} active={active} /></div>
              <div><Item num={5} prize={prizePool[4]} active={active} /></div>
            </div>
          </div>
        </div >
      </div>
      <div className='lotteryList'>
        <ul>
          <List list={lotteryList} />
        </ul>
      </div>
    </div>

  );
}

export default App;
