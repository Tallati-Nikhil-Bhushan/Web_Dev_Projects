console.log("Welcome to spotify")

let songIndex=1;
let audioElement = new Audio("./songs/1.mp3");
let masterPlay = document.querySelector("#masterPlay");
let myProgressBar = document.querySelector("#myProgressBar");
let gif = document.querySelector("#gif");
let songItem = Array.from(document.querySelectorAll(".songItem"));

let songs = [
    {songName:"warriyo",filePath:"./songs/1.mp3",coverPath:"./covers/1.jpg"},
    {songName:"Thin Duyen Dau",filePath:"./songs/2.mp3",coverPath:"./covers/2.jpg"},
    {songName:"invincible",filePath:"./songs/3.mp3",coverPath:"./covers/3.jpg"},
    {songName:"Here We Go",filePath:"./songs/4.mp3",coverPath:"./covers/4.jpg"},
    {songName:"Heros Tonight",filePath:"./songs/5.mp3",coverPath:"./covers/5.jpg"}
 ]

//audioElement.play();

songItem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime <= 0)
    {
        audioElement.play();
        masterPlay.className = "fa-solid fa-3x fa-circle-pause";
        gif.style.opacity="1";
    }
    else
    {
        audioElement.pause();
        masterPlay.className = "fa-solid fa-3x fa-circle-play";
        gif.style.opacity = "0";
    }
})
//Listen to events

audioElement.addEventListener('timeupdate',()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change",()=>{

    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

function makeAllPause()
{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>
    {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeAllPause();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `./songs/${songIndex}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity="1";
        masterPlay.className = "fa-solid fa-3x fa-circle-pause";
        document.getElementById("songInfoName").innerText = songs[songIndex-1].songName;
    })
})

document.getElementById('next').addEventListener("click",()=>{
    if(songIndex == 5)
    {
        songIndex=1;
    }
    else
    {
        songIndex++;
    }

    audioElement.src = `./songs/${songIndex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity="1";
    masterPlay.className = "fa-solid fa-3x fa-circle-pause";
    document.getElementById("songInfoName").innerText = songs[songIndex-1].songName;
})


document.getElementById('previous').addEventListener("click",()=>{
    if(songIndex == 1)
    {
        songIndex=1;
    }
    else
    {
        songIndex--;
    }

    audioElement.src = `./songs/${songIndex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity="1";
    masterPlay.className = "fa-solid fa-3x fa-circle-pause";
    document.getElementById("songInfoName").innerText = songs[songIndex-1].songName;
})