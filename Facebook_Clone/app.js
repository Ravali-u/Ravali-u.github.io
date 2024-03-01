let divMenu = document.createElement("div");
let divContent = document.createElement("div");
divMenu.classList.add("divMenu");
divContent.classList.add("divContent");
let userId;
const validateUser= async () =>{
    userId = txtUserId.value;
    userName.innerHTML = await getName(userId);
    container.innerHTML = "";
    let str =`
    <p onclick='showData(1)'><i class="bi bi-bookmarks-fill"></i>Feeds [All]</p>
    <p onclick = 'showData(2)'><i class="bi bi-file-earmark-post-fill"></i><i> My Post</i></p>
    <p onclick = 'showData(3)'><i class="bi bi-journal-album"></i>My Albums</p>
    <p onclick = 'showData(4)'><i class="bi bi-person"></i>My Profile</p>
    <p onclick = 'showData(6)'><i class="bi bi-check-square"></i></i>My ToDos</p>
    <p onclick = 'showData(5)'><i class="bi bi-door-open"></i>Logout</p>
    `;
    divMenu.innerHTML=str;
    container.append(divMenu)
    divContent.innerHTML= await getFeeds();
    container.append(divContent);
}
const getName =async(id)=>{
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
    const json = await fetchData(url);
    return json.name;

}
const getFeeds = async()=>{
    const url ="https://jsonplaceholder.typicode.com/posts";
    const json = await fetchData(url)
    let str = "<div><h2>Feeds [All Posts]</h2>";
    json.map((element)=>{
        str+=`<p><b>User:</b>${element.userId}</p>
        <p>Title:${element.title}</p>
        <p><b>Title:</b>${element.body}></p>
        <p onclick=getComments(${element.id})>View Comments</p>
        <hr>`;
    });
    str+="</div>";
    return str;
};
const showData = async(pageId)=>{
    if(pageId==1){
        divContent.innerHTML = await getFeeds();
    }else if(pageId===2){
        divContent.innerHTML = await getPosts();
    }else if(pageId===3){
        divContent.innerHTML = await getAlbums();
    }else if(pageId===4){
        divContent.innerHTML = await getProfile();
    }else if(pageId===5){
        location.reload();
    }
    else if(pageId===6){
        divContent.innerHTML = await getToDos();
    }
};
const getPosts =async()=>{
    const url ="https://jsonplaceholder.typicode.com/posts";
    const json = await fetchData(url)
    let str = "<div><h2>Posts [All Posts]</h2>";
    json.map((element)=>{
        if(element.userId==userId)
        str+=`<p><b>User:</b>${element.userId}</p>
        <p><b>title:</b>${element.title}></p>
        <P><b>Body:</b>${element.body}</p>
        <p onclick=getComments(${element.id})>View Comments</p>
        <hr>`;
    });
    str+="</div>";
    return str;

}
const getAlbums=async()=>{
    const url ="https://jsonplaceholder.typicode.com/albums";
    const json = await fetchData(url)
    let str = "<div><h2>Albums [All Albums]</h2>";
    json.map((element)=>{
        if(element.userId == userId)
        str+=`<p><b>User:</b>${element.userId}</p>
        <p><b>title:</b>${element.title}</p>
        
        <p onclick=getPhotos(${element.id})>${element.title}</p>
        <hr>`;
    });
    str+="</div>";
    return str;

}
const getProfile=async()=>{
    const url ="https://jsonplaceholder.typicode.com/users";
    const json = await fetchData(url)
    let str = "<div><h2>My Profile [All Profile]</h2>";
    json.map((element)=>{
        if(userId == element.id)
        str+=`
        <p><b>mail:</b>${element.email}</p>
        <p><b>name::</b>${element.name}</p>
        <p><b>city:</b>${element.address.city}</p>
        <p onclick=getComments(${element.id})>View Comments</p>
        <hr>`;
    });
    str+="</div>";
    return str;

 }
const getComments=async()=>{
    const url ="https://jsonplaceholder.typicode.com/posts/?userId=1";
    const json = await fetchData(url)
    let str = "<div><h2>Comments </h2>";
    json.map((element)=>{
        
        str+=
       `<p><b>User:</b>${element.userId}</p>
        <p><b>title:</b>${element.title}></p>
        <P><b>Body:</b>${element.body}</p>
        <p onclick=getComments(${element.id})>View Comments</p>
        <hr>`;

    });
    str+="</div>";
    divContent.innerHTML = str;
    return str;

}
const getPhotos=async()=>{
    const url ="https://jsonplaceholder.typicode.com/photos";
    const json = await fetchData(url)
    let str = "<div><h2>Photos [All Profile]</h2>";
    json.map((element)=>{
        if(element.id==element.albumId)
        
        str+=
       `<p><b>User:</b>${element.albumId}</p>
        <p><b>title:</b>${element.title}></p>
        <P>url:<img src='${element.url}'></p>
        <p><b>thumbnailUrl:</b><img src='${element.thumbnailUrl}'></p>
        <p onclick=getComments(${element.id})>View Comments</p>
        <hr>`;

    });
}
    const getToDos=async()=>{
        const url =`https://jsonplaceholder.typicode.com/todos/?$userId=${userId}`;
        const json = await fetchData(url)
        let str = "<div><h2>ToDos [All Profile]</h2>";
        json.map((element)=>{
            
           
           if(element.completed===true){
            str+= `<p><input type="checkbox" checked>${element.title}</p><hr>`
               console.log(element.completed)
        }else{
            
         str+=  `<p><input type="checkbox">${element.title}</p><hr>`
        }
           
    
        });
    str+="</div>";
    divContent.innerHTML = str;
    return str;

}

const fetchData = async(url)=>{
    const response= await fetch(url);
    const json= await response.json();
    return json;
};