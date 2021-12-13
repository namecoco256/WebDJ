var djMusic = new Tone.Player("ochiba.mp3").toDestination();
const btnPlay  = document.querySelector("#btn-play");   // <button>
const btnMute = document.querySelector("#btn-mute");
let songName = document.getElementById("SongName");
const record = document.getElementById("record")
const turnTable = document.getElementById("TurnTable")
const inputElem = document.getElementById('djVolume'); // input要素
const currentValueElem = document.getElementById('current-value'); // 埋め込む先のspan要素
var playSpeed;


console.log(djMusic);

/** ここで円グラフを作る */

const TurnTableKnob = $(".dial").knob({
  /** 値が変わった時に発生するイベント */
  change: function (value) {
    controlMusicSpeed(value)
  }
}); 

//これは音を止めるやつ
async function pauseSound() {
  btnPlay.innerHTML = '<i id="djPlay" class="fas fa-play"></i>';  // 「再生ボタン」に切り替え
  await djMusic.stop();
  songName.classList.remove("marquee-inner");
  console.log(record.value)
	djMusic.playbackRate = 0;
}

//これは音を鳴らすやつ
async function playSound() { 
  btnPlay.innerHTML = '<i id="djPlay" class="fas fa-pause"></i>';  // 「一時停止ボタン」に切り替え
  await djMusic.start();
  songName.classList.add("marquee-inner");
  console.log(record.value);
  djMusic._loop = true;
  djMusic.playbackRate = record.value;
}

//これは「ミュートボタン」に切り替えるやつ
function muteSound(){
  btnMute.innerHTML = '<i id="djMute" class="fas fa-volume-mute"></i>';
  djMusic.volume.value = -Infinity;
  console.log(djMusic.volume);
  songName.style.color = "#e3e3e3";
}

//これは「ミュートじゃないボタン」に切り替えるやつ
function unmuteSound(){
  btnMute.innerHTML = '<i id="djMute" class="fas fa-volume-up"></i>';
  djMusic.volume.value = inputElem.value;
  console.log(djMusic.volume);
  songName.style.color = "#F27200";
}

//ミュートのボタンが押されたとき
btnMute.addEventListener("click", ()=>{
  if( djMusic.volume.value !== -Infinity ){ //音量が0じゃなかったら0に変更
    muteSound(); 
  }else{  //音量が0だったら音量を1に
    unmuteSound(); 
  }
});

btnPlay.addEventListener("click", ()=>{ //再生ボタンが押された場合
  // pausedがtrue=>停止, false=>再生中
  if( djMusic.state === "stopped" ){
    playSound();
	  djMusic.playbackRate = record.value;
  }
  else if(djMusic.state === 'started'){
    pauseSound();
  }
  console.log(djMusic.state)
});

/**
 * [event] 再生終了時に実行
 */
//   djMusic.addEventListener("ended", ()=>{
//       btnPlay.innerHTML = '<i id="djPlay" class="fas fa-play"></i>';  // 「再生ボタン」に変更
//       djMusic.currentTime = 0;  // 再生位置を先頭に移動
//       songName.classList.remove("marquee-inner");
//   }
// );
// if(djMusic.paused) {
//   pauseSound()
// }

//キーボードでミュートいじる
document.addEventListener('keypress', keypress_mute);
function keypress_mute(e) {

	if(e.code === 'KeyM'){
    muteSound();
  }
  //いずれかのキーが押された時の処理
  return false;
}
document.addEventListener('keyup', keyup_unmute);
function keyup_unmute(e) {

	if(e.code === 'KeyM'){
    unmuteSound();
  }
  //いずれかのキーが押された時の処理
  return false;
}

//キーボードで一時停止いじる
document.addEventListener('keypress', keypress_pause);
function keypress_pause(e) {

	if(e.code === 'KeyL'){
    if( djMusic.state === "stopped" ){
      playSound();
    }
    else if(djMusic.state === 'started'){
      pauseSound();
    }
  }
  //いずれかのキーが押された時の処理
  return false;
}

//キーボードで一時停止(押してる間だけ)
document.addEventListener('keypress', keypress_pauseK);
function keypress_pauseK(e) {

	if(e.code === 'KeyK'){
    btnPlay.innerHTML = '<i id="djPlay" class="fas fa-play"></i>';  // 「再生ボタン」に切り替え
    djMusic.playbackRate = 0; //レジューム再生させたいので、再生速度を0に
    songName.classList.remove("marquee-inner");
    console.log(record.value)
    if( djMusic.state === "stopped" ){
      playSound();
    }
  }
  //いずれかのキーが押された時の処理
  return false;
}
document.addEventListener('keyup', keypress_playK);
function keypress_playK(e) {

	if(e.code === 'KeyK'){
    btnPlay.innerHTML = '<i id="djPlay" class="fas fa-pause"></i>';  // 「一時停止ボタン」に切り替え
    djMusic.playbackRate = record.value;
    songName.classList.add("marquee-inner");
    console.log(record.value);
    djMusic._loop = true;
  }
  //いずれかのキーが押された時の処理
  return false;
}

function controlMusicSpeed(value) {
  console.log("speed:", value);
	if (value >= 0) {
		// speedが0以上なら順再生
		djMusic.reverse = false;
		djMusic.playbackRate = value;
	} else {
		// speedが0以下なら逆再生
		djMusic.reverse = true;
		djMusic.playbackRate = -value;
	}
}

//ターンテーブルで再生速度変更
turnTable.addEventListener("change", (e) => {
	console.log("speed:", e.target.value);

	if (e.target.value >= 0) {
		// speedが0以上なら順再生
		djMusic.reverse = false;
		djMusic.playbackRate = e.target.value;
	} else {
		// speedが0以下なら逆再生
		djMusic.reverse = true;
		djMusic.playbackRate = -e.target.value;
	}
});

// function turnTableChange(){
//   djMusic.playbackRate = record.value;
//   console.log(record.value)
// };
// turnTable.onmousedown = function(){
//   playSpeed = setInterval(turnTableChange, 100);
// };
// turnTable.onmouseup = function(){
//   playSpeed = clearInterval(playSpeed);
//   console.log("はなさった")
// };
// turnTable.onmouseleave = function() {
//   playSpeed = clearInterval(playSpeed);
//   console.log("はなさった")
// }

//Volumeのスライダー
// 現在の値をspanに埋め込む関数
const setCurrentValue = (val) => {
  currentValueElem.innerText = val;
}

// inputイベント時に発火する関数
const rangeOnChange = (e) =>{
  setCurrentValue(e.target.value);
  djMusic.volume.value = e.target.value;
}

window.onload = () => {
  inputElem.addEventListener('input', rangeOnChange); // スライダー変化時にイベントを発火
  setCurrentValue(inputElem.value); // ページ読み込み時に値をセット
}

//これは入れた音を適用するやつ
var soundFile = document.getElementById('soundInput');
soundFile.addEventListener("change", function(event) {
  
  pauseSound();
  
  djMusic = new Tone.Player(URL.createObjectURL(soundFile.files[0])).toDestination();
	
  var fileList = document.getElementById("soundInput").files;
  var list = "";
  for(var i=0; i<fileList.length; i++){
    list += fileList[i].name + "<br>";
  }
  songName.innerHTML = "Now Playing...  " + list;
  

},false);
