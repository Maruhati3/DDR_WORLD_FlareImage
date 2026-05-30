window.MakeFlareImage = function () {
  const style = document.createElement("style");

  style.textContent = `

  .flare-image {
    width: 100%;
    height: auto;
    display: block;
  }

  .download-button {
    margin-bottom: 10px;
    padding: 8px 16px;
    cursor: pointer;
  }
  a.new_music_info {
    margin-top: 2px; 
    margin-bottom: 2px; 
    line-height: 24px;
  }
  .new_style-button{
    border: 1px solid lightgray;
    border-bottom: none;
    padding: 8px;
    background: white;
    border-radius: 6px 6px 0 0;
    font-weight: bold;
    font-size: 1.8em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
  }
  .new_header-ui{
    line-height: 1em;
    font-size: 1.3em;
    background: radial-gradient(circle, rgba(251, 110, 10, 1) 0%, rgba(251, 191, 10, 1) 100%);
    padding: 0.6em;
    color: white;
    text-align: center;
    text-shadow: 0 0 4px #875700e0;
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 0 4px 8px #f09c007a;
  }
  .new_skill-value{
    font-weight: bold;
    font-size:1.8em;
  }
  .chart .new_music-name {
    text-align: left;
    font-weight: bold;
    line-height: 1em;
    margin-bottom: 2px;
    font-size: 1.7em;
    text-decoration: underline;
    overflow-wrap: break-word;
  }
  .new_analyze{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .starbox{
    display:flex;
    justify-content:center;
    gap:4px;
    margin-bottom:8px !important;
  }
  .analyzeChild1{
    width:73.8%;
    max-width:80%;
    border-radius: 4px;
    color: #909090;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    line-height: 1em;
    padding: 16px;
    margin-bottom: 16px;
    border: 1px solid lightgray;
    background-size: auto auto;
    background-color: rgb(252 252 252) !important;
  }
  .table1{
    width:15%;
    max-width:15%;
  }
  .table2{
    width:60%;
    max-width:60%;
  }
  .new_table-ui{
    border: 1px solid lightgray !important;
    border-radius: 6px;
    overflow: hidden;
    border-collapse: collapse;
  }
  .new_table-ui th,
  .new_table-ui td {
    font-size: 1.8em;
    font-weight: bold;
    overflow: hidden;
  }
  .new_table-ui tr.theme-classic {
    --tbl-accent: #d29067;
    --tbl-line: #efdfc8;
    --tbl-cell-line: transparent;
    --tbl-text: #4a2f12;
    --tbl-row-odd: #fff2e9;
    --tbl-row-even: #fff2e9;
  }

  .new_table-ui tr.theme-white {
    --tbl-accent: #acbec7;
    --tbl-line: #e1e1e1;
    --tbl-cell-line: transparent;
    --tbl-text: #5f5f5f;
    --tbl-row-odd: #f0f0f0;
    --tbl-row-even: #f0f0f0;
  }

  .new_table-ui tr.theme-gold {
    --tbl-accent: #e9bc2c;
    --tbl-line: #efdfc8;
    --tbl-cell-line: transparent;
    --tbl-text: #4a2f12;
    --tbl-row-odd: #fff6d1;
    --tbl-row-even: #fff6d1;
  }

  .new_table-ui tr.theme-classic td {
    color: var(--tbl-text);
    background: var(--tbl-row-odd);
    border-color: var(--tbl-line);
  }

  .new_table-ui tr.theme-white td {
    color: var(--tbl-text);
    background: var(--tbl-row-odd);
    border-color: var(--tbl-line);
  }

  .new_table-ui tr.theme-gold td {
    color: var(--tbl-text);
    background: var(--tbl-row-odd);
    border-color: var(--tbl-line);
  }
  .table1,
  .table2,
  .total-flare-skill,
  .analyzeChild1{
    box-sizing:border-box;
  }    
  @media screen {
  #ddr_left{display: none;}
  #ddr_right{width: 100%;}
}
  `;

  document.head.appendChild(style);
  // html2canvas が未ロードなら読み込む
  function loadHtml2Canvas(callback) {
    // 既に読み込み済み
    if (window.html2canvas) {
      callback();
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
    script.onload = callback;
    document.body.appendChild(script);
  }
  // html2canvasにつかえるrgb形式に色を変える。
  function replaceUnsupportedColors(root = document.body) {
    const all = root.querySelectorAll("*");

    all.forEach((el) => {
      const style = getComputedStyle(el);

      // 対象プロパティ
      const props = [
        "color",
        "backgroundColor",
        "borderTopColor",
        "borderRightColor",
        "borderBottomColor",
        "borderLeftColor",
      ];

      props.forEach((prop) => {
        const value = style[prop];

        // color(...) を検出
        if (value && value.includes("color(")) {
          // 一旦安全な色へ
          el.style[prop] = "#000";
        }
      });
    });
  }
  // div を画像化
  function convertDivToImage(Str_targetid, Str_resultContainer) {
    const target = document.querySelector(Str_targetid);
    const resultContainer = document.querySelector(Str_resultContainer);

    replaceUnsupportedColors();

    html2canvas(target)
      .then((canvas) => {
        const image = new Image();

        image.src = canvas.toDataURL("image/png");

        image.classList.add("flare-image");

        // ダウンロードボタン
        const downloadButton = document.createElement("button");

        downloadButton.textContent = "画像をダウンロード";
        downloadButton.classList.add("download-button");

        downloadButton.onclick = () => {
          const link = document.createElement("a");

          link.href = image.src;

          // 保存ファイル名
          const date = new Date();
          const y = date.getFullYear();
          const m = String(date.getMonth() + 1).padStart(2, "0");
          const d = String(date.getDate()).padStart(2, "0");
          const h = String(date.getHours()).padStart(2, "0");
          const minu = String(date.getMinutes()).padStart(2, "0");

          const filename = "FlareList_"+Style+"_" + y + m + d + "_" + h + minu + ".png";    

          link.download = `${filename}.png`;

          link.click();
        };

        // 中身クリア
        resultContainer.innerHTML = "";

        // 第一要素: ボタン
        resultContainer.appendChild(downloadButton);

        // 第二要素: 画像
        resultContainer.appendChild(image);
      })
      .catch((err) => {
        console.error("html2canvas error:", err);
      });
  }
  //文字列を縮める
  function fitText(el) {
    if (!el.dataset.originalFontSize) {
      el.dataset.originalFontSize = window.getComputedStyle(el).fontSize;
    }

    const original = parseFloat(el.dataset.originalFontSize);

    let size = original;

    const minSize = 8;

    // 元サイズへ戻す
    el.style.fontSize = el.dataset.originalFontSize;

    // 親を超える時だけ縮小
    while (el.scrollWidth > el.parentElement.clientWidth && size > minSize) {
      size -= 0.5;

      el.style.fontSize = size + "px";
    }
  }
  function fitTextTwoLines(el) {
    // 初回だけ元サイズ保存
    if (!el.dataset.originalFontSize) {
      el.dataset.originalFontSize = window.getComputedStyle(el).fontSize;
    }

    const original = parseFloat(el.dataset.originalFontSize);

    let size = original;

    const minSize = 8;

    // 元サイズへ戻す
    el.style.fontSize = el.dataset.originalFontSize;

    const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight);

    // 2行まで許容
    const maxHeight = lineHeight * 2;

    // 3行目に入る間だけ縮小
    while (el.scrollHeight > maxHeight && size > minSize) {
      size -= 0.5;

      el.style.fontSize = size + "px";
    }
  }
  function fitCell(el) {
    if (!el.dataset.originalFontSize) {
      el.dataset.originalFontSize = getComputedStyle(el).fontSize;
    }

    const original = parseFloat(el.dataset.originalFontSize);

    let size = original;

    const availableWidth =
      el.getBoundingClientRect().width -
      parseFloat(getComputedStyle(el).paddingLeft) -
      parseFloat(getComputedStyle(el).paddingRight);

    while (size > 8) {
      el.style.fontSize = size + "px";

      const canvas =
        fitCell.canvas || (fitCell.canvas = document.createElement("canvas"));
      const ctx = canvas.getContext("2d");

      const style = getComputedStyle(el);

      ctx.font = `${style.fontWeight} ${size}px ${style.fontFamily}`;

      const textWidth = ctx.measureText(el.textContent).width;

      if (textWidth <= availableWidth) {
        break;
      }

      size -= 0.5;
    }
  }
  function applyMusicFit() {
    document.querySelectorAll(".new_music-name").forEach(fitTextTwoLines);
  }
  // ===== main ============================================================================================================================================================================================================================================================
  // ===== main ============================================================================================================================================================================================================================================================
  // ===== main ============================================================================================================================================================================================================================================================
  // ===== main ============================================================================================================================================================================================================================================================
  // ===== main ============================================================================================================================================================================================================================================================
  // ===== main ============================================================================================================================================================================================================================================================
  //横幅を固定
  document.querySelector(".main-ui").style.width = "1400px";

  //styleボタンのうち合致していないものを削除
  elementsStyleButton = document.querySelectorAll(".style-button");
  elementsStyleButton.forEach((stylebutton) => {
    if (stylebutton.children[0].classList[0] != "select") {
      //styleボタンのうち合致していないものを削除
      stylebutton.remove();
    } else {
      //SPorDP
      Style = stylebutton.children[0].children[0].alt;
    }
  });
  //ddr_rightが枠幅を削るので属性を削除
  //document.querySelector('#ddr_right').id='';

  //divtabをstyle表示の横に追加しDancerNameを表示する。
  elementStyleTab = document.querySelector(".style-tab");
  const div_DancerName = document.createElement("div");
  // クラス追加
  div_DancerName.classList.add("new_style-button");
  // ユーザー名
  div_DancerName.textContent =
    "⠀Dancer Name⠀:⠀" +
    document.querySelectorAll(".name_str")[1].innerHTML +
    "⠀";
  // append
  elementStyleTab.appendChild(div_DancerName);
  //タイトル追加
  const div_Title = document.createElement("div");
  div_Title.classList.add("new_header-ui");
  div_Title.textContent = "⠀フレアスキル対象楽曲⠀";
  elementStyleTab.appendChild(div_Title);
  // 消したいセレクタ（クラスやID）を配列にまとめます
  const elementsToRemove = [
    "#ddr_left",
    ".text",
    "#license",
    ".header-ui",
    "#user_name",
    "#Gmenu_pc",
    "#Gmenu_sp",
    "#title_bg",
  ];
  // リストをループして一致する要素をすべて削除します
  elementsToRemove.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.remove();
    });
  });
  //レベル用の列を生やす
  const elementsUi = document.querySelectorAll(".table-ui");
  elementsUi.forEach((ui) => {
    const thead = ui.querySelector("thead");

    if (!thead) return;
    // 1行目のtr取得
    const tr = thead.querySelector("tr");
    if (!tr) return;
    // 新しいth作成
    const newTh = document.createElement("th");
    newTh.textContent = "レベル";
    // 2番目(index=1)のthを取得
    const secondTh = tr.children[1];
    // 1,2要素目の間に挿入
    tr.insertBefore(newTh, secondTh);
  });
  //各曲のデータ表示を変更
  const elementsOfSongs = document.querySelectorAll(".data");
  elementsOfSongs.forEach((data) => {
    //行の幅を変更
    elementChart = data.children[0];
    elementChart.children[0].classList.remove("music_info");
    elementChart.children[0].classList.add("new_music_info");
    //ジャケ画像を難易度に合わせたカラーの枠で覆う
    JacketImg = elementChart.children[0].children[0];
    Difficulty = elementChart.children[0].children[1].children[1].classList[1];
    if (Difficulty == "EXPERT") {
      JacketImg.style = "border: solid 4px #03db2c";
    } else if (Difficulty == "CHALLENGE") {
      JacketImg.style = "border: solid 4px #cf11f8";
    } else if (Difficulty == "DIFFICULT") {
      JacketImg.style = "border: solid 4px #fe2020";
    } else if (Difficulty == "BASIC") {
      JacketImg.style = "border: solid 4px #fed100";
    } else if (Difficulty == "BEGINNER") {
      JacketImg.style = "border: solid 4px #0fc6fe";
    }
    //Lv表記の移動
    Lv =
      elementChart.children[0].children[1].children[1].children[0].textContent;
    Lv = Lv.match(/\d+/)[0];
    // 新しいtd作成
    const newTd = document.createElement("td");
    newTd.textContent = Lv;
    newTd.classList.add("skill-value");
    // 2番目(index=1)のtd
    const secondTd = data.children[1];
    // 1,2要素目の間に挿入
    data.insertBefore(newTd, secondTd);
  });
  elementsUi.forEach((ui) => {
    //5の倍数の底辺を太くする
    const rows = ui.querySelectorAll("tbody tr");
    rows.forEach((row, index) => {
      // 5,10,15...行目（1-indexed）
      if ((index + 1) % 5 === 0) {
        row.querySelectorAll("td").forEach((td) => {
          td.style.borderBottom = "3px solid var(--tbl-line)";
        });
      }
    });
  });
  //lvとskill表示を変える(主に文字サイズ)
  document.querySelectorAll(".skill-value").forEach((skill) => {
    skill.classList.remove("skill-value");
    skill.classList.add("new_skill-value");
  });

  //元の難易度表記を削除
  const elementsDiff = document.querySelectorAll(".diff");
  elementsDiff.forEach((diff) => {
    diff.remove();
  });
  //data_tblの幅保護をリセット
  document.querySelectorAll("#data_tbl").forEach((table) => {
    table.style.tableLayout = "fixed";

    table.style.width = "100%";
  });

  document.querySelectorAll("#data_tbl td, #data_tbl th").forEach((cell) => {
    cell.style.overflow = "hidden";
  });
  //要素の幅を指定
  elementsOfSongs.forEach((data) => {
    const widths = ["70%", "8%", "14%", "8%"];

    [...data.children].forEach((cell, i) => {
      cell.style.width = widths[i];

      cell.style.maxWidth = widths[i];

      cell.style.boxSizing = "border-box";
    });
  });
  // 一行目の幅を指定
  elementsUi.forEach((ui) => {
    const thead = ui.querySelector("thead");

    if (!thead) return;

    // 1,2,3,4列
    const th1 = thead.children[0].children[0];
    const th2 = thead.children[0].children[1];
    const th3 = thead.children[0].children[2];
    const th4 = thead.children[0].children[3];

    // 幅指定
    th1.style.width = "70%";
    th2.style.width = "8%";
    th3.style.width = "14%";
    th4.style.width = "8%";

    // 念のため
    [th1, th2, th3, th4].forEach((th) => {
      th.style.maxWidth = th.style.width;

      th.style.boxSizing = "border-box";

      th.style.overflow = "hidden";
    });
  });
  //style-tabの折り返し設定を追加(flexbox)
  document.querySelector(".style-tab").style = "flex-wrap: wrap;";
  //文字列の幅を調整
  document.querySelectorAll(".new_skill-value").forEach((skill) => {
    skill.style.whiteSpace = "nowrap";

    skill.style.wordBreak = "keep-all";

    skill.style.lineHeight = "1";
    fitText(skill);
  });
  elementsUi.forEach((ui) => {
    const tr = ui.querySelector("thead").children[0];

    Array.from(tr.children).forEach((th) => {
      th.style.whiteSpace = "nowrap";

      th.style.wordBreak = "keep-all";

      th.style.lineHeight = "1";

      fitText(th);
    });
  });
  document.querySelectorAll(".new_style-button").forEach((stylebutton) => {
    stylebutton.style.whiteSpace = "nowrap";

    stylebutton.style.wordBreak = "keep-all";

    stylebutton.style.lineHeight = "1";
    fitText(stylebutton);
  });
  document.querySelectorAll(".music-name").forEach((musicname) => {
    musicname.classList.remove("music-name");
    musicname.classList.add("new_music-name");
    fitTextTwoLines(musicname);
  });
  applyMusicFit();
  window.addEventListener("resize", applyMusicFit);

  //上画面の調整
  //既存のフレアランク表示の移動
  const elementFlareLank = document.querySelector(".total-flare-skill");
  elementFlareLank.style = "width:20%;";
  // 新しいdiv作成
  const elementAnalyze = document.createElement("div");
  elementAnalyze.classList.add("new_analyze");
  // 直前に挿入
  elementFlareLank.parentNode.insertBefore(elementAnalyze, elementFlareLank);
  elementAnalyze.appendChild(elementFlareLank);
  //https://raw.githubusercontent.com/Maruhati3/DDR_WORLD_FlareImage/main/Image/star_10.png

  //worldデバッグ用=================================================================
  /*
  document.querySelectorAll(".rank-9").forEach(el=>{
    el.classList.remove("rank-9");
    el.classList.add("rank-10")
  });
  document.querySelector(".total-flare-skill-value").textContent="93200";
  */
  //worldデバッグ用=================================================================
  //WORLDの場合に星を挿入
  if (document.querySelector(".rank-10")) {
    const elementTotalFlareSKill = document.querySelector(
      ".total-flare-skill-value",
    );
    worldRank = Math.floor(
      (parseInt(
        document.querySelector(".total-flare-skill-value").textContent,
      ) -
        90000) /
        1000,
    );
    const elementStarBox = document.createElement("div");
    elementStarBox.classList.add("starbox");
    elementTotalFlareSKill.parentNode.insertBefore(
      elementStarBox,
      elementTotalFlareSKill,
    );
    for (let i = 0; i < worldRank; i++) {
      const img = document.createElement("img");
      img.classList.add("icon", "star");
      img.src =
        "https://raw.githubusercontent.com/Maruhati3/DDR_WORLD_FlareImage/main/Image/star_10.png";
      elementStarBox.appendChild(img);
    }
    //グラデーションの為にsvg作成

    const value = elementTotalFlareSKill.textContent.trim();

    const gradientId = `flareGradient_${crypto.randomUUID()}`;

    const svg = `
    <svg
      class="flare-gradient-text"
      width="70"
      height="31"
      viewBox="0 0 70 31"
    >
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ff4c87"/>
          <stop offset="16%" stop-color="#ff938a"/>
          <stop offset="32%" stop-color="#ffc114"/>
          <stop offset="48%" stop-color="#fffd21"/>
          <stop offset="64%" stop-color="#c9ff45"/>
          <stop offset="80%" stop-color="#7eff5d"/>
          <stop offset="100%" stop-color="#22ffbb"/>
        </linearGradient>
      </defs>

      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="url(#${gradientId})"
        font-size="22"
        font-weight="800"
        font-family="sans-serif"
      >
        ${value}
      </text>
    </svg>
    `;

    elementTotalFlareSKill.innerHTML = svg;
  }

  //各カテゴリーのデータ一覧取得
  //レート値のリスト
  //レート値のリスト
  const categoryList = ["TOTAL", "CLASSIC", "WHITE", "GOLD"];

  // TOTAL,CLASSIC,WHITE,GOLD
  const counts = [[], [], [], []];

  // =========================================
  // 各カテゴリ集計
  // =========================================
  elementsUi.forEach((ui, i) => {
    ui.querySelectorAll(".data").forEach((data) => {
      // 3列目
      const value = parseInt(data.children[2].textContent.trim(), 10);

      // 個別カテゴリ
      const found = counts[i + 1].find((row) => row[0] === value);

      if (found) {
        found[1] += 1;
      } else {
        counts[i + 1].push([value, 1]);
      }

      // TOTAL
      const totalFound = counts[0].find((row) => row[0] === value);

      if (totalFound) {
        totalFound[1] += 1;
      } else {
        counts[0].push([value, 1]);
      }
    });
  });

  // 降順ソート
  counts.forEach((list) => {
    list.sort((a, b) => b[0] - a[0]);
  });
  // =========================================
  // カテゴリーごとのレート
  // =========================================

  const sumList = Array(4).fill(0);

  document.querySelectorAll(".skill-category-info").forEach((skillInfo, i) => {
    const text = skillInfo.textContent;

    const match = text.match(/(\d+)\s*\((\d+)\s*\/\s*\d+\)/);

    if (match) {
      const skillSum = parseFloat(match[1]);

      sumList[i + 1] = skillSum;

      const skillCount = parseFloat(match[2]);

      const skillAve = (skillSum / skillCount).toFixed(2);

      skillInfo.textContent = "合計:" + skillSum + ",平均:" + skillAve;
    }
  });

  sumList[0] = sumList[1] + sumList[2] + sumList[3];

  // =========================================
  // Nextランク計算
  // =========================================

  const TotalColorNum = [
    93000, 92000, 91000, 90000, 86250, 82500, 78750, 75000, 71250, 67500, 63750,
    60000, 56250, 52500, 48750, 45000, 42250, 39500, 36750, 34000, 31500, 29000,
    26500, 24000, 22000, 20000, 18000, 16000, 14500, 13000, 11500, 10000, 9000,
    8000, 7000, 6000, 5000, 4000, 3000, 2000, 1500, 1000, 500, 0,
  ];

  let nextBorder = TotalColorNum[0];

  for (let i = 0; i < TotalColorNum.length - 1; i++) {
    if (sumList[0] < TotalColorNum[i] && sumList[0] >= TotalColorNum[i + 1]) {
      nextBorder = TotalColorNum[i];
      break;
    }
  }

  // =========================================
  // 偏り表作成
  // =========================================

  const table2 = document.createElement("table");

  table2.classList.add("table-ui", "new_table-ui","table2");

  const thead2 = document.createElement("thead");
  const headTr2 = document.createElement("tr");

  ["---", "合計", "バラツキ", "for Next"].forEach((text) => {
    const th = document.createElement("th");

    th.textContent = text;

    headTr2.appendChild(th);
  });

  thead2.appendChild(headTr2);

  table2.appendChild(thead2);

  // =========================================
  // tbody
  // =========================================

  const tbody2 = document.createElement("tbody");

  categoryList.forEach((name, rowIndex) => {
    const tr = document.createElement("tr");

    // ------------------
    // 名前
    // ------------------

    const tdName = document.createElement("td");

    tdName.textContent = name;

    tr.appendChild(tdName);

    // ------------------
    // 合計
    // ------------------

    const tdSum = document.createElement("td");

    tdSum.textContent = sumList[rowIndex];

    tr.appendChild(tdSum);

    // ------------------
    // バラツキ
    // ------------------

    const tdDiff = document.createElement("td");

    if (rowIndex === 0) {
      tdDiff.textContent = (sumList[0] / 3).toFixed(2);
    } else {
      tdDiff.textContent = (sumList[rowIndex] - sumList[0] / 3).toFixed(2);
    }

    tr.appendChild(tdDiff);

    // ------------------
    // for Next
    // ------------------

    const tdNext = document.createElement("td");

    if (rowIndex === 0) {
      tdNext.textContent = nextBorder;
    } else {
      tdNext.textContent = (sumList[rowIndex] - nextBorder / 3).toFixed(2);
    }

    tr.appendChild(tdNext);

    tbody2.appendChild(tr);
  });

  table2.appendChild(tbody2);

  // =========================================
  // 色設定
  // =========================================

  const rows2 = tbody2.children;

  rows2[1]?.classList.add("theme-classic");
  rows2[2]?.classList.add("theme-white");
  rows2[3]?.classList.add("theme-gold");

  // =========================================
  // 挿入
  // =========================================

  elementAnalyze.appendChild(table2);

  // =========================================
  // 統計表作成
  // =========================================
  // 最大列数
  //無限に要素分全部表示もできる
  //const maxLength = Math.max(...counts.map(arr => arr.length));
  const maxLength = 5;
  // 共通横幅
  const cellWidth = `calc(100% / ${maxLength + 1})`;
  const labelWidth = `calc(100% / ${maxLength + 1})`;

  const table = document.createElement("table");

  table.classList.add("table-ui", "new_table-ui","table1");

  // 最大列数
  //無限に要素分全部表示もできる
  //const maxLength = Math.max(...counts.map(arr => arr.length));
  // =========================================
  // thead
  // =========================================
  const thead = document.createElement("thead");

  const headTr = document.createElement("tr");

  // 左上
  const emptyTh = document.createElement("th");

  emptyTh.textContent = "レート順位";

  emptyTh.style.minWidth = labelWidth;

  emptyTh.style.whiteSpace = "nowrap";

  headTr.appendChild(emptyTh);

  // 1,2,3...
  for (let i = 0; i < maxLength; i++) {
    const th = document.createElement("th");

    th.textContent = i + 1;

    th.style.minWidth = cellWidth;

    th.style.whiteSpace = "nowrap";

    headTr.appendChild(th);
  }

  thead.appendChild(headTr);

  table.appendChild(thead);

  // =========================================
  // tbody
  // =========================================
  const tbody = document.createElement("tbody");
  const themeList = ["theme-classic", "theme-white", "theme-gold"];

  counts.forEach((list, rowIndex) => {
    const tr = document.createElement("tr");

    // 行名
    const labelTd = document.createElement("td");

    labelTd.textContent = categoryList[rowIndex];

    labelTd.style.minWidth = labelWidth;

    labelTd.style.whiteSpace = "nowrap";

    tr.appendChild(labelTd);

    // 各データ
    for (let i = 0; i < maxLength; i++) {
      const td = document.createElement("td");

      td.style.minWidth = cellWidth;

      td.style.whiteSpace = "nowrap";

      if (list[i]) {
        td.textContent = `${list[i][0]}x ${list[i][1]}`;
      } else {
        td.textContent = "";
      }

      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  //色変え
  const rows = tbody.children;

  rows[1].classList.add("theme-classic");
  rows[2].classList.add("theme-white");
  rows[3].classList.add("theme-gold");
  // elementAnalyze,new_analyze に追加
  elementAnalyze.appendChild(table);
  // =========================================
  // カテゴリーごとのレート
  // =========================================
  document.querySelectorAll(".skill-category-info").forEach((skillInfo) => {
    const text = skillInfo.textContent;

    const match = text.match(/(\d+)\s*\((\d+)\s*\/\s*\d+\)/);

    if (match) {
      const skillSum = parseFloat(match[1]);

      const skillCount = parseFloat(match[2]);

      const skillAve = (skillSum / skillCount).toFixed(2);

      skillInfo.textContent = "合計:" + skillSum + ",平均:" + skillAve;
    }
  });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document
        .querySelectorAll(".new_table-ui th, .new_table-ui td")
        .forEach(fitCell);
    });
  });
  // html2canvas 読み込み後に実行
  // 新しいdiv作成

  loadHtml2Canvas(() => {
    convertDivToImage(".main-ui", "#ddr_main");
  });
};
