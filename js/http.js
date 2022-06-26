
const API = "https://fast-ravine-16741.herokuapp.com"
async function fetchAPI(options = {
    url: "",
    headers: {},
    method: "GET",
    body:undefined
}) {
    try{
        const response = await fetch(options.url, {
            method:options.method,
            headers:{
                "Content-Type":"application/json",
                ...options.headers
            },
            body:JSON.stringify(options.body)
        })
        const result = await response.json()
        if(response.status >= 300)throw new Error(result);
        return result
    }catch(err){
        console.log(err)
    }
}

async function loginRequest(credentials){
    const result = await fetchAPI({
        url:`${API}/api/auth`,
        method: "POST",
        body:credentials
    })
    return result
}

async function registerRequest (credentials){
    const result = await fetchAPI({
        url:`${API}/api/users`,
        method:"POST",
        body:credentials
    })
    return result
}

async function postRequest (credentials){
    const token = localStorage.getItem('token')
    const result = await fetchAPI({
        url:`${API}/api/posts`,
        method:"GET",
        headers: {
            "Authorization": token
        },
        body:credentials
    })
    return result
}

async function deleteRequest (id){
    const token = localStorage.getItem('token')
    const result = await fetchAPI({
        url: `${API}/api/posts/${id}/`,
        method:"DELETE",
        headers: {
            "Authorization": token
        },
        // body:credentials
    })
    return result
}

async function editRequest (id){
    const token = localStorage.getItem('token')
    const result = await fetchAPI({
        url: `${API}/api/posts/${id}/`,
        method:"PUT",
        headers: {
            "Authorization": token
        },
        body:credentials
    })
    return result
}



function renderBookmarked(post) {
    bookmarked.innerHTML = null;
    let fragment = new DocumentFragment()
    post.forEach(item => {
        fragment.appendChild(createCloneBookmark(item))
    });
    bookmarked.appendChild(fragment);
}


function renderPagination(totalResults) {
    let paginationContainer = document.querySelector('.todo-pagination')
    paginationContainer.innerHTML = null;

    let templatePageItem = document.querySelector('#pagination-item');
    let paginationFragment = new DocumentFragment()
    for(let i=1; i<= Math.ceil(totalResults / itemPerpage); i++) {
        let pageItem = templatePageItem.content.cloneNode(true);
        let itemEl = pageItem.querySelector('.page-item');
        let linkEl = pageItem.querySelector('.page-link');

        if(i == currentPage) {
            itemEl.classList.add('active');
        }else{
            itemEl.classList.remove('active');
        }
        
        linkEl.textContent = i;
        linkEl.dataset.pageId = i;
        linkEl.dataset.task = 'page';

        paginationFragment.appendChild(pageItem);
    }
    paginationContainer.appendChild(paginationFragment)
}

function renderPosts(post, totalResults = 0) {
    document.querySelector(".results").textContent = totalResults
    renderPagination(totalResults)
    postEl.innerHTML = null;
    if (!post || post.length <= 0) {
        let Not = document.createElement('p')
        Not.textContent = 'Users Not Found';
        Not.className = 'fs-1 text-light text-center fw-bold';
        moviesRow.appendChild(Not)
    } else {
        let fragment = new DocumentFragment()
        post.forEach(item => {
            fragment.appendChild(createClonePosts(item))
        });

        postEl.appendChild(fragment)
    }
}
function renderPosts(post) {
    postEl.innerHTML = null;
    let fragment = new DocumentFragment()
    post.forEach(item => {
        fragment.appendChild(createClonePosts(item))
    });
    postEl.appendChild(fragment);
}