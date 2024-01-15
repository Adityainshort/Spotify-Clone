console.log("Lets write javascript")
let playsong = document.querySelector('#playsong')
var prevsong = document.querySelector('#prevsong')
var nextsong = document.querySelector('#nextsong')
let songstracksrc = []
let currFolder ;





main("my")
let currtracksrc ;
var cuurentaudiotrack = new Audio();



async function getsongs(folder) {
    currFolder = folder
    let a = await fetch(`./songs/${folder}`)
    let promise = await a.text();
    // console.log(promise)

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
    return songs
}


async function main(axxxa) {
    
    let a = await getsongs(axxxa);
    let songs = document.querySelector(".songs")
    for (let song of a) {
        // console.log(song)
        song = song.split(`/songs/${currFolder}/`)[1];
        song = song.split(".mp3")[0];
        song = song.replace(/%20/g, " ");

        let [songname, artistName] = song.split(/\s+-\s+/);
        console.log(songname, artistName);

        let fullSongPath = `/songs/${currFolder}/` + songname + " - " + artistName + ".mp3";
        songstracksrc.push(fullSongPath);

        songs.innerHTML += `<div class="card">
                        <img class="invert" src="img/song.svg" alt="">
                        <span>
                            <div class="songname">${song.split("-")[0]}</div>
                            <div class="artistname">${song.split("-")[1]}</div>
                        </span>
                        <img class="invert" src="img/play.svg" alt="">
                    </div>`

    }
    currtracksrc = songstracksrc[0]
    cuurentaudiotrack.src=songstracksrc[0];



    var cardcontainer = document.querySelectorAll('.card');

    for (const card of cardcontainer) {
        card.addEventListener("click", element => {
            var spanElement = card.querySelector('span');

            var songNameElement = spanElement.querySelector('.songname');
            var artistNameElement = spanElement.querySelector('.artistname');

            var songName = songNameElement.textContent.trim();
            var artistName = artistNameElement.textContent.trim();
            currtracksrc = `/songs/${currFolder}/` + songName + " - " + artistName + ".mp3";
            // console.log(currtracksrc)
            document.querySelector('.songinfoname').innerHTML = songName;
            playsongs(currtracksrc);
            
        })
        
    }
    
    
    
    /// event on play pause next previous
    
    playsong.addEventListener("click", () => {
        if (cuurentaudiotrack.paused) {
            // cuurentaudiotrack.src=currtracksrc;
            cuurentaudiotrack.play();
            changsongname(currtracksrc);
            playsong.src = "img/pause.svg"
            console.log("song played")
        }
        else {
            cuurentaudiotrack.pause();
            console.log("song paused")
            playsong.src = "img/play.svg"
        }
    })

    nextsong.addEventListener("click", () => {
        let curentindex = songstracksrc.indexOf(currtracksrc);
        console.log(curentindex +"  " +songstracksrc.length)
        
        
        if (curentindex<songstracksrc.length-1) {
            curentindex++;
            currtracksrc = songstracksrc[curentindex]
            playsongs(currtracksrc)
            changsongname(currtracksrc)
        }
        else{
            curentindex=0;
            currtracksrc = songstracksrc[curentindex]
            playsongs(currtracksrc)
            changsongname(currtracksrc)
        }
    })
    prevsong.addEventListener("click", () => {
        let curentindex = songstracksrc.indexOf(currtracksrc);
        console.log(curentindex +"  " +songstracksrc.length)

        if (curentindex>0) {
            curentindex--;
            currtracksrc = songstracksrc[curentindex]
            playsongs(currtracksrc)
            changsongname(currtracksrc)
        }
        else{
            curentindex=songstracksrc.length-1;
            currtracksrc = songstracksrc[curentindex]
            playsongs(currtracksrc)
            changsongname(currtracksrc)
        }

    })
};
const playsongs = (currtracksrc) => {
    
    cuurentaudiotrack.src = currtracksrc;
    cuurentaudiotrack.play();
    playsong.src = "img/pause.svg"
}


cuurentaudiotrack.addEventListener("timeupdate", () => {
    if (cuurentaudiotrack.currentTime == cuurentaudiotrack.duration) {
        let curentindex = songstracksrc.indexOf(currtracksrc);
        console.log(curentindex +"  " +songstracksrc.length)
        
        
        if (curentindex<songstracksrc.length-1) {
            curentindex++;
            currtracksrc = songstracksrc[curentindex]
            playsongs(currtracksrc)
            changsongname(currtracksrc)
        }
        else{
            curentindex=0;
            currtracksrc = songstracksrc[curentindex]
            playsongs(currtracksrc)
            changsongname(currtracksrc)
        }
        
    }


    document.querySelector('.volumecontroller').innerHTML =
    formatTime(cuurentaudiotrack.currentTime) + " / " + formatTime(cuurentaudiotrack.duration);
    let percent = cuurentaudiotrack.currentTime / cuurentaudiotrack.duration * 100;
    console.log(percent)

    document.querySelector('#runningseekbar').style.width = percent + '%';
    document.querySelector('.circle').style.left = percent+'%' ;

});

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
}


document.querySelector(".seekbar").addEventListener("click", e => {

    console.log(e.offsetX + "  width -->" + e.currentTarget.getBoundingClientRect().width);
    const boundingRect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - boundingRect.left;
    const percent = (offsetX / boundingRect.width) * 100;
    cuurentaudiotrack.currentTime = ((cuurentaudiotrack.duration) * percent) / 100

})


document.querySelector('.hamburger').addEventListener("click", () => {
    let rightvala = document.querySelector('.right');
    rightvala.style.display = "block";
    rightvala.style.position = "absolute";
})
document.querySelector('.closebutton').addEventListener("click",()=>{
    document.querySelector('.right').style.display = "none";
})


function changsongname(src) {
    let song = currtracksrc
    song = song.split(`/songs/${currFolder}/`)[1];
    song = song.split(".mp3")[0];
    song = song.replace(/%20/g, " ");
    document.querySelector('.songinfoname').innerHTML = song.split("-")[0];
}





// document.querySelector('.card').addEventListener("click", ()=>{
//         console.log("working")
//         if(songchange=="my"){
//             songchange="yours"
//             main("yours")
//         }else{
//             songchange="my";
//             main("my")
//         }
//  });