let select = document.querySelector('#select');
let postCards = document.querySelector('.postcards');
let profilecontact = document.querySelector('.profilecontact');

let usersArray = [];
let postsArray = [];
let commentsArray = [];

// Using a fetch API to get user data
async function usersAPI() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        let users = await res.json();
        // users = JSON.parse(users);

        users.forEach((user) => {
            usersArray.push(user);
        })

    } catch (err) {
        console.log(err);
    }
};

// Using a fetch API to get comments data
async function commentsAPI() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/comments')
        let comments = await res.json()

        comments.forEach((comment, index) => {
            commentsArray.push(comment);
        })
    } catch (err) {
        console.log(err);
    }
}

// Using a fetch API to get post data
async function postsAPI() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        let posts = await res.json();

        posts.forEach((post) => {
            postsArray.push(post);
        })
    } catch (err) {
        console.log(err);
    }
}


async function options() {
    await usersAPI();

    console.log()
    usersArray.forEach((user) => {
        let opt = document.createElement('option');
        opt.value = user.name;
        opt.text = user.name;
        select.appendChild(opt);
        // console.log(user.name)
    });
}

options()

select.addEventListener('change', () => {
    postCards.textContent = ""
    const selectValue = select.value;
    // console.log(This is ${selectValue})
    usersArray.forEach((user) => {
        if (selectValue == user.name) {
            postsArray.forEach((post) => {
                if (user.id == post.userId) {
                    createCard(user, post);
                    profileContact(user);
                    commentsArray.forEach((comment) => {
                        if (user.id == comment.id) {
                            // return console.log(user.username, post.post, comment.comment)
                            createComment(comment);
                        }
                    })
                }
            });
        };
    });
});

// Display the user details
function profileContact(user) {
    profilecontact.textContent = "";
    let profilePic = document.createElement('img');
    profilePic.className= "bgp";
    profilePic.src = "./assets/user3.png";

    let userhead = document.createElement('h2');
    userhead.textContent = user.name;

    let userName = document.createElement('h4');
    userName.textContent = `User name: ${user.username}`;

    let userAddress = document.createElement('h4');
    userAddress.textContent = `Street: ${user.address.street}`;

    let email = document.createElement('p')
    email.textContent = `email: ${user.email}`;

    let contact = document.createElement('div')
    contact.appendChild(userhead);
    contact.appendChild(userName);
    contact.appendChild(userAddress);
    contact.appendChild(email);

    profilecontact.appendChild(profilePic);
    profilecontact.appendChild(contact);
}
// Function to create the cards
function createCard(user, post) {
    // User profile picture (child to userDet)
    let userProfilePic = document.createElement('img');
    userProfilePic.src = "./assets/user3.png";
    userProfilePic.className = 'profile';

    // Users username (child to userDet)
    let userName = document.createElement('p');
    userName.className = "username";
    userName.textContent = `@${user.username}`;

    // User details (child to card)
    let userDet = document.createElement('div');
    userDet.className = 'userdet';

    let likes = document.createElement('p');
    likes.innerHTML = '<ion-icon name="heart" class="thumbs-up"></ion-icon>200';
    let commen = document.createElement('p');
    commen.innerHTML = '<ion-icon class="chatbubble" name="chatbubble-outline"></ion-icon>200';
    let reposts = document.createElement('p');
    reposts.innerHTML = '<ion-icon class="sync" name="sync"></ion-icon>200';

    // stats
    let stats = document.createElement('div');
    stats.className = "stats"

    stats.appendChild(commen)
    stats.appendChild(likes);
    stats.appendChild(reposts);


    // The whole card (child to postCards)
    let card = document.createElement('div')
    card.addEventListener('click', ()=> {
        console.log('Card clicked');
    })
    card.className = 'card'

    // Append userDet's children
    userDet.appendChild(userProfilePic);
    userDet.appendChild(userName);

    let postTitle = document.createElement('h4');
    postTitle.className = "posttitle";
    postTitle.textContent = post.title;

    let postCont = document.createElement('p');
    postCont.className = 'words';
    postCont.textContent = post.body;

    // Append user details to parent (card)
    card.appendChild(userDet);
    card.appendChild(postTitle);
    card.appendChild(postCont);
    card.appendChild(stats)

    // Append the card to the display div
    postCards.appendChild(card);
}

async function displayPosts() {
    await postsAPI();

    profilecontact.textContent = ""
    usersArray.forEach((user) => {
        postsArray.forEach((post) => {
            if (user.id == post.userId) {
                createCard(user, post);
                // profileContact(user);
            };
        })
    })
}

// Display user comments
function createComment(comment) {


}
displayPosts();