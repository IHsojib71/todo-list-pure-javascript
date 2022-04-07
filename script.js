// creating empty array for our todo list
let todo_list_array =[];

function add_something(){
    let form = document.todo_form;
    let todo = form.input_field.value;
    let position = form.position.value;
//     checking wheather the input field is empty or not
    if(todo==""){
        alert("Please Write Something!");
        return false;
    }
    if (form.add_btn.value=='Save'){
        saveTodo(todo,parseInt(position));
    }else{
        let temp = {
            'todo':todo
        };
        add_todo(temp);
    }
}
function saveTodo(val,position){
    var form = document.todo_form;
    todo_list_array[position].todo = val;
    form.position.value = '';
    form.add_btn.value = 'Add';
    form.input_field.value = '';
    update_storage_todo_list();
}
function add_todo(val){
    todo_list_array.push(val);
    update_storage_todo_list();
    document.todo_form.input_field.value = '';
    
}
function update_storage_todo_list() {
    localStorage.setItem('local_todo_list',JSON.stringify(todo_list_array));
    show_todo_list();
}
function show_todo_list(){

    let custom_tr='<table>' +
        '<tr class="tbl_head">' +
        '<th width="50">NO</th>' +
        '<th>TODO LIST</th>'+
        '<th>ACTION</th></tr>';
    index=1;
    todo_list_array.forEach((val)=>{
        custom_tr+= '<tr>' +
            '<td align="center" width="40px" >'+(index)+'</td>' +
            '<td class="hover_todo" align="center"  >'+val.todo+'</td>' +
            '<td align="center"  width="40px" >' +
            '<a href="#" style="color:green;" onclick="modifyTodo('+index.toString()+')">&#x270e;</a>&nbsp;'+
            '<a href="#" style="color:red;" onclick="remove_todo('+index.toString()+')">&#128473;</a>' +
            '</td>' +
            '</tr>';
        index++;
    });

    custom_tr+='</table>';
    if (todo_list_array==''){
        document.getElementById('display_output').innerHTML="<h4>You Don't Have Any List!</h4>";
    }else
        document.getElementById('display_output').innerHTML=custom_tr;
}

function remove_todo(index) {
    if(confirm('Click OK To Delete!')==true){
        let position = parseInt(index) -1;
        todo_list_array.splice(position,1);
        update_storage_todo_list();
    }
}
function modifyTodo(index){
    let form =document.todo_form;
    let position = parseInt(index)-1;
    form.input_field.value = todo_list_array[position].todo;
    form.position.value = position;
    form.add_btn.value = 'Save';
}


function get_all_list(){
    if((localStorage.getItem('local_todo_list') !=null) || (localStorage.getItem('local_todo_list') !='')){
        todo_list_array = JSON.parse(localStorage.getItem('local_todo_list'));
    
    }else{
        todo_list_array=[];
    }
    if (todo_list_array==null){
        todo_list_array=[];
        
    }
    show_todo_list();
}
