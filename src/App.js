import "./App.css";
import Quagga from "quagga";
import React from "react";

const btn = document.getElementById("btn");
const modal = document.getElementById("modal");

btn.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  Quagga.init(
    {
      inputStream: {
        type: "LiveStream",
        constraints: {
          width: window.innerWidth,
        },
      },
      decoder: {
        readers: [
          {
            format: "ean_reader",
            config: {},
          },
        ],
      },
    },
    (err) => {
      if (!err) {
        Quagga.start();
      } else {
        modal.style.display = "none";
        document.body.style.overflow = "";
        Quagga.stop();
        alert(
          "この機能を利用するには\nブラウザのカメラ利用を許可してください。"
        );
      }
    }
  );
});

Quagga.onDetected((result) => {
  const code = result.codeResult.code;
  document.getElementById("code").value = code;
  modal.style.display = "none";
  document.body.style.overflow = "";
  Quagga.stop();
});

function App() {
  return (
    <div className="App">
      <h1>バーコード読み込みサンプル</h1>
      <input id="code" type="text"></input>
      <button id="btn">カメラでバーコードを読み込む</button>
      <div id="modal" class="modal">
        <div id="interactive" class="viewport"></div>
        <p class="text">カメラにバーコードを写してください。</p>
      </div>
    </div>
  );
}

export default App;
