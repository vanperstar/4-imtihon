var post = []

var bookmarkedPost  = JSON.parse(localStorage.getItem("bookmarkedPost")) || [];
var containerPost = document.querySelector(".posts")
var deleteEL = document.querySelector('.posts-delete')
var saveFormEl = document.querySelector(".modal-form-save")

function postsFunction(posts) {
    let postsTempleteEl = document.querySelector("#posts-templet")
    let postEl = postsTempleteEl.content.cloneNode(true)
    postEl.querySelector(".posts-title").textContent = posts.title
    postEl.querySelector(".posts-desc").textContent = posts.body


    let deleteEL = postEl.querySelector(".posts-delete");
    deleteEL.dataset.postId = posts._id
    deleteEL.dataset.task = 'delete'
    deleteEL.addEventListener('click', (event) => {
        if(event.target.dataset.postId = posts._id){
            renderPosts(post)
            deleteRequest(posts._id);
        }
    })

    postRequest().then(result => {
        post = (result.posts)
        console.log(post)
        renderPosts(post)
    })

    let editEl = postEl.querySelector('.posts-edit');
        editEl.dataset.todoId = post._id
        editEl.dataset.task = 'edit'
        editEl.addEventListener('click', (event) => {
            let modalEl = document.querySelector('.my-modal');
            modalEl.classList.add('my-modal--active');
            console.log(event.target);
            var modalForm = document.querySelector(".modal-form")
            var modalTitle = document.querySelector(".modal-form-title")
            var modalBody = document.querySelector(".modal-form-body")
            
            modalForm.addEventListener('submit', async event => {
                event.preventDefault()
            
                const credentials = {
                    title: modalTitle.value,
                    body: modalBody.value
                }
                console.log(credentials);
                const result = await updatedRequest(credentials, id)
                localStorage.setItem('token', result['Authorization'])
            })
        })

        let saveEl = postEl.querySelector('.posts-save');
        saveEl.dataset.todoId = post._id
        saveEl.dataset.task = 'save'
        saveEl.addEventListener("click", (event) => {
            if(!bookmarkedPost.find(item => item._id = event.target.dataset.todoId)) {
                const post = posts.find((post) => post._id = event.target.dataset.todoId);
                bookmarkedPost.push(post);
                event.target.disabled = true
            }
            localStorage.setItem("bookmarkedPost", JSON.stringify(bookmarkedPost));
            renderBookmarked(bookmarkedPost, bookmarked);
        })

    return postEl
}

// function createCloneBookmark(post) {
//     let postTemplate = document.querySelector('#save-templete');
//     let postEl = postTemplate.content.cloneNode(true);
//     postEl.querySelector('.saved-title').textContent = post.title;
//     postEl.querySelector('.saved-desc').textContent = post.body;

//     let deleteEl = postEl.querySelector('.saved-delete');
//     deleteEl.dataset.todoId = post._id
//     deleteEl.dataset.task = 'delete'
//     return postEl
// }



// document.body.addEventListener('click', (event) => {
//     clicked = event.target;

//     if(clicked.dataset.task = 'cancel') {
//         let modalEl = document.querySelector('.my-modal');
//         modalEl.classList.remove('my-modal--active');
//     }
// })




// var myModalEl = document.querySelector(".my-modal")
// var myModalContentEL = document.querySelector(".my-modal-content")
// var modalFormEl = document.querySelector(".modal-form")

// modalFormEl.addEventListener('submit', (event) => {
//     event.preventDefault()
// })


// var saveTempleteEl = document.querySelector("#save-templete")
// var savePushEl = document.querySelector(".saved-push")

// function saveRequest(posts){
//     savePushEl.innerHTML = null
//     let fragment = new DocumentFragment()
//     posts.forEach(item => {
//         fragment.appendChild(renderPosts(item))
//     });
//     savePushEl.appendChild(fragment)
// }
// saveRequest()

// function paginationFunction() {
//     let paginationcontainerEL = document.querySelector(".pagination")
//     paginationcontainerEL.innerHTML = null;

//     let templetePagination = document.querySelector("#pagination-item")
// }