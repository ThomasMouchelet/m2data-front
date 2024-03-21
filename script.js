function getAllPosts(){
    fetch("http://localhost:8000/posts")
       .then(response => response.json())
       .then(data => {
           const listPost = document.querySelector("#list-post");
           console.log(listPost);
           listPost.innerHTML = "";
    
           data.forEach(post => {
            console.log("post : ", post);
            const divElement = document.createElement("div");
            divElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <button>Delete</button>
            ` 
            const deleteBtn = divElement.querySelector("button");
            deleteBtn.addEventListener("click", () => {
                console.log("Delete post");
                
                fetch(`http://localhost:8000/posts/${post.id}`, {
                    method: "DELETE"
                })
                .then(response => {
                    console.log("delete success");
                })
            })

            listPost.appendChild(divElement);
           });
       });
}

getAllPosts()

const form = document.querySelector("form");
console.log("form: ", form);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("form submit");
    // get Date from form
    const title = document.querySelector("input[name=title]").value;
    console.log("title: ", title);
    // Get value content
    const content = document.querySelector("textarea[name=content]").value;
    console.log("content: ", content);
    // Send to API with(fetch)

    fetch("http://localhost:8000/posts" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content
        })
    })
    .then(response => {
        console.log(response.json());
        // Refresh data
        getAllPosts()
    })
    .catch(error => console.log(error))
});
