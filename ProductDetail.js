import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';

function ProductDetail() {
    const { productName } = useParams();

    // Simulate fetching product details based on productName
    // In a real application, you would fetch product details from the API
    const product = {
        name: productName,
        price: 1000,
        rating: 4.5,
        discount: 20,
        availability: 'In Stock'
    };

    return (
        <Container>
            <Typography variant="h4">Product Details</Typography>
            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={`https://via.placeholder.com/500?text=${product.name}`}
                    alt={product.name}
                />
                <CardContent>
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography variant="body1">Price: ${product.price}</Typography>
                    <Typography variant="body1">Rating: {product.rating}</Typography>
                    <Typography variant="body1">Discount: {product.discount}%</Typography>
                    <Typography variant="body1">Availability: {product.availability}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

export default ProductDetail;
