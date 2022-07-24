let playlistCount = 0;
let playlistNum = 0;
let takenPlaylistNums = [];

// TODO: Save data to songs.json before closing the application

const initialize = () => {
    const PS = new PerfectScrollbar(".playlist-container", {
        wheelSpeed: 1,
        wheelPropagation: true
    });

    const playlists =  Object.keys(data.playlists)
    for(const playlist of playlists) {
        createPlaylist(playlist);
        playlistNum++;
        playlistCount++;
    }
    $('.create-playlist').click(() => {
        createPlaylist();
    });

}

// TODO: Utilize local storage instead. This is a sucky way of doing it!!!
const saveDataToJson = () => {
    let href = `data:application/json,${encodeURIComponent(JSON.stringify(data))}`;
    let a = $(`<a href=${href} download="songs.js"/>`);
    $(".container").append(a);
    a[0].click();
    a.remove();
}

const addPlaylistEvents = (playlistId) => {
    const playlist = $(`#playlist-${playlistId}`);
    const playlistName = $(`#playlist-${playlistId} .playlist-name`);
    const playlistActions = $(`#playlist-${playlistId} .playlist-actions`);
    const playlistEdit = $(`#playlist-${playlistId} .edit`); 
    const playlistDelete = $(`#playlist-${playlistId} .delete`);
    
    playlist.mouseenter(function() {
        playlistActions.animate({
            width: "100px" 
        }, 300);
        playlistEdit.css({visibility: 'visible'});
        playlistDelete.css({visibility: 'visible'});
    })
    .mouseleave(function() {
        playlistName.animate({
            width: "calc(300px - 1rem)" 
        }, 100);
        playlistActions.animate({
            width: "0px" 
        }, 100);
        playlistEdit.css({visibility: 'hidden'});
        playlistDelete.css({visibility: 'hidden'});
    });

    playlistEdit.click(() => {
        
        editPlaylist(playlistId);
    });

    playlistDelete.click(() => {
        deletePlaylist(playlistId);
    });

}

const createPlaylist = (playlistName) => {
    const playlists =  Object.keys(data.playlists);
    
    if(!playlistName){ 
        while(playlists.includes(`Playlist #${playlistNum}`)) playlistNum++;
        playlistName = `Playlist #${playlistNum}`;
    }
    
    // console.log(playlistNum);
    // console.log(playlistName);

    $(".playlist-container").append(`
            <div class="playlist" id="playlist-${playlistNum}">
                    <div class="playlist-name">${playlistName}</div>
                    <div class="playlist-actions"> 
                        <div class="edit material-symbols-outlined">edit</div>
                        <div class="delete material-symbols-outlined">delete</div>
                    </div>
                </div>
    `);
    data.playlists[playlistName] = {
        description: data.playlists[playlistName].description ? data.playlists[playlistName].description : '',
        songs: data.playlists[playlistName].songs ? data.playlists[playlistName].songs : []
    };
    // Add events to new playlist
    addPlaylistEvents(playlistNum);
}

const editPlaylist = (playlistId) => {
    const playlist =  $(`#playlist-${playlistId} .playlist-name`);
    const playlistName = playlist.text();
    console.log(playlistName);
    console.log(typeof(data.playlists));
    console.log(data.playlists["Shubh 1"]);

    const editPlaylistModal = $(`<div class="modal-parent">
        <div class="modal playlist-edit">
            <div class="modal-header">
                <div class="modal-title">Edit Playlist</div>
                <div class="modal-close material-symbols-outlined">close</div> 
            </div>
            <div class="modal-content">
                <div class="image">
                    <img src=""/>
                </div>
                <div class="modal-details">
                    <div class="modal-playlist-name">
                        <input value="${playlistName}" />
                    </div>
                    <div class="modal-playlist-desc">
                        <textarea maxlength="200" placeholder="Optional Description">${data.playlists[playlistName]['description']}</textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="modal-error"> </div>
                <div class="button save-button">Save</div>
            </div>
        </div>
    </div>`);
    $('.container').append(editPlaylistModal);
    
    new PerfectScrollbar("textarea", {wheelSpeed: 1, wheelPropagation: true});
    
    $('.modal-close').click(() => $('.modal-parent').remove());
    
    $('.save-button').click(() => {
        console.log("Inside save");
        const newPlaylistName = $('.modal-playlist-name input').val();
        const newPlaylistDesc = $('.modal-playlist-desc textarea').val();
        const playlists = Object.keys(data.playlists);
        $('.modal-error').text("");
        if(newPlaylistName !== '' && !playlists.includes(newPlaylistName)) {
            console.log(data.playlists[playlistName]);
            const playlistSongs = [...data.playlists[playlistName]['songs']];
            delete data.playlists[playlistName];
            data.playlists[newPlaylistName] = {
                description: newPlaylistDesc,
                songs: playlistSongs
            }
            playlist.text(newPlaylistName);
            saveDataToJson(); 
            $('.modal-parent').remove();
        } else {
            $('.modal-error').text("Invalid Playlist name.");
            console.log("error??")
        }
    });
    
}

// TODO: Implement Delete Playlist
const deletePlaylist = (playlistId) => {
    console.log("Deleting " + playlistId);
    console.log(data);
}

initialize();

