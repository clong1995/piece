let {ipcRenderer} = require('electron');
ejs.ready($ => {
    $.on('#establish','click',e=>{
        let name = document.querySelector('#name').value,
            type = document.querySelector('#type').value;
        alert(type);
    })
});