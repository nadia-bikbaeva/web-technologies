import Catalog from "./catalog.js"

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}

function init() {
    const postsContainer = document.getElementById('posts');
    if (postsContainer) {
        new Catalog(postsContainer);
    }
}
