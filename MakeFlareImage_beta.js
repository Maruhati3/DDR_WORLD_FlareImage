window.MakeFlareImage = function () {
  function generateSVGText(
    text,
    gradientId,
    colors,
    svgwidth,
    svgheight,
    textsize
  ) {
    let svgNS = "http://www.w3.org/2000/svg";

    // SVG要素作成
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", svgwidth);
    svg.setAttribute("height", svgheight);
    let fillValue = "";

    if (colors.length == 1) {
      colors = [colors[0], colors[0]]; // 同じ色を2つ設定してグラデーションとして扱う
    }
    // <defs>と<linearGradient>作成
    let defs = document.createElementNS(svgNS, "defs");
    let gradient = document.createElementNS(svgNS, "linearGradient");
    gradient.setAttribute("id", gradientId);
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "0%");

    colors.forEach((color, index) => {
      let stop = document.createElementNS(svgNS, "stop");
      let offsetValue =
        colors.length > 1 ? `${(index / (colors.length - 1)) * 100}%` : "0%";
      stop.setAttribute("offset", offsetValue);
      stop.setAttribute("stop-color", color);
      gradient.appendChild(stop);
    });

    defs.appendChild(gradient);
    svg.appendChild(defs);

    // `&nbsp;` を通常のスペースに変換
    let formattedText = String(text).replace(/&nbsp;/g, " ");
    // テキスト要素作成
    let textElem = document.createElementNS(svgNS, "text");
    textElem.setAttribute("x", svgwidth);
    textElem.setAttribute("y", svgheight / 2);
    textElem.setAttribute("font-size", textsize);
    textElem.setAttribute("font-weight", "bold");
    textElem.setAttribute("fill", `url(#${gradientId})`);
    textElem.setAttribute("text-anchor", "end"); // 右揃え
    textElem.setAttribute("dominant-baseline", "middle"); //縦方向中央揃え
    textElem.textContent = formattedText;

    svg.appendChild(textElem);

    return svg;
  }

  //SP or DP スタイルの取得
  if (document.querySelector("#t_single").innerHTML.match(/playdata/) == null) {
    Pstyle = "Sp";
  } else {
    Pstyle = "Dp";
  }
  // 画像要素を作成
  const imgs = document.createElement("img");
  imgs.crossOrigin = "anonymous";
  imgs.src =
    "https://cdn.jsdelivr.net/gh/Maruhati3/DDR_WORLD_FlareImage/Image/" +
    Pstyle +
    "TextW.png";
  imgs.style.height = "110%";
  imgs.style.width = "auto";
  imgs.style.position = "absolute";
  imgs.style.left = "-10px";
  imgs.style.top = "-4px";

  // 追加先の div を取得
  const targetDiv = document.querySelector(".chapter");
  targetDiv.style.position = "relative";

  // div に画像を追加

  if (targetDiv) {
    targetDiv.appendChild(imgs);
  }

  var style = document.createElement("style");
  style.innerHTML =
    "#ddr_right #data_tbl td:nth-child(1) { width: 58px !important; }";
  document.head.appendChild(style);
  var sumC = 0;
  var sumW = 0;
  var sumG = 0;
  document.querySelectorAll(".data").forEach((aSong) => {
    if (aSong.classList[1] == "flareskill_classic_table") {
      sumC += parseInt(aSong.children[3].textContent);
    } else if (aSong.classList[1] == "flareskill_white_table") {
      sumW += parseInt(aSong.children[3].textContent);
    } else {
      sumG += parseInt(aSong.children[3].textContent);
    }

    Difficulties = aSong.children[1].textContent.split(".");
    Difficulties[0] = Difficulties[0].slice(0, Difficulties[0].length - 2);
    aSong.children[1].textContent = Difficulties[1];
    JK = aSong.children[0].children[0];
    JK.width = 50;
    songName = aSong.children[0].children[1];
    songName.style = "height:25px;width:calc(100%);";
    if (JK.src.slice(JK.src.length - 1) != "d") {
      JK.src = JK.src.slice(0, JK.src.length - 2);
    }
    if (Difficulties[0] == "EXPERT") {
      JK.style = "border: solid 4px #369722";
    } else if (Difficulties[0] == "CHALLENGE") {
      JK.style = "border: solid 4px #bc26c1";
    } else if (Difficulties[0] == "DIFFICULT") {
      JK.style = "border: solid 4px #c2050b";
    } else if (Difficulties[0] == "BASIC") {
      JK.style = "border: solid 4px #ffde00";
    } else if (Difficulties[0] == "BEGINNER") {
      JK.style = "border: solid 4px #0fa7ff";
    }
    aSong.children[4].remove();
    aSong.firstElementChild.rowSpan = 2;
    aSong.firstElementChild.firstChild.parentNode.insertAdjacentHTML(
      "afterend",
      '<td colspan="3" width="calc(100%-58px)">' +
        aSong.firstElementChild.children[1].outerHTML +
        "</td>"
    );
    aSong.firstElementChild.children[1].remove();
    aSong.children[1].style =
      "max-width:calc(100%-58px);text-align:left;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;";
    aSong.children[2].textContent = "Lv : " + aSong.children[2].textContent;
    aSong.children[2].style = "text-align:center";
    aSong.children[3].style = "text-align:center";
    aSong.children[4].style = "text-align:center";
    aSong.children[4].textContent = "FS : " + aSong.children[4].textContent;
    tr_second_text =
      "<tr>" +
      aSong.children[2].outerHTML +
      aSong.children[4].outerHTML +
      aSong.children[3].outerHTML +
      "</tr>";
    aSong.firstChild.parentNode.insertAdjacentHTML("afterend", tr_second_text);
    aSong.children[2].remove();
    aSong.children[3].remove();
    aSong.children[2].remove();
  });
  document.querySelectorAll("#data_tbl").forEach((tbl) => {
    tbl.children[0].children[0].remove();
    tbl.style = "width:calc(100%/3);font-size:220%;table-layout:fixed;";
  });
  document.querySelectorAll(".graph_title").forEach((tbl) => {
    tbl.style.width = "calc(31.5%)";
  });
  //余計な要素の処理
  document.querySelector(".style-tab").remove();
  document.querySelector(".game_inner").style = "display:flex;flex-wrap:wrap;";
  document.querySelector(".game_inner").children[0].remove();
  base = document.querySelector(".game_inner");
  base.insertBefore(base.children[4], base.firstElementChild);
  base.insertBefore(base.children[3], base.firstElementChild);
  base.insertBefore(base.children[2], base.firstElementChild);
  document.querySelector("#ddr_left").remove();
  document.querySelector("#license").remove();
  document.querySelector(".main").children[2].remove();

  Pname1 = '<span style="font-size:30px">Dancer Name&nbsp;</span>';
  Pname2 = document.querySelectorAll(".name_str")[1].innerHTML;
  TotalFlare1 = '<span style="font-size:30px">Total Flare Skill</span>';
  TotalFlare2 = parseInt(sumC) + parseInt(sumW) + parseInt(sumG);
  //曲数が満たない場合に空欄埋めるゾーン
  maxindex = Math.max(
    document.querySelectorAll(".data.flareskill_classic_table").length,
    document.querySelectorAll(".data.flareskill_white_table").length,
    document.querySelectorAll(".data.flareskill_gold_table").length
  );
  if (
    maxindex !=
    document.querySelectorAll(".data.flareskill_classic_table").length
  ) {
    document.querySelectorAll("#data_tbl")[0].innerHTML =
      document.querySelectorAll("#data_tbl")[0].innerHTML +
      '<tr style="height: calc(67.8px*' +
      parseInt(
        maxindex -
          document.querySelectorAll(".data.flareskill_classic_table").length
      ) +
      ');"></tr>';
  }
  if (
    maxindex != document.querySelectorAll(".data.flareskill_white_table").length
  ) {
    document.querySelectorAll("#data_tbl")[1].innerHTML =
      document.querySelectorAll("#data_tbl")[1].innerHTML +
      '<tr style="height: calc(67.8px*' +
      parseInt(
        maxindex -
          document.querySelectorAll(".data.flareskill_white_table").length
      ) +
      ');"></tr>';
  }
  if (
    maxindex != document.querySelectorAll(".data.flareskill_gold_table").length
  ) {
    document.querySelectorAll("#data_tbl")[2].innerHTML =
      document.querySelectorAll("#data_tbl")[2].innerHTML +
      '<tr style="height: calc(67.8px*' +
      parseInt(
        maxindex -
          document.querySelectorAll(".data.flareskill_gold_table").length
      ) +
      ');"></tr>';
  }
  //Classic White Goldのテキスト生成
  // sumC=     ("Classic&nbsp;Sum: " +sumC+"&nbsp;&nbsp;Classic average : "+(sumC/30).toPrecision(4));
  // sumW=     ("White&nbsp;&nbsp;&nbsp;Sum: "     +sumW  +"&nbsp;&nbsp;White&nbsp;&nbsp;&nbsp;average : "+(sumW/30).toPrecision(4));
  // sumG=     ("Gold&nbsp;&nbsp;&nbsp;&nbsp;Sum: "+sumG +"&nbsp;&nbsp;Gold&nbsp;&nbsp;&nbsp;&nbsp;average : "+(sumG/30).toPrecision(4));
  sumC =
    "Classic&nbsp;: " +
    sumC +
    "&nbsp;(" +
    (
      sumC / document.querySelectorAll(".data.flareskill_classic_table").length
    ).toPrecision(4) +
    ")";
  sumW =
    "White&nbsp;&nbsp;&nbsp;: " +
    sumW +
    "&nbsp;(" +
    (
      sumW / document.querySelectorAll(".data.flareskill_white_table").length
    ).toPrecision(4) +
    ")";
  sumG =
    "Gold&nbsp;&nbsp;&nbsp;&nbsp;: " +
    sumG +
    "&nbsp;(" +
    (
      sumG / document.querySelectorAll(".data.flareskill_gold_table").length
    ).toPrecision(4) +
    ")";

  //上部分-------------------------------------------------------------------------------------------------------------------------------------------

  let PlayerData = document.createElement("div");
  PlayerData.id = "PlayerData";
  PlayerData.style =
    "font-weight:600;width:100%;height:180px;display:flex;flex-wrap: wrap;justify-content: flex-around;align-items:flex-center;align-content:space-around;";
  document
    .querySelector(".main")
    .insertBefore(PlayerData, document.querySelector(".game_inner"));

  /*
    <img src="https://raw.githubusercontent.com/Maruhati3/DDR_WORLD_FlareImage/main/Image/SpText.png" class="pc" alt="楽曲データ/フレアスキル対象楽曲" style="height:100%;width:auto;position:absolute;left:0px;top:0;">
    
    
    
    */

  //1列目
  let PlayerDataChild1 = document.createElement("div");
  PlayerDataChild1.id = "PlayerData1";
  PlayerDataChild1.style = "width:44%;height:100%;font-size:50px;";
  document.querySelector("#PlayerData").appendChild(PlayerDataChild1);
  //上段の構成
  let PDC1C1 = document.createElement("div");
  PDC1C1.id = "PDC1C1";
  //PDC1C1.style="width:100%;height:50%;text-align:center;vertical-align: middle;display:flex;justify-content:center;align-items:center;";
  PDC1C1.style =
    "width:100%;height:50%;text-align:center;vertical-align: middle;display:flex;justify-content:center;align-items:center;flex-wrap: wrap;justify-content: flex-around;align-items:flex-center;align-content:space-around;";
  document.querySelector("#PlayerData1").appendChild(PDC1C1);
  let PDC1C1C1 = document.createElement("div");
  PDC1C1C1.style =
    "width:50%;height:100%;display:flex;justify-content:flex-end;align-items:center;flex-wrap: wrap;justify-content: flex-around;align-items:flex-center;align-content:space-around;";
  PDC1C1C1.innerHTML = Pname1;
  let PDC1C1C2 = document.createElement("div");
  PDC1C1C2.style =
    "width:50%;height:100%;display:flex;justify-content:center;align-items:center;flex-wrap: wrap;justify-content: flex-around;align-items:flex-center;align-content:space-around;";
  PDC1C1C2.innerHTML = Pname2;
  document.querySelector("#PDC1C1").appendChild(PDC1C1C1);
  document.querySelector("#PDC1C1").appendChild(PDC1C1C2);
  //下段の構成
  let PDC1C2 = document.createElement("div");
  PDC1C2.id = "PDC1C2";
  PDC1C2.style =
    "width:100%;height:50%;text-align:center;vertical-align: middle;display:flex;justify-content:center;align-items:center;flex-wrap: wrap;justify-content: flex-around;align-items:flex-center;align-content:space-around;";
  document.querySelector("#PlayerData1").appendChild(PDC1C2);
  //TotalFlareSkillの文字列
  let PDC1C2C1 = document.createElement("div");
  PDC1C2C1.style =
    "width: 50%; height: 100%; display: flex; justify-content:flex-end; align-items: center; flex-wrap: wrap;";
  PDC1C2C1.innerHTML = TotalFlare1;
  //TotalFlareSkillの数値
  let PDC1C2C2 = document.createElement("div");
  PDC1C2C2.id = "PDC1C2C2";
  PDC1C2C2.style =
    "font-size:90%; width: 50%; height: 100%; display: flex; justify-content:flex-start; align-items: center; flex-wrap: wrap;";
  document.querySelector("#PDC1C2").appendChild(PDC1C2C1);
  document.querySelector("#PDC1C2").appendChild(PDC1C2C2);
  const TotalColorNum = [
    90000, 86250, 82500, 78750, 75000, 71250, 67500, 63750, 60000, 56250, 52500,
    48750, 45000, 42250, 39500, 36750, 34000, 31500, 29000, 26500, 24000, 22000,
    20000, 18000, 16000, 14500, 13000, 11500, 10000, 9000, 8000, 7000, 6000,
    5000, 4000, 3000, 2000, 1500, 1000, 500, 0,
  ];
  const TotalColorName = [
    "world",
    "sun",
    "neptune",
    "uranus",
    "saturn",
    "jupiter",
    "mars",
    "earth",
    "venus",
    "mercury",
    "none",
  ];

  /*
  [
      "#9a4cf4",
      "#e25eb9",
      "#fb6587",
      "#ffa165",
      "#fdce4a",
      "#fefc03",
      "#e6ff1e",
      "#ccff50",
      "#9cfd83",
      "#54f3b0",
    ]
  */
  const TotalColorCode = [
    [
      "#9a4cf4",
      "#e25eb9",
      "#fb6587",
      "#ffa165",
      "#fdce4a",
      "#e0e015",
      "#c8e136",
      "#ccff50",
      "#9cfd83",
      "#54f3b0",
    ],
    ["#ff6500"],
    ["#2f3292"],
    ["#41d3dc"],
    ["#d51e5e"],
    ["#e8b364"],
    ["#ff3800"],
    ["#00c199"],
    ["#ffbd00"],
    ["#55d8f5"],
    ["#8e8f8f"],
  ];
  colori = 0; //2列目用変数

  //debug用にレート値を変化させるゾーン----------------------------------------------------
  //TotalFlare2 = "74999";
  // console.debug(TotalFlare2);
  for (var i = 0; i < TotalColorNum.length; i++) {
    if (parseInt(TotalFlare2) >= parseInt(TotalColorNum[i])) {
      colori = i;
      document
        .querySelector("#PDC1C2C2")
        .appendChild(
          generateSVGText(
            TotalFlare2,
            "TotalFS",
            TotalColorCode[parseInt(Math.floor((i + 3) / 4))],
            220,
            90,
            50
          )
        );

      // if(i==0){
      //   console.debug(TotalColorCode[parseInt(Math.floor((i+3)/4))]);
      // document.querySelector("#PDC1C2C2").appendChild(generateSVGText(TotalFlare2, "TotalFS",TotalColorCode[parseInt(Math.floor((i+3)/4))],196,90,50));
      // }else{
      //   PDC1C2C2.innerHTML='<span style="color:'+TotalColorCode[parseInt(Math.floor((i+3)/4))]+';">'+TotalFlare2+'</span>';
      // }
      break;
    }
  }
  document.querySelector("#PDC1C2").appendChild(PDC1C2C1);
  document.querySelector("#PDC1C2").appendChild(PDC1C2C2);
  // PDC1C2.innerHTML = TotalFlare1 + TotalFlare2;
  //console.log("一列目終了");
  //2列目------------------------------------
  let PlayerDataChild2 = document.createElement("div");
  PlayerDataChild2.id = "PlayerData2";
  PlayerDataChild2.style =
    "width:16%;height:100%;font-size:40px;display: flex; justify-content: center;align-items:center;";
  document.querySelector("#PlayerData").appendChild(PlayerDataChild2);
  let PlayerDataChild2_1 = document.createElement("div");
  PlayerDataChild2_1.id = "PlayerData2_1";
  PlayerDataChild2_1.style = "width:160px;height:160px;position: relative;";
  document.querySelector("#PlayerData2").appendChild(PlayerDataChild2_1);

  //ドーナツ型のチャート作成部分
  //埋め込み用キャンバスを生成
  let FlareCanvas = document.createElement("canvas");
  FlareCanvas.id = "doughnutChart";
  FlareCanvas.width = 160;
  FlareCanvas.height = 160;
  FlareCanvas.style =
    "position: absolute;left: 0;  top: 0;  width: 100%;  height: 100%;";
  document.querySelector("#PlayerData2_1").appendChild(FlareCanvas);
  //グラフ用パラメータを設定---------------
  if (colori == 0) {
    //
    // percentage = 99.9999999;
    percentage = (TotalFlare2 % 1000) / 10;
  } else {
    percentage =
      (100 * (parseInt(TotalFlare2) - TotalColorNum[colori])) /
      (TotalColorNum[colori - 1] - TotalColorNum[colori]);
  }
  // 背景色とグラデーション設定
  let colorArray = TotalColorCode[parseInt(Math.floor((i + 3) / 4))];
  let backgroundColor;
  if (colorArray.length > 1) {
    backgroundColor = colorArray; // グラデーション
  } else {
    backgroundColor = [colorArray[0], colorArray[0]]; // 単色
  }
  //惑星の名前 一行目の文字列
  chartname1 = TotalColorName[parseInt(Math.floor((i + 3) / 4))];
  // 二行目の文字列
  if (colori == 0) {
    chartname2 = "+".repeat(parseInt((TotalFlare2 - 90000) / 1000));
  } else {
    chartname2 = "+".repeat(parseInt((40 - colori) % 4));
  }

  // console.debug(percentage);
  // console.debug(backgroundColor);

  // Chart.jsのスクリプトを動的に読み込んでから実行
  let chartScript = document.createElement("script");
  chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js";
  chartScript.onload = function () {
    // スクリプトがロードされたらその場で実行
    let ctx = FlareCanvas.getContext("2d");
    // 線形グラデーションの作成
    let gradient = ctx.createLinearGradient(0, 0, 0, 160); // (0, 0) から (0, 160) に縦のグラデーション
    backgroundColor.forEach((color, index) => {
      let offsetValue = (index / (backgroundColor.length - 1)) * 100;
      gradient.addColorStop(offsetValue / 100, color); // 色を均等に配置
    });

    // スクリプトがロードされたらその場で実行
    new Chart(FlareCanvas, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [percentage, 100 - percentage], //
            backgroundColor: [
              gradient, // 赤色
              "rgba(0, 0, 0, 0)", // 背景透明
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: false,
        cutout: "75%", // ドーナツの中心を大きめに
        plugins: {
          legend: { display: false }, // 凡例を非表示
        },
      },
    });

    // 真ん中にテキストを追加
    let svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", 160);
    svg.setAttribute("height", 160);

    // <defs> と <linearGradient> を作成
    let defs = document.createElementNS(svgNS, "defs");
    let gradientText = document.createElementNS(svgNS, "linearGradient");
    gradientText.setAttribute("id", "textGradient");
    gradientText.setAttribute("x1", "0%");
    gradientText.setAttribute("y1", "0%");
    gradientText.setAttribute("x2", "100%");
    gradientText.setAttribute("y2", "100%");

    backgroundColor.forEach((color, index) => {
      let offsetValue = (index / (backgroundColor.length - 1)) * 100;
      gradientText.innerHTML += `<stop offset="${offsetValue}%" stop-color="${color}" />`;
    });

    defs.appendChild(gradientText);
    svg.appendChild(defs);

    // SVGテキスト要素作成
    let textElem = document.createElementNS(svgNS, "text");
    textElem.setAttribute("x", "50%");
    textElem.setAttribute("y", "50%");
    textElem.setAttribute("font-size", "30");
    textElem.setAttribute("font-weight", "bold");
    textElem.setAttribute("fill", "url(#textGradient)"); // グラデーション適用
    textElem.setAttribute("text-anchor", "middle");
    textElem.setAttribute("dominant-baseline", "middle");

    // 1行目
    let tspan1 = document.createElementNS(svgNS, "tspan");
    tspan1.setAttribute("x", "50%");
    tspan1.setAttribute("dy", "-0.2em"); // ちょっと上に調整
    tspan1.textContent = chartname1;
    textElem.appendChild(tspan1);

    // 2行目（改行用にtspanを使う）
    let tspan2 = document.createElementNS(svgNS, "tspan");
    tspan2.setAttribute("x", "50%");
    tspan2.setAttribute("dy", "1.2em"); // 2行目の位置調整
    tspan2.textContent = chartname2;
    textElem.appendChild(tspan2);

    svg.appendChild(textElem);

    //ここまでテキスト生成
    FlareCanvas.parentNode.appendChild(svg);
  };
  document.body.appendChild(chartScript);

  //3列目---------------------------------

  let PlayerDataChild3 = document.createElement("div");
  PlayerDataChild3.id = "PlayerData3";
  PlayerDataChild3.style = "width:34%;height:100%;font-size:40px;";
  document.querySelector("#PlayerData").appendChild(PlayerDataChild3);

  // let PDC2C1=document.createElement("p");
  // PDC2C1.style="background:linear-gradient(90deg,  #cd9370, #c1703e, #cd9370);-webkit-background-clip: text; -webkit-text-fill-color: transparent;width: 100%; height: calc(33.3333%); text-align: center; vertical-align: middle; display: flex; justify-content: center; align-items: center;"
  // PDC2C1.innerHTML = sumC;
  // let PDC2C2=document.createElement("p");
  // PDC2C2.style="background:linear-gradient(90deg,#cfcfce, #b9b7b7);-webkit-background-clip: text; -webkit-text-fill-color: transparent;width: 100%; height: calc(33.3333%); text-align: center; vertical-align: middle; display: flex; justify-content: center; align-items: center;"
  // PDC2C2.innerHTML = sumW;
  // let PDC2C3=document.createElement("p");
  // PDC2C3.style="background:linear-gradient(90deg,  #ffdd2e, #ffea49, #995e1d, #723a22, #b67f18, #f0c41a, #c69f37, #936723);;-webkit-background-clip: text; -webkit-text-fill-color: transparent;width: 100%; height: calc(33.3333%); text-align: center; vertical-align: middle; display: flex; justify-content: center; align-items: center;"
  // PDC2C3.innerHTML = sumG;

  document
    .querySelector("#PlayerData3")
    .appendChild(
      generateSVGText(
        sumC,
        "classicGradient",
        ["#cd9370", "#c1703e", "#cd9370"],
        476,
        60,
        40
      )
    );
  document
    .querySelector("#PlayerData3")
    .appendChild(
      generateSVGText(
        sumW,
        "whiteGradient",
        ["#cfcfce", "#b9b7b7"],
        476,
        60,
        40
      )
    );
  document
    .querySelector("#PlayerData3")
    .appendChild(
      generateSVGText(
        sumG,
        "goldGradient",
        ["#ffdd2e", "#ffea49", "#995e1d", "#723a22", "#b67f18", "#c69f37"],
        476,
        60,
        40
      )
    );

  //4列目
  let PlayerDataChild4 = document.createElement("div");
  PlayerDataChild4.id = "PlayerData4";
  PlayerDataChild4.style = "width:6%;height:100%;font-size:40px;";
  document.querySelector("#PlayerData").appendChild(PlayerDataChild4);

  // document.querySelector("#PlayerData3").appendChild(PDC2C1);
  // document.querySelector("#PlayerData3").appendChild(PDC2C2);
  // document.querySelector("#PlayerData3").appendChild(PDC2C3);

  document.querySelector(".main").style = "width:1400px;";

  //画像化-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //画像化-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //画像化-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //画像化-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //画像化-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //画像化-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //画像化-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  let loader = document.createElement("div");
  loader.id = "loader";
  loader.innerHTML = '<div class="spinner"></div> Loading...';
  loader.style.position = "fixed";
  loader.style.top = "50%";
  loader.style.left = "50%";
  loader.style.transform = "translate(-50%, -50%)";
  loader.style.fontSize = "40px";
  document.body.appendChild(loader);
  let script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

  /*
  script.onload = () => {
    // 一定時間待機してから画像化処理を実行
    setTimeout(() => {
      html2canvas(document.querySelector(".main")).then((canvas) => {
        let topElement = document.querySelector("#top");
        while (topElement.firstChild) {
          topElement.removeChild(topElement.firstChild);
        }
        let img = document.createElement("img");
        img.src = canvas.toDataURL("image/png");
        img.style.width = "100%";
        img.style.cursor = "pointer";
        img.onclick = function () {
          let link = document.createElement("a");
          link.href = img.src;
          link.download = "FlareList.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
        topElement.appendChild(img);
        document.getElementById("loader").remove();
      });
    }, 2000); // 2秒待機（必要に応じて調整可能）
  };*/

  script.onload = () => {
    (async () => {
      // 外部cdn画像があるなら crossOrigin を強制（任意）
      Array.from(document.images).forEach((im) => {
        try {
          const url = new URL(im.src, location.href);
          if (
            url.hostname.endsWith("cdn.jsdelivr.net") ||
            url.hostname.endsWith("raw.githubusercontent.com")
          ) {
            const cur = im.src;
            im.crossOrigin = "anonymous";
            im.src = cur;
          }
        } catch (e) {}
      });

      // 全 img の decode を待つ（最大5秒でタイムアウト）
      const imgsAll = Array.from(document.images);
      const decodePromises = imgsAll.map((im) => {
        if ("decode" in im) {
          return im.decode().catch(
            () =>
              new Promise((res) => {
                if (im.complete) return res();
                im.onload = res;
                im.onerror = res;
              })
          );
        } else {
          return new Promise((res) => {
            if (im.complete) return res();
            im.onload = res;
            im.onerror = res;
          });
        }
      });
      const timeout = new Promise((res) => setTimeout(res, 5000));
      await Promise.race([Promise.all(decodePromises), timeout]);

      // 見た目上は h2 に合わせていた imgs の高さが % で不安定ならここで再調整
      try {
        const chapter = document.querySelector(".chapter");
        const heading = chapter && chapter.querySelector("h2");
        if (heading) {
          const h2h =
            heading.getBoundingClientRect().height || heading.offsetHeight;
          const overlay = chapter.querySelector("img"); //imgs が最初の img の場合
          if (overlay) overlay.style.height = h2h + "px";
        }
      } catch (e) {}

      // html2canvas 実行（CORSを有効）
      try {
        const canvas = await html2canvas(document.querySelector(".main"), {
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
          scale: window.devicePixelRatio || 2,
        });

        const topElement = document.querySelector("#top");
        while (topElement.firstChild)
          topElement.removeChild(topElement.firstChild);
        const outImg = document.createElement("img");
        outImg.src = canvas.toDataURL("image/png");
        outImg.style.width = "100%";
        outImg.style.cursor = "pointer";
        outImg.onclick = function () {
          const link = document.createElement("a");
          link.href = outImg.src;
          const date = new Date();
          const y = date.getFullYear();
          const m = String(date.getMonth() + 1).padStart(2, "0");
          const d = String(date.getDate()).padStart(2, "0");
          const h = String(date.getHours()).padStart(2, "0");
          const minu = String(date.getMinutes()).padStart(2, "0");
          const filename = "FlareList_" + y + m + d + "_" + h + minu + ".png";

          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
        topElement.appendChild(outImg);
      } catch (err) {
        console.error("html2canvas error:", err);
      } finally {
        const ld = document.getElementById("loader");
        if (ld) ld.remove();
      }
    })();
  };

  document.body.appendChild(script);
};
