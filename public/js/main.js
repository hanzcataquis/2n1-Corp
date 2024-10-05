document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('addProductForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productCategory = document.getElementById('productCategory').value;
    const productImage = document.getElementById('productImage').files[0];

    let isValid = true;

    if (productName === "") {
        document.getElementById('productName').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('productName').classList.remove('is-invalid');
    }

    if (productCategory === "") {
        document.getElementById('productCategory').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('productCategory').classList.remove('is-invalid');
    }

    if (!productImage) {
        document.getElementById('productImage').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('productImage').classList.remove('is-invalid');
    }

    if (isValid) {
        const formData = new FormData();
        formData.append('productImage', productImage);
        formData.append('name', productName);
        formData.append('category', productCategory);

        fetch('/api/products', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            fetchProducts();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

        const addProductModal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
        addProductModal.hide();
        document.getElementById('addProductForm').reset();
    }
});

function fetchProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            const milkteaList = document.getElementById('milkteaList');
            const icedCoffeeList = document.getElementById('icedCoffeeList');
            const nonCoffeeList = document.getElementById('nonCoffeeList');

            milkteaList.innerHTML = '';
            icedCoffeeList.innerHTML = '';
            nonCoffeeList.innerHTML = '';

            data.forEach(product => {
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-3';
                card.innerHTML = `
                    <div class="card">
                        <img src="/uploads/${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                        </div>
                    </div>
                `;

                if (product.category === 'milktea') {
                    milkteaList.appendChild(card);
                } else if (product.category === 'iced-coffee') {
                    icedCoffeeList.appendChild(card);
                } else if (product.category === 'non-coffee') {
                    nonCoffeeList.appendChild(card);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

document.addEventListener('DOMContentLoaded', fetchProducts);
