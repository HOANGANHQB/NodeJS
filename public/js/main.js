$('#paging').pagination({
    dataSource: '/api/account/?page=1',
    locator: 'data',
    totalNumberLocator: function(response) {
        // you can return totalNumber by analyzing response content
        return response.total;
    },
    pageSize: 4,
    afterPageOnClick: function(event, pageNumber){
        loadPage(pageNumber)
    },
    afterPreviousOnClick : function(event, pageNumber){
        loadPage(pageNumber)
    },
    afterNextOnClick : function(event, pageNumber){
        loadPage(pageNumber)
    }
})
function loadPage(page){
    curentPage = page
    $.ajax({
        url: './api/account?page='+ page,
        type: 'GET'
    })
    .then(res=>{
        $('#content').html("")
        for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            var item = $(`
                <h1>${element.username}: ${element.password}</h1>
            `)
            $('#content').append(item)
        }
    })
    .catch(err=>{
        console.log("Lỗi API")
    })
}

loadPage(1)










/* var curentPage  = 1 

function loadPage(page){
    curentPage = page
    $.ajax({
        url: './api/account?page='+ page,
        type: 'GET'
    })
    .then(data=>{
        $('#content').html("")
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            var item = $(`
                <h1>${element.username}: ${element.password}</h1>
            `)
            $('#content').append(item)
        }
    })
    .catch(err=>{
        console.log("Lỗi API")
    })
}

function nextPage(){
    curentPage ++
    $.ajax({
        url: './api/account?page='+ curentPage,
        type: 'GET'
    })
    .then(data=>{
        console.log(data);
        $('#content').html("")
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            var item = $(`
                <h1>${element.username}: ${element.password}</h1>
            `)
            $('#content').append(item)
        }
    })
    .catch(err=>{
        console.log("Lỗi API")
    })
}
function prePage(){
    curentPage--
    $.ajax({
        url: './api/account?page='+ curentPage <= 0? 1:curentPage,
        type: 'GET'
    })
    .then(data=>{
        console.log(data);
        $('#content').html("")
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            var item = $(`
                <h1>${element.username}: ${element.password}</h1>
            `)
            $('#content').append(item)
        }
    })
    .catch(err=>{
        console.log("Lỗi API")
    })
} */