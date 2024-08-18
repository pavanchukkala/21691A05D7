import React, { useState, useEffect } from 'react';
import getProducts from './apiService';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Select, MenuItem, TextField } from '@mui/material';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        company: 'AMZ',
        category: 'Laptop',
        top: 10,
        minPrice: 0,
        maxPrice: 10000
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts(filters.company, filters.category, filters.top, filters.minPrice, filters.maxPrice);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [filters]);

    return (
        <Container>
            <Typography variant="h4">Top Products</Typography>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.productName}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://via.placeholder.com/150?text=${product.productName}`}
                                alt={product.productName}
                            />
                            <CardContent>
                                <Typography variant="h6">{product.productName}</Typography>
                                <Typography variant="body2">Price: ${product.price}</Typography>
                                <Typography variant="body2">Rating: {product.rating}</Typography>
                                <Typography variant="body2">Discount: {product.discount}%</Typography>
                                <Typography variant="body2">Availability: {product.availability}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ProductList;
