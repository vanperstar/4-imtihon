var post = []
var containerPost = document.querySelector(".posts")

function postsFunction(posts) {
    let postsTempleteEl = document.querySelector("#posts-templet")
    let postEl = postsTempleteEl.content.cloneNode(true)
    postEl.querySelector(".posts-title").textContent = posts.title
    postEl.querySelector(".posts-desc").textContent = posts.body
    return postEl
}

function renderPosts(posts){
    containerPost.innerHTML = null
    let fragment = new DocumentFragment()
    posts.forEach(item => {
        fragment.appendChild(postsFunction(item))
    });
    containerPost.appendChild(fragment)
}

postRequest().then(result => {
    post = (result.posts)
    console.log(post)
    renderPosts(post)
})

// function paginationFunction() {
//     let paginationcontainerEL = document.querySelector(".pagination")
//     paginationcontainerEL.innerHTML = null;

//     let templetePagination = document.querySelector("#pagination-item")
// }