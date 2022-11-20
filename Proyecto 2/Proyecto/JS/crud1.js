
function add_row() {
    var new_title = document.getElementById("Rol").value;
    var new_salary = document.getElementById("Salario").value;
	var new_description = document.getElementById("descr").value;

    if (new_title && new_salary && new_description != "") {
        var table = document.getElementById("data_table");
        var table_len = (table.rows.length) - 1;
        var row = table.insertRow(table_len).outerHTML =
        "<div class='myrow'><div class='datos'><div id='row" + table_len + "'><div id='title_row" + table_len + "' class='titleData'>" + new_title + "</div>"+
        "<div class='descData' id='description_row" + table_len + "'>" + new_description + "</div>"+
        "<div><input type='button' value='Delete' class='delete' onclick='delete_row(" + table_len + ")'><input type='button' value='Edit' class='edit' onclick='edit_row(" + table_len + ",this)'></div></div></div>";

        document.getElementById("new_title").value = "";
        document.getElementById("new_description").value = "";
    }
}
