console.log("Lets write javascript")
var cuurentaudiotrack = new Audio("http://127.0.0.1:3000/songs/Ami%20Je%20Tomar%20-%20Arjit%20Singh.mp3");
let playsong = document.querySelector('#playsong')
var prevsong = document.querySelector('#prevsong')
var nextsong = document.querySelector('#nextsong')


async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs")
    let promise = await a.text();
    console.log(promise)

    let div = document.createElement("div");
    div.innerHTML = promise;
    let as = div.getElementsByTagName("a");
    let songs = []
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
        }

    }
    // console.log(songs)
    return songs
}


async function main() {
    let a = await getsongs();
    let songs = document.querySelector(".songs")
    for (let song of a) {
        song = song.split("/songs/")[1]
        song = song.replaceAll("%20", " ")
        song = song.split(".")[0]
        let artist = song.split("-")
        console.log(song)
        songs.innerHTML += `<div class="card">
                        <img class="invert" src="img/song.svg" alt="">
                        <span>
                            <div class="songname">${song.split("-")[0]}</div>
                            <div class="artistname">${song.split("-")[1]}</div>
                        </span>
                        <img class="invert" src="img/play.svg" alt="">
                    </div>`

    }


    var cardcontainer = document.querySelectorAll('.card');

    for (const card of cardcontainer) {
        card.addEventListener("click", element => {

            var spanElement = card.querySelector('span');


            var songNameElement = spanElement.querySelector('.songname');
            var artistNameElement = spanElement.querySelector('.artistname');

            var songName = songNameElement.textContent.trim();
            var artistName = artistNameElement.textContent.trim();
            let currtracksrc = songName + " - " + artistName;
            document.querySelector('.songinfoname').innerHTML=songName ;
            playsongs(currtracksrc);

        })

    }



    /// event on play pause next previous

    playsong.addEventListener("click",()=>{
        if (cuurentaudiotrack.paused) {
            cuurentaudiotrack.play();
            playsong.src = "img/pause.svg"
            console.log("song played")
        }
        else{
            cuurentaudiotrack.pause();
            console.log("song paused")
            playsong.src = "img/play.svg"
        }
    })
    nextsong.addEventListener("click",()=>{
        
    })
    prevsong.addEventListener("click",()=>{
        
    })

    

    
};
const playsongs = (currtracksrc) => {
    
    let src = "/songs/" + currtracksrc + ".mp3";

    cuurentaudiotrack.src = src;
    cuurentaudiotrack.play();
    playsong.src = "img/pause.svg"
}

main()

cuurentaudiotrack.addEventListener("timeupdate",()=>{

    document.querySelector('.volumecontroller').innerHTML = 
    formatTime(cuurentaudiotrack.currentTime) +" / " +formatTime(cuurentaudiotrack.duration);
    let percent = cuurentaudiotrack.currentTime/cuurentaudiotrack.duration*100;
    console.log(percent)

    document.querySelector('#runningseekbar').style.width=percent+'%';
    document.querySelector(".circle").style.left = 68*percent/100 +"vw";

});

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
}


document.querySelector(".seekbar").addEventListener("click", e => {
    
    console.log(e.offsetX + "  width -->"+ e.currentTarget.getBoundingClientRect().width);
    const boundingRect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - boundingRect.left;
    const percent = (offsetX / boundingRect.width) * 100;
    cuurentaudiotrack.currentTime = ((cuurentaudiotrack.duration) * percent) / 100
   
})


document.querySelector('.hamburger').addEventListener("click",()=>{
    let rightvala =document.querySelector('.right');
    rightvala.style.display="block";
    rightvala.style.position = "absolute";
    rightvala.style.zIndex = "1";
})



