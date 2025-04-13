const express = require('express');
require('dotenv').config(); // Add dotenv configuration
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Payment endpoint
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;
        
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount || 9900, // Default to ₹99 if no amount provided
            currency: 'inr',
            payment_method_types: ['card'],
            metadata: {
                integration_check: 'accept_a_payment',
            },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 