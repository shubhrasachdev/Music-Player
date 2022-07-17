let playlistCount = 0;
let playlistNum = 0;
let takenPlaylistNums = [];

const initialize = () => {
    const playlists =  Object.keys(data.playlists)
    for(const playlist of playlists) {
        createPlaylist(playlist);
        playlistNum++;
        playlistCount++;
    }
    $('.create-playlist-container').click(() => {
        createPlaylist();
    });

}
// TODO: Save changes to data in json before exiting the application

const addPlaylistEvents = (playlistId) => {
    const playlist = $(`#playlist-${playlistId}`);
    const playlistName = $(`#playlist-${playlistId} .playlist-name`);
    const playlistActions = $(`#playlist-${playlistId} .playlist-actions`);
    const playlistEdit = $(`#playlist-${playlistId} .edit`); // TODO: Implement Edit Playlist
    const playlistDelete = $(`#playlist-${playlistId} .delete`); // TODO: Implement Delete Playlist
    
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
    data.playlists[playlistName] = [];
    // Add events to new playlist
    addPlaylistEvents(playlistNum);
}

initialize();