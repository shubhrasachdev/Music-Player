let playlistCount = 0;

const initialize = () => {
    const playlists =  Object.keys(data.playlists)
    for(const playlist of playlists) createPlaylist(playlist);
    $('.create-playlist-container').click(() => {
        // TODO: Add created playlists to data
        createPlaylist();
    });

}

const addPlaylistEvents = (id) => {
    const playlist = $(`#playlist-${id}`);
    const playlistName = $(`#playlist-${id} .playlist-name`);
    const playlistActions = $(`#playlist-${id} .playlist-actions`);
    const playlistEdit = $(`#playlist-${id} .edit`);
    const playlistDelete = $(`#playlist-${id} .delete`);
    
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
        }, 300);
        playlistActions.animate({
            width: "0px" 
        }, 300);
        playlistEdit.css({visibility: 'hidden'});
        playlistDelete.css({visibility: 'hidden'});
    });
}

// TODO: add playlist number concept
const createPlaylist = (playlistName) => {
    playlistCount++;
    if(!playlistName) playlistName = `Playlist #${playlistCount}`;
    $(".playlist-container").append(`
            <div class="playlist" id="playlist-${playlistCount}">
                    <div class="playlist-name">${playlistName}</div>
                    <div class="playlist-actions"> 
                        <div class="edit material-symbols-outlined">edit</div>
                        <div class="delete material-symbols-outlined">delete</div>
                    </div>
                </div>
    `);

    // Add events to new playlist
    addPlaylistEvents(playlistCount);
}

initialize();