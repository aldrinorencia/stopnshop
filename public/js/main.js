// IIFE - immediately invoked function express
(function() {
    document.body.style.backgroundColor = "#ff6600";
    document.getElementById("movieTitle").style.fontFamily = "Impact";
    document.getElementById("movieTitle").style.fontSize = "1000%";
    var movieTitle = document.getElementById('movieTitle');
    movieTitle.textContent = 'UnionShop';

    

    var clearBtn = document.getElementById('clearBtn');
    clearBtn.addEventListener('click', function(e){
        var inputs = document.getElementsByClassName('form-control');
        for(var i = 0; i < inputs.length; i++){
            var elem = inputs[i];
            elem.value = '';
        }

    });
})();

function getDetails(id) { // eslint-disable-line
    $('#myForm').attr('action', '/shops_update/' + id);
    $.ajax({
        url: './shops/' + id,
        dataType: 'json',
        method: 'GET',
        success: function(data) {
            $('#title').val(data.title);
            $('#quantity').val(data.quantity);
            $('#price').val(data.price);
            $('#files').val(data.files);
            $('#imgproduct').val(data.imgproduct);
            $('#id').val(data.id);
        },
        error: function(data) {}
    });
}


function deleteTask(id) { // eslint-disable-line
    $('#myForm').attr('action', '/shops_delete/' + id);
    $('#submit').trigger('click');
}

function increaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
  }
  
  function decreaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('number').value = value;
  }

  
  $(document).ready( function() {
    $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
    
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#imgproduct').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#files").change(function(){
        readURL(this);
    }); 	
});