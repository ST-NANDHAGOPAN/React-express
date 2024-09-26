const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const routes = require("./src/routes");
const passportConfig = require("./src/passport-config");
const cors = require("cors");
const flash = require("express-flash");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path"); // Make sure to require path

require("dotenv").config();

// CORS configuration
app.use(cors());
app.use(bodyParser.json());
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// Connect to MongoDB
mongoose.connect(process.env.DB_HOST, {
    dbName: process.env.DB_NAME,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Connection error:", err);
});

// Set up routes
routes(app);

// PayPal configuration
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

app.use(express.static("client/dist")); // Serve static files
app.use(express.json()); // Parse incoming requests with JSON payloads

async function handleResponse(response) {
    try {
        const jsonResponse = await response.json();
        return {
            jsonResponse,
            httpStatusCode: response.status,
        };
    } catch (err) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./client/dist/index.html"));
});

// Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs
const generateAccessToken = async () => {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
        
        const response = await fetch(`${base}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
       
        const data = await response.json();

        return data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
};

// Generate a client token for rendering the hosted card fields
const generateClientToken = async () => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v1/identity/generate-token`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Accept-Language": "en_US",
            "Content-Type": "application/json",
        },
    });

    return handleResponse(response);
};

app.get('/api/paypal-client-id', (req, res) => {
    res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Return client token for hosted-fields component
app.post("/api/token", async (req, res) => {
    try {
        const { jsonResponse, httpStatusCode } = await generateClientToken();
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to generate client token:", error);
        res.status(500).send({ error: "Failed to generate client token." });
    }
});


// Create an order to start the transaction

const createOrder = async (cart) => {
    // use the cart information passed from the front-end to calculate the purchase unit details
    console.log("shopping cart information passed from the frontend createOrder() callback:", cart);

    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: "100",
                },
            },
        ],
    };
    

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
};

app.post("/api/orders", async (req, res) => {
    try {
        // use the cart information passed from the front-end to calculate the order amount detals
        const { cart } = req.body;
        const { jsonResponse, httpStatusCode } = await createOrder(cart);
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
});
/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log("response",response);
    return handleResponse(response);
};

app.post("/api/orders/:orderID/capture", async (req, res) => {
    try {
        const { orderID } = req.params;
        const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to capture order:", error);
        res.status(500).json({ error: "Failed to capture order." });
    }
});

// Authorize payment for the created order
const authorizeOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/authorize`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return handleResponse(response);
};

// authorizeOrder route
app.post("/api/orders/:orderID/authorize", async (req, res) => {
    try {
        const { orderID } = req.params;
        const { jsonResponse, httpStatusCode } = await authorizeOrder(orderID);
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to authorize order." });
    }
});


/**
 * Captures an authorized payment, by ID.
 * @see https://developer.paypal.com/docs/api/payments/v2/#authorizations_capture
 */
const captureAuthorize = async (authorizationId) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/payments/authorizations/${authorizationId}/capture`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return handleResponse(response);
};


// captureAuthorize route
app.post("/orders/:authorizationId/captureAuthorize", async (req, res) => {
    try {
        const { authorizationId } = req.params;
        const { jsonResponse, httpStatusCode } = await captureAuthorize(
            authorizationId
        );
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to capture authorize." });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port: ${process.env.PORT}`);
});
