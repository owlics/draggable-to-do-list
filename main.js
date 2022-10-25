let $dropzones = $('.dropzone');
let $dropzoneUL = $('.dropzone ul');
let $showDiv = $('.showDiv');
$showDiv.hide();

// set drag effects

$('ul').delegate('li', 'dragstart', (event) => {
    $(this).css('opacity', 0.4);
    event.originalEvent.dataTransfer.effectAllowed = 'move';
    event.originalEvent.dataTransfer.setData('text/plain', event.target.id);
});

$('ul').delegate('li', 'dragend', function (event) {
    $(this).css('opacity', 1);
});


// set dropzone
function dragenter(event) {
    event.preventDefault();
    $(this).find('.showDiv').show();
    $(this).find('.card').addClass('over');
    
}

$dropzones.on('dragenter', dragenter);

function dragover(event) {
    if (event.preventDefault) {
        event.preventDefault(); 
    }
    event.originalEvent.dataTransfer.dropEffect = 'move'; 
}

$dropzones.bind('dragover', dragover);

function dragleave(event) {
    $(this).find('.showDiv').hide();
    $(this).find('.card').removeClass('over');
    
};

$dropzones.bind('dragleave', dragleave);

function drop(event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).find('.showDiv').hide();
    const data = event.originalEvent.dataTransfer.getData('text/plain');
    event.target.querySelector('ul').appendChild(document.querySelector('#' + data));
    
};

$dropzones.bind('drop', drop);


// set add function

$('#addNewModal').submit((e) => {
    e.preventDefault();
    const time = new Date().getTime();
    const cardTitle = $('#titleInput').val();
    const newCard = `<li id="drag${time}" class="list-group-item" draggable="true">
    <span>${cardTitle}</span>
    </li>`;
    $('#toDoList').append(newCard);

    $('#addNewModal').modal('hide');
    $("#workForm").trigger('reset');
});