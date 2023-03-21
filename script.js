let playlistCount = 0;
let playlistNum = 0;
let takenPlaylistNums = [];
let data = {};
const initialize = () => {
    const PS = new PerfectScrollbar(".playlist-container", {
        wheelSpeed: 1,
        wheelPropagation: true
    });

    if(localStorage.getItem('data') == null) localStorage.setItem('data', JSON.stringify(initData));
    else data = JSON.parse(localStorage.getItem('data'));

    const playlists =  Object.keys(data.playlists)
    for(const playlist of playlists) {
        createPlaylist(playlist);
        playlistNum++;
        playlistCount++;
    }
    $('.create-playlist').click(() => {
        createPlaylist();
        localStorage.setItem('data', JSON.stringify(data));
    });
    
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
    
    if(playlistName == undefined){ 
        while(playlists.includes(`Playlist #${playlistNum}`)) playlistNum++;
        playlistName = `Playlist #${playlistNum}`;
    }

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
        description: data.playlists[playlistName] && data.playlists[playlistName].description ? data.playlists[playlistName].description : '',
        songs: data.playlists[playlistName] && data.playlists[playlistName].songs ? data.playlists[playlistName].songs : []
    };
    // Add events to new playlist
    addPlaylistEvents(playlistNum);
}

// TODO: Add Album Art
const editPlaylist = (playlistId) => {
    const playlist =  $(`#playlist-${playlistId} .playlist-name`);
    const playlistName = playlist.text();

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
            playlist.text(newPlaylistName);
            data.playlists[newPlaylistName] = {
                description: newPlaylistDesc,
                songs: playlistSongs
            }
            localStorage.setItem('data', JSON.stringify(data));
            $('.modal-parent').remove();
        } else {
            $('.modal-error').text("Invalid Playlist name.");
            console.log("error??")
        }
    });
    
}

const deletePlaylist = (playlistId) => {
    const playlistName =  $(`#playlist-${playlistId} .playlist-name`).text();
    $(`#playlist-${playlistId}`).remove();
    delete data.playlists[playlistName];
    localStorage.setItem('data', JSON.stringify(data));
}

initialize();

