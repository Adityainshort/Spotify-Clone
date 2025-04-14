console.log("Lets write javascript");
let playsong = document.querySelector('#playsong');
var prevsong = document.querySelector('#prevsong');
var nextsong = document.querySelector('#nextsong');

let songstracksrc = [
    "/songs/Ami Je Tomar - Arjit Singh.mp3",
    "/songs/Arjan Vailly - Bhupeinder Babbal.mp3",
    "/songs/Hua Main - Raghav Chaitanya.mp3",
    "/songs/Husn - Anuv Jain.mp3",
    "/songs/Mere Dholna - Shreya Ghoshal.mp3",
    "/songs/Papa Meri Jaan - Sonu Niagam.mp3",
    "/songs/Saari Duniya Jalaa Denge - B Praak.mp3"
];

let currtracksrc;
var cuurentaudiotrack = new Audio();
main();

async function main() {
    let songs = document.querySelector(".songs");

    for (let fullPath of songstracksrc) {
        let filename = fullPath.split("/songs/")[1];
        let decodedName = decodeURIComponent(filename).replace(".mp3", "");
        let [songname, artistName] = decodedName.split(/\s+-\s+/);

        songs.innerHTML += `<div class="card">
            <img class="invert" src="img/song.svg" alt="">
            <span>
                <div class="songname">${songname}</div>
                <div class="artistname">${artistName}</div>
            </span>
            <img class="invert" src="img/play.svg" alt="">
        </div>`;
    }

    currtracksrc = songstracksrc[0];
    cuurentaudiotrack.src = songstracksrc[0];

    var cardcontainer = document.querySelectorAll('.card');

    for (const card of cardcontainer) {
        card.addEventListener("click", () => {
            var spanElement = card.querySelector('span');
            var songName = spanElement.querySelector('.songname').textContent.trim();
            var artistName = spanElement.querySelector('.artistname').textContent.trim();
            currtracksrc = `/songs/${songName} - ${artistName}.mp3`;
            document.querySelector('.songinfoname').innerHTML = songName;
            playsongs(currtracksrc);
        });
    }

    playsong.addEventListener("click", () => {
        if (cuurentaudiotrack.paused) {
            cuurentaudiotrack.play();
            changsongname(currtracksrc);
            playsong.src = "img/pause.svg";
            console.log("song played");
        } else {
            cuurentaudiotrack.pause();
            console.log("song paused");
            playsong.src = "img/play.svg";
        }
    });

    nextsong.addEventListener("click", () => {
        let curentindex = songstracksrc.indexOf(currtracksrc);
        curentindex = (curentindex + 1) % songstracksrc.length;
        currtracksrc = songstracksrc[curentindex];
        playsongs(currtracksrc);
        changsongname(currtracksrc);
    });

    prevsong.addEventListener("click", () => {
        let curentindex = songstracksrc.indexOf(currtracksrc);
        curentindex = (curentindex - 1 + songstracksrc.length) % songstracksrc.length;
        currtracksrc = songstracksrc[curentindex];
        playsongs(currtracksrc);
        changsongname(currtracksrc);
    });
}

const playsongs = (currtracksrc) => {
    cuurentaudiotrack.src = currtracksrc;
    cuurentaudiotrack.play();
    playsong.src = "img/pause.svg";
};

cuurentaudiotrack.addEventListener("timeupdate", () => {
    if (cuurentaudiotrack.currentTime == cuurentaudiotrack.duration) {
        let curentindex = songstracksrc.indexOf(currtracksrc);
        curentindex = (curentindex + 1) % songstracksrc.length;
        currtracksrc = songstracksrc[curentindex];
        playsongs(currtracksrc);
        changsongname(currtracksrc);
    }

    document.querySelector('.volumecontroller').innerHTML =
        formatTime(cuurentaudiotrack.currentTime) + " / " + formatTime(cuurentaudiotrack.duration);
    let percent = cuurentaudiotrack.currentTime / cuurentaudiotrack.duration * 100;
    document.querySelector('#runningseekbar').style.width = percent + '%';
    document.querySelector('.circle').style.left = percent + '%';
});

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

document.querySelector(".seekbar").addEventListener("click", e => {
    const boundingRect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - boundingRect.left;
    const percent = (offsetX / boundingRect.width) * 100;
    cuurentaudiotrack.currentTime = ((cuurentaudiotrack.duration) * percent) / 100;
});

document.querySelector('.hamburger').addEventListener("click", () => {
    let rightvala = document.querySelector('.right');
    rightvala.style.display = "block";
    rightvala.style.position = "absolute";
});

document.querySelector('.closebutton').addEventListener("click", () => {
    document.querySelector('.right').style.display = "none";
});

function changsongname(src) {
    let song = currtracksrc.split(`/songs/`)[1].replace(".mp3", "").replace(/%20/g, " ");
    document.querySelector('.songinfoname').innerHTML = song.split(" - ")[0];
}
