const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/testPage", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// prize pool
const goods = [
  { name: "1号奖品", stock: 20, total: 20, id: 0, order: 1 },
  { name: "2号奖品", stock: 15, total: 15, id: 1, order: 2 },
  { name: "3号奖品", stock: 15, total: 15, id: 2, order: 3 },
  { name: "4号奖品", stock: 15, total: 15, id: 3, order: 4 },
  { name: "5号奖品", stock: 10, total: 10, id: 4, order: 5 },
  { name: "6号奖品", stock: 10, total: 10, id: 5, order: 6 },
  { name: "7号奖品", stock: 10, total: 10, id: 6, order: 7 },
  { name: "8号奖品", stock: 5, total: 5, id: 7, order: 8 },
];
// 每个礼品的中奖情况
const lucks = [
  { name: "1号奖品", luck: 0 },
  { name: "2号奖品", luck: 0 },
  { name: "3号奖品", luck: 0 },
  { name: "4号奖品", luck: 0 },
  { name: "5号奖品", luck: 0 },
  { name: "6号奖品", luck: 0 },
  { name: "7号奖品", luck: 0 },
  { name: "8号奖品", luck: 0 },
];
//let threshold = 0.8; // 总中奖概率
const tal = 100; // 礼品总数
var prize;

//抽奖函数
function lotteryBegin() {
  //let num = tal/threshold; // 随机数范围 = 礼品总数 / 总中奖率

  let random = Math.floor(Math.random() * tal);

  let cur = 0;
  for (let j = 0; j < goods.length; j++) {
    let next = cur + goods[j].total;
    // 随机数落在奖品的区间
    if (cur <= random && random < next) {
      // 所落的区间，礼品没库存了
      if (goods[j].stock <= 0) {
        console.log("【没库存】: " + goods[j].name + ", 随机数是" + random);
        break;
      }
      // 中奖
      prize = goods[j].name;
      console.log(
        "中奖: " +
          goods[j].name +
          ", 库存余: " +
          --goods[j].stock +
          ", 随机数是" +
          random
      );
      ++lucks[j].luck;
      return j;
    }
    cur = next;
  }
}
//初始数据
app.get("/prizePool", function (req, res) {
  res.send(goods);
  console.log("初始化礼品");
});
app.post("/", function (req, res) {
  lotteryBegin();
  res.write("Congratulations! Your prize is " + prize);
  //res.json({success: true});
});
app.get("/prizeResult", function (req, res) {
  const index = lotteryBegin();
  console.log("中奖奖品的index:", index);
  res.send({ index });
});
app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
