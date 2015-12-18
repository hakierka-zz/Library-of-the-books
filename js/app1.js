/**
 * Created by Hakierka on 15.12.2015.
 */

$(document).ready(function(){

    var nameInput = $('#nameInput');
    var autorInput = $('#autorInput');
    var descInput = $('#descInput');
    var addButton = $('#addButton');
    var booklist = $('#booklist');


    var loadAllBooks = function() {
        $.ajax({
        url: "http://api.coderslab.pl/book",
        type: "GET",
        dataType: "json",
        success: function (json) {
            console.log("udało się");
            console.log(json);


            for (var i = 0; i < json.length; i++) {
                var newElement = $(
                    "<li data-id='"+ json[i].id +"'>"
                    + json[i].name

                    +"</li>"
                );
                var newButton=$("<button>Delete</button>");
                newElement.append(newButton);
                booklist.append(newElement);
                newButton.on("click", function(event){
                    var id = $(this).parent().data("id");
                    console.log("usuwam" + id);
                    $.ajax({
                        url: "http://api.coderslab.pl/book/" + id,
                        type: "DELETE",
                        dataType: "json",
                        success: function(json){
                            booklist.html("");
                            loadAllBooks();
                        }


                    });
                });
            }
        },
        error: function (xhr, status, errorThrown) {
            console.log("Error");
            console.log(xhr);
        },
        complete: function (xhr, status) {
            console.log("Zapytanie się skończyło");
            console.log(status);
        }
    });
};

    loadAllBooks();

    addButton.on('click', function(event){
        var bookName = nameInput.val();
        var autor = autorInput.val();
        var desc = descInput.val();

        if(bookName.length<1 || autor.length<1 || desc.length<1){
            console.log("Error - input proper data");
        }
        else {
            var book = {
                "name": bookName,
                "autor":autor,
                "description":desc
            };

            var bookToJson = JSON.stringify(book);
            console.log("to jest jsonowany book" + bookToJson);
            $.ajax({
                url: "http://api.coderslab.pl/book",
                method: "POST",
                data: bookToJson,
                type: 'json',
                success: function(json) {
                    console.log("udalo sie");
                    console.log(json);
                    booklist.html("");
                    loadAllBooks();
                },
                error: function(xhr, status, errorThrown){
                    console.log("Error");
                    console.log(xhr);
                },
                complete: function(xhr, status){
                    console.log("Zapytanie sie skonczylo");
                    console.log(status);
                }

            });
        }
    })


});