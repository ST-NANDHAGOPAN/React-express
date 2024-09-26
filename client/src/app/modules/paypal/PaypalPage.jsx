import React, { useState } from "react";
import {
    PayPalScriptProvider,
    PayPalCardFieldsProvider,
    PayPalNumberField,
    PayPalExpiryField,
    PayPalCVVField,
    usePayPalCardFields,
} from "@paypal/react-paypal-js";
import { Row, Col, Input } from "antd";

export default function Paypal() {
    const [postalCode, setPostalCode] = useState("");
   
    const initialOptions = {
        "client-id":
            "AdymCna38omXGSyEGk_M4X6gV02fCh5DRShVwFpRf2c1457NDLXnlH8EybO5IUYRJLuaNfApljyFItmW",
        "enable-funding": "venmo",
        "data-page-type": "product-details",
        components: "buttons,card-fields",
        "data-sdk-integration-source": "developer-studio",
    };

    async function createOrder() {
        try {
            const response = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // use the "body" param to optionally pass additional order information
                // like product ids and quantities
                body: JSON.stringify({
                    cart: [
                        {
                            sku: "1blwyeo8",
                            quantity: 2,
                        },
                    ],
                }),
            });

            const orderData = await response.json();

            if (orderData.id) {
                return orderData.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
            return `Could not initiate PayPal Checkout...${error}`;
        }
    }

    async function onApprove(data, actions) {
        try {
            const response = await fetch(
                `http://localhost:5000/api/orders/${data.orderID}/capture`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            
            const orderData = await response.json();
            
            const transaction =
                orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
            const errorDetail = orderData?.details?.[0];

            if (
                errorDetail ||
                !transaction ||
                transaction.status === "DECLINED"
            ) {
                // (2) Other non-recoverable errors -> Show a failure message
                let errorMessage;
                if (transaction) {
                    errorMessage = `Transaction ${transaction.status}: ${transaction.id}`;
                } else if (errorDetail) {
                    errorMessage = `${errorDetail.description} (${orderData.debug_id})`;
                } else {
                    errorMessage = JSON.stringify(orderData);
                }

                throw new Error(errorMessage);
            } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2)
                );
                return `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`;
            }
        } catch (error) {
            return `Sorry, your transaction could not be processed...${error}`;
        }
    }


    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalCardFieldsProvider
                createOrder={createOrder}
                onApprove={onApprove}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <PayPalNumberField
                            style={{
                                input: {
                                    color: "#000",
                                    backgroundColor: "#fff",
                                    border: "1px solid #d9d9d9",
                                    borderRadius: "5px",
                                    fontSize: "14px",
                                    height: "50px",
                                },
                                ".invalid": {
                                    color: "#ff4d4f",
                                    borderColor: "#ff4d4f",
                                },
                            }}
                        />
                        <span className="helper-text " style={{ padding: "0px 14px" }}>
                            Example Card Number: XXXX XXXX XXXX XXXX
                        </span>
                    </Col>
                    <Col span={12}>
                        <PayPalExpiryField
                            style={{
                                input: {
                                    color: "#000",
                                    backgroundColor: "#fff",
                                    border: "1px solid #d9d9d9",
                                    borderRadius: "5px",
                                    fontSize: "14px",
                                    height: "50px",
                                },
                                ".invalid": {
                                    color: "#ff4d4f",
                                    borderColor: "#ff4d4f",
                                },
                            }}
                        />
                        <span className="helper-text" style={{ padding: "0px 14px" }}>
                            Example Expiration Date: 02 / 26
                        </span>
                    </Col>
                </Row>

                <Row gutter={16}>
                   
                    <Col span={12}>
                        <PayPalCVVField
                            style={{
                                input: {
                                    color: "#000",
                                    backgroundColor: "#fff",
                                    border: "1px solid #d9d9d9",
                                    borderRadius: "5px",
                                    fontSize: "14px",
                                    height: "50px",
                                },
                                ".invalid": {
                                    color: "#ff4d4f",
                                    borderColor: "#ff4d4f",
                                },
                            }}
                        />
                         <span className="helper-text" style={{ padding: "0px 14px" }}>
                            Example CVV Code: XXX
                        </span>
                    </Col>
                    <Col span={12} style={{ padding: "0px 14px" , margin: "7px 0px" }}>
                        <Input
                            className="ant-input"
                            placeholder="Billing Zip"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            style={{
                                color: "#000",
                                backgroundColor: "#fff",
                                border: "1px solid #d9d9d9",
                                borderRadius: "5px",
                                fontSize: "14px",
                                height: "50px",
                                padding: "0px 14px"
                            }}
                        />
                        <div className="mt-3">
                            <span className="helper-text" style={{ padding: "0px 10px"}}>
                                Example Billing Zip: XXXXX
                            </span>
                        </div>
                    </Col>
                </Row>

                <SubmitPayment/>
            </PayPalCardFieldsProvider>
        </PayPalScriptProvider>
    );
}
const SubmitPayment = () => {
    const { cardFieldsForm } = usePayPalCardFields();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleClick = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
    
        try {
            const formState = await cardFieldsForm.getState();
            if (!formState.isFormValid) {
                alert("The payment form is invalid");
                return;
            }
            const res = await cardFieldsForm.submit();
            // handle successful response here
        } catch (err) {
            console.error("Payment error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <button
            className={"btn btn-primary"}
            disabled={isSubmitting}
            onClick={handleClick}
        >
            {isSubmitting ? "Processing..." : "Pay"}
        </button>
    );
}