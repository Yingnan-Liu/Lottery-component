const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// prize pool
const goods = [{"name": "1号奖品", "stock": 20, "total": 20},
             {"name": "2号奖品", "stock": 15, "total": 15},
             {"name": "3号奖品", "stock": 15, "total": 15},
             {"name": "4号奖品", "stock": 15, "total": 15},
             {"name": "5号奖品", "stock": 10, "total": 10},
             {"name": "6号奖品", "stock": 10, "total": 10},
             {"name": "7号奖品", "stock": 10, "total": 10},
             {"name": "8号奖品", "stock": 5, "total": 5}];
// 每个礼品的中奖情况
const lucks = [{"name": "1号奖品",  "luck": 0},
             {"name": "2号奖品",  "luck": 0},
             {"name": "3号奖品",  "luck": 0},
             {"name": "4号奖品",  "luck": 0},
             {"name": "5号奖品",  "luck": 0},
             {"name": "6号奖品",  "luck": 0},
             {"name": "7号奖品",  "luck": 0},
             {"name": "8号奖品",  "luck": 0}];
//let threshold = 0.8; // 总中奖概率
const tal = 100;  // 礼品总数
var prize;

//抽奖函数
function lotteryBegin() {
  //let num = tal/threshold; // 随机数范围 = 礼品总数 / 总中奖率

  let random = Math.floor(Math.random() * tal);

  let cur = 0;
  for(let j = 0; j < goods.length; j++){
    let next = cur + goods[j].total;
    // 随机数落在奖品的区间
    if(cur <= random && random < next){
        // 所落的区间，礼品没库存了
        if(goods[j].stock <= 0){
            console.log("【没库存】: " + goods[j].name + ", 随机数是" + random);
            break;
        }
        // 中奖
        prize = goods[j].name;
        console.log("中奖: " + goods[j].name + ", 库存余: " + --goods[j].stock + ", 随机数是" + random);
        ++lucks[j].luck;
        break;
    }
    cur = next;
  }
}


app.post("/", function(req, res) {
  lotteryBegin();
  res.write("Congratulations! Your prize is " + prize);
  //res.json({success: true});
});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
