let count = 0;   // for taking the count of click

$('#note').click(function(){
    if(count == 0){
        $('#add-form').prepend($(`<input name="title" type="text" id="title" placeholder="Title" required>
                         <input name="tag" type="text" id="tag" placeholder="Tag" required>
                        `));
        $('#add-form').append($(`<div id="add"><button id="add-btn">Add</button></div>`));
    }
    count++;
});

$(' .edit').click(function(){
    $('#title, #tag, #add').remove();
    count = 0;
    let clickedNote = $(this);
    let divId = $(clickedNote).attr('id');
    let clickedNoteDiv = $(`#${divId}`);
    // for disable the html page when the pop up is enabled
    $('body').append('<div id="over" style="position: absolute;top:0;left:0;width: 100%;height:100%;z-index:2;opacity:0.7;filter: alpha(opacity = 50)"></div>');
    $('#update-form').attr('action', `/update-note/${divId}`);
    $('#updateTitle').val($(clickedNoteDiv).find(' .note-title').text());
    $('#updateTag').val($(clickedNoteDiv).find(' .note-tag').text());
    $('#updateNote').val($(clickedNoteDiv).find(' .note-notes').text());
    $('#pop-up-container').css('display', 'block');
});

$('#pop-up-container img').click(function(){
    $('#pop-up-container').css('display', 'none');
    $('#over').remove();
});


// prev button
let prevBtn = $('#prev-link').attr('data-prev');
if(prevBtn == 'false'){
    $('#prev-link').css({
        'pointer-events' : 'none',
        'opacity': '0.2'
    });
}

// next button
let nextBtn = $('#next-link').attr('data-next');
if(nextBtn == 'false'){
    $('#next-link').css({
        'pointer-events' : 'none',
        'opacity': '0.2'
    });
}

// pinned notes
$(' .pinned').click(function(){
    let pinned = $(this);
    if(pinned.attr('id') == 'true'){
        pinned.css('color' ,'red');
    }
});

