var djMusic = new Audio("ochiba.mp3");
const btnPlay  = document.querySelector("#btn-play");   // <button>
const btnMute = document.querySelector("#btn-mute");
let songName = document.getElementById("SongName");
const record = document.getElementById("record")
const turnTable = document.getElementById("TurnTable")
var playSpeed;




//これは「再生ボタン」に切り替えるやつ
function playBtn() {
  btnPlay.innerHTML = '<i id="djPlay" class="fas fa-play"></i>';  // 「再生ボタン」に切り替え
  djMusic.pause();
  songName.classList.remove("marquee-inner");
  console.log(record.value)
}

//これは「一時停止ボタン」に切り替えるやつ
function pauseBtn() {
  btnPlay.innerHTML = '<i id="djPlay" class="fas fa-pause"></i>';  // 「一時停止ボタン」に切り替え
  djMusic.play();
  songName.classList.add("marquee-inner");
  console.log(record.value)
}

//これは「ミュートボタン」に切り替えるやつ
function muteBtn(){
  btnMute.innerHTML = '<i id="djMute" class="fas fa-volume-mute"></i>';
  djMusic.volume = 0;
  songName.style.color = "#e3e3e3";
}

//これは「ミュートじゃないボタン」に切り替えるやつ
function unmuteBtn(){
  btnMute.innerHTML = '<i id="djMute" class="fas fa-volume-up"></i>';
  djMusic.volume = 1;
  songName.style.color = "#F27200";
}

btnMute.addEventListener("click", ()=>{
  if( ! djMusic.volume == 0 ){
    muteBtn();
  }else{
    unmuteBtn();
  }
});

btnPlay.addEventListener("click", ()=>{
  // pausedがtrue=>停止, false=>再生中
  if( ! djMusic.paused ){
    playBtn();
  }
  else{
    pauseBtn();
  }
});

/**
 * [event] 再生終了時に実行
 */
  djMusic.addEventListener("ended", ()=>{
    btnPlay.innerHTML = '<i id="djPlay" class="fas fa-play"></i>';  // 「再生ボタン」に変更
    djMusic.currentTime = 0;  // 再生位置を先頭に移動
    songName.classList.remove("marquee-inner");
  }
);
if(djMusic.paused) {
  playBtn()
}

//キーボードでミュートいじる
document.addEventListener('keypress', keypress_mute);
function keypress_mute(e) {

	if(e.code === 'KeyM'){
    muteBtn();
  }
  //いずれかのキーが押された時の処理
  return false;
}
document.addEventListener('keyup', keyup_unmute);
function keyup_unmute(e) {

	if(e.code === 'KeyM'){
    unmuteBtn();
  }
  //いずれかのキーが押された時の処理
  return false;
}

//キーボードで一時停止いじる
document.addEventListener('keypress', keypress_pause);
function keypress_pause(e) {

	if(e.code === 'KeyL'){
    if( ! djMusic.paused ){
      playBtn();
    }
    else{
      pauseBtn();
    }
  }
  //いずれかのキーが押された時の処理
  return false;
}

//キーボードで一時停止(押してる間だけ)
document.addEventListener('keypress', keypress_pauseK);
function keypress_pauseK(e) {

	if(e.code === 'KeyK'){
    playBtn();
  }
  //いずれかのキーが押された時の処理
  return false;
}
document.addEventListener('keyup', keypress_playK);
function keypress_playK(e) {

	if(e.code === 'KeyK'){
    pauseBtn();
  }
  //いずれかのキーが押された時の処理
  return false;
}

//ターンテーブルで再生速度変更
function turnTableChange(){
  djMusic.playbackRate = record.value;
  console.log(record.value)
};
turnTable.onmousedown = function(){
  playSpeed = setInterval(turnTableChange, 100);
};
turnTable.onmouseup = function(){
  playSpeed = clearInterval(playSpeed);
  console.log("はなさった")
};
turnTable.onmouseleave = function() {
  playSpeed = clearInterval(playSpeed);
  console.log("はなさった")
}

//これは入れた音を適用するやつ
var soundFile = document.getElementById('soundInput');
soundFile.addEventListener("change", function(event) {
  
  djMusic.pause();
  btnPlay.innerHTML = '<i id="djPlay" class="fas fa-play"></i>';  // 「再生ボタン」に変更
  songName.classList.remove("marquee-inner");

  djMusic = new Audio(URL.createObjectURL(soundFile.files[0]));

  var fileList = document.getElementById("soundInput").files;
  var list = "";
  for(var i=0; i<fileList.length; i++){
    list += fileList[i].name + "<br>";
  }
  songName.innerHTML = "Now Playing...  " + list;
  

},false);