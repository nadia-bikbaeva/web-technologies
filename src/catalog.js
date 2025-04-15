export default class Catalog {
    constructor(el) {
        this.el = el;
        this.limit = 6;
        this.itemsContainer = this.el.querySelector('.posts__items');
        this.paginationContainer = this.el.querySelector('.posts__pagination');

        this.init();
    }

    async init() {
        const page = this.getPage();
        const { items, totalCount } = await this.getItems(page);
        this.renderItems(items);
        this.renderPagination(page, totalCount);
    }

    getPage() {
        const url = new URL(window.location.href);
        return +url.searchParams.get('page') || 1;
    }

    async getItems(page) {
        const url = `https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${page}`;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Ошибка загрузки постов');

            const totalCount = +res.headers.get('x-total-count');
            const items = await res.json();

            return { items, totalCount };
        } catch (error) {
            console.error('Ошибка при получении постов:', error);
            return { items: [], totalCount: 0 };
        }
    }

    renderItems(items) {
        this.itemsContainer.innerHTML = '';

        items.forEach(post => {
            const postHTML = `
                <div class="post-item">
                    <h3 class="post-item__title">${post.title}</h3>
                    <div class="post-item__body">${post.body}</div>
                    <a href="post.html?id=${post.id}">Открыть</a>
                </div>
            `;
            this.itemsContainer.insertAdjacentHTML('beforeend', postHTML);
        });
    }

    renderPagination(currentPage, totalCount) {
        this.paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalCount / this.limit);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.classList.add('posts__pagination-item');
            if (i === currentPage) {
                btn.classList.add('posts__pagination-item-active');
            }

            btn.textContent = i;
            btn.addEventListener('click', () => {
                const url = new URL(window.location.href);
                url.searchParams.set('page', i);
                window.location.href = url.toString();
            });

            this.paginationContainer.appendChild(btn);
        }
    }
}
