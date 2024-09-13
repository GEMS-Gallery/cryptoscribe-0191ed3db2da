import { backend } from 'declarations/backend';

let categories = [];
let currentCategory = '';

document.addEventListener('DOMContentLoaded', async () => {
    await loadCategories();
    setupEventListeners();
});

async function loadCategories() {
    categories = await backend.getCategories();
    const categoryContainer = document.getElementById('categoryContainer');
    categoryContainer.innerHTML = '';

    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');
        categoryElement.innerHTML = `
            <h2>${category.name}</h2>
            <p>${category.description}</p>
        `;
        categoryElement.addEventListener('click', () => showCategory(category.name));
        categoryContainer.appendChild(categoryElement);
    });
}

function setupEventListeners() {
    document.getElementById('backButton').addEventListener('click', showCategories);
    document.getElementById('newPostForm').addEventListener('submit', handleNewPost);
}

async function showCategory(categoryName) {
    currentCategory = categoryName;
    document.getElementById('categoriesView').style.display = 'none';
    document.getElementById('categoryView').style.display = 'block';
    document.getElementById('categoryTitle').textContent = categoryName;
    await loadPosts(categoryName);
}

function showCategories() {
    document.getElementById('categoriesView').style.display = 'block';
    document.getElementById('categoryView').style.display = 'none';
}

async function loadPosts(categoryName) {
    const posts = await backend.getPosts(categoryName);
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <div class="post-meta">By ${post.author} on ${new Date(post.timestamp / 1000000).toLocaleString()}</div>
            <p>${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

async function handleNewPost(event) {
    event.preventDefault();
    const title = document.getElementById('postTitle').value;
    const author = document.getElementById('postAuthor').value;
    const body = document.getElementById('postBody').value;

    await backend.addPost(currentCategory, title, body, author);
    await loadPosts(currentCategory);

    document.getElementById('newPostForm').reset();
}