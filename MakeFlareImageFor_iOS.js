window.MakeFlareImage = function () {
  var style = document.createElement("style");
  style.innerHTML =
    "#ddr_right #data_tbl td:nth-child(1) { width: 58px !important; }";
  document.head.appendChild(style);
  document.querySelectorAll(".data").forEach((aSong) => {
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
    aSong.children[2].textContent = "Lv:" + aSong.children[2].textContent;
    aSong.children[2].style = "text-align:center";
    aSong.children[3].style = "text-align:center";
    aSong.children[4].style = "text-align:center";
    aSong.children[4].textContent = "FS:" + aSong.children[4].textContent;
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
  document.querySelector(".main").style = "width:1400px;";
  let loader = document.createElement("div");
  loader.id = "loader";
  loader.innerHTML = '<div class="spinner"></div> Loading...';
  loader.style.position = "fixed";
  loader.style.top = "50%";
  loader.style.left = "50%";
  loader.style.transform = "translate(-50%, -50%)";
  loader.style.fontSize = "20px";
  document.body.appendChild(loader);
  let script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
  script.onload = () => {
    html2canvas(document.querySelector(".main")).then((canvas) => {
      topElement = document.querySelector("#top");
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
  };
  document.body.appendChild(script);
};
