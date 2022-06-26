var post = []
const ITEMS_PER_PAGE = 10;
var currentPage = 1;

var bookmarkedPost  = JSON.parse(localStorage.getItem("bookmarkedPost")) || [];
var bookmarked = document.querySelector(".saved-push")
var containerPost = document.querySelector(".posts")
var deleteEL = document.querySelector('.posts-delete')
var saveFormEl = document.querySelector(".modal-form-save")
var modalFormEl = document.querySelector(".modal-form")

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
        modalFormEl.addEventListener('submit', async event => {
            event.preventDefault()
    
            const credentials = {
                title: modalTitle.value,
                body: modalBody.value
            }
            const result = await deleteRequest(credentials, id)
            localStorage.setItem('token', result['Authorization'])
        })
    })

    let saveForm = postEl.querySelector(".posts-save")
    saveForm.dataset.todoId = posts._id
    saveForm.dataset.task = 'save'
    saveForm.addEventListener("click", (event) => {
        if(event.target.dataset.todoId = posts._id) {
            bookmarkedPost.push(post);
            renderBookmarked(bookmarkedPost, bookmarked);
        }
        localStorage.setItem("bookmarkedPost", JSON.stringify(bookmarkedPost));
        renderBookmarked(bookmarkedPost, bookmarked);
    })

    return postEl
}

function renderPosts(posts){
    paginationFunction()
    containerPost.innerHTML = null
    let fragment = new DocumentFragment()
    posts.forEach(item => {
        fragment.appendChild(postsFunction(item))
    });
    containerPost.appendChild(fragment)
}

function createCloneBookmark(post) {
    let postTemplate = document.querySelector('#save-templete');
    let postEl = postTemplate.content.cloneNode(true);
    postEl.querySelector('.saved-title').textContent = post.title;
    postEl.querySelector('.saved-desc').textContent = post.body;

    let deleteEl = postEl.querySelector('.saved-delete');
    deleteEl.dataset.todoId = post._id
    deleteEl.dataset.task = 'delete'
    return postEl
}

renderBookmarked(bookmarkedPost, bookmarked);

postRequest().then(result => {
    post = (result.posts)
    console.log(post)
    renderPosts(post)
})

var cancelEl = document.querySelector(".modal-form-cancel")
cancelEl.dataset.task = "cancel"
document.body.addEventListener('click', (event) => {
    clicked = event.target;

    if(clicked.dataset.task === 'cancel') {
        let modalEl = document.querySelector('.my-modal');
        modalEl.classList.remove('my-modal--active');
    }

    if(clicked.dataset.task = 'delete') {

        let modalEl = document.querySelector('.my-modal');
        modalEl.classList.add('.my-modal--active');
        console.log(event.target);
        // let todoId = clicked.dataset.todoId;
        // let todo = post.find(item => item._id == todoId)
        // let content = createModalInfo(todo, item._id);
        // let modal = renderModal(content);
        // document.body.appendChild(modal)

        var modalForm = document.querySelector(".modal-form")
        var modalTitle = document.querySelector(".modal-form-title")
        var modalBody = document.querySelector(".modal-form-body")
        if(event.target.dataset.todoId == post._id) { 
            id = post._id
        }
        
        modalForm.addEventListener('submit', async event => {
            event.preventDefault()
        
            const credentials = {
                title: modalTitle.value,
                body: modalBody.value
            }
            console.log(credentials);
            const result = await updatedRequest(credentials, id)
            localStorage.setItem('token', result['Authorization'])

            localStorage.setItem("token", token);
            renderPosts()
        })
    }
})


modalFormEl.addEventListener('submit', (event) => {
    event.preventDefault()
})

var cancelBtn = document.querySelector('.modal-form-cancel')
var saveBtn = document.querySelector('.modal-form-save')
cancelBtn.dataset.task = 'cancel'
saveBtn.dataset.task = 'save'

document.body.addEventListener('click', (event) => {
    clicked = event.target;

    if(clicked.dataset.task === 'cancel') {
        let modalEl = document.querySelector('.my-modal');
        modalEl.classList.remove('my-modal--active');
    }

    if(clicked.dataset.task === 'save') {
        let modalEl = document.querySelector('.my-modal');
        modalEl.classList.remove('.my-modal--active');
    }

    if(clicked.dataset.task === 'delete') {
        bookmarkedPost = bookmarkedPost.filter(item => item._id !== clicked.dataset.todoId)
        localStorage.setItem("bookmarkedPost", JSON.stringify(bookmarkedPost, bookmarked));
        renderBookmarked(bookmarkedPost, bookmarked);
    }
})


// pagination


function paginationFunction(totalResult) {
    let paginationContainerEL = document.querySelector(".pagination")
    paginationContainerEL.innerHTML = null;
    let templetePagination = document.querySelector("#pagination-item")
    let fragment = new DocumentFragment()
    for (let i= 1; i <= Math.ceil(totalResult / ITEMS_PER_PAGE); i++){
        let pageItemEL = templetePagination.content.cloneNode(true)
        pageItemEL.querySelector(".page-link").textContent = i
        fragment.appendChild(pageItemEL)
    }
    
    paginationContainerEL.appendChild(fragment)
}