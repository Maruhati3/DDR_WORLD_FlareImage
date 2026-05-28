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
          link.download = `${Str_targetid}.png`;

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

      el.dataset.originalFontSize =
        window.getComputedStyle(el).fontSize;
    }

    const original =
      parseFloat(el.dataset.originalFontSize);

    let size = original;

    const minSize = 8;

    // 元サイズへ戻す
    el.style.fontSize =
      el.dataset.originalFontSize;

    const lineHeight =
      parseFloat(
        window.getComputedStyle(el).lineHeight
      );

    // 2行まで許容
    const maxHeight = lineHeight * 2;

    // 3行目に入る間だけ縮小
    while (
      el.scrollHeight > maxHeight &&
      size > minSize
    ) {

      size -= 0.5;

      el.style.fontSize = size + 'px';
    }
  }
  function applyMusicFit() {

    document.querySelectorAll('.new_music-name')
      .forEach(fitTextTwoLines);
  }

  // ===== main ===============================================================
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
  elementsOfSongs.forEach(data => {

  const widths = ['70%', '8%', '14%', '8%'];

  [...data.children].forEach((cell, i) => {

    cell.style.width = widths[i];

    cell.style.maxWidth = widths[i];

    cell.style.boxSizing = 'border-box';

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
    [th1, th2, th3, th4].forEach(th => {

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
  document.querySelectorAll('.music-name').forEach((musicname) => {
    musicname.classList.remove("music-name");
    musicname.classList.add("new_music-name");
    fitTextTwoLines(musicname);
  });
  applyMusicFit();
  window.addEventListener(
    'resize',
    applyMusicFit
  );
  //上画面の調整
  const elementFlareLank=document.querySelector('.total-flare-skill');
  elementFlareLank.style="width:20%;";
  // 新しいdiv作成
  const elementAnalyze = document.createElement('div');
  elementAnalyze.classList.add("new_analyze")
  // 直前に挿入
  elementFlareLank.parentNode.insertBefore(elementAnalyze, elementFlareLank);  
  elementAnalyze.appendChild(elementFlareLank);
  
  // html2canvas 読み込み後に実行
  loadHtml2Canvas(() => {
    convertDivToImage(".main-ui", "#ddr_main");
  });
};
