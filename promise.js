const posts = [
    { title: "POST1", body: "This is post1" },
    { title: "POST2", body: "This is post2" },
];

let lastActivityTime = new Date(); // Assuming the user's last activity time starts from the current time

function getPost() {
    setTimeout(() => {
        let output = "";
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            const error = false;
            if (!error) {
                resolve();
            } else {
                reject("something error");
            }
        }, 1000);
    });
}

function updateLastUserActivityTime() {
    return new Promise((resolve) => {
        setTimeout(() => {
            lastActivityTime = new Date(); // Update user's last activity time
            resolve(lastActivityTime);
        }, 1000);
    });
}

createPost({ title: "POST3", body: "This is post3" })
    .then(() => updateLastUserActivityTime())
    .then((updatedTime) => {
        console.log("Posts:");
        console.log(posts);
        console.log("Last Activity Time:", updatedTime);
        return updatedTime; // Pass updatedTime to the next then() block
    })
    .then((updatedTime) => {
        // Assuming deletePost function works similarly to createPost (returns a promise)
        return deletePost().then(() => updatedTime);
    })
    .then((updatedTime) => {
        console.log("Remaining Posts after deletion:");
        console.log(posts);
        console.log("Last Activity Time after deletion:", updatedTime);
        getPost(); // Update the displayed posts
    })
    .catch((err) => console.log(err)); // Catch any errors that occur in the promises
