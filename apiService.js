import axios from 'axios';

const API_BASE_URL = 'http://20.244.56.144/test';

// Function to get products from the API
const getProducts = (company, category, top, minPrice, maxPrice) => {
    const url = `${API_BASE_URL}/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    return axios.get(url);
};

export default getProducts;
