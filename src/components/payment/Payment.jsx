import React, { useEffect, useState } from 'react'
import './Payment.css';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from '../checkoutProduct/CheckoutProduct'
import { Link, useHistory } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";

import CurrencyFormat from "react-currency-format"
import { getBasketTotal } from '../context/reduser';
import axios from '../../axios';
import { db } from '../../firebase'

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState();

    const history = useHistory();

    useEffect(() => {
        //generate the spical stripe secret which allows us to charge a customer

        const getClientSecret = async () => {
            const response = await axios({
                method: "post",
                // stipe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret);
            return response;

        };

        getClientSecret();
    }, [basket])

    // console.log('THE SECRET IS >>', clientSecret)


    const handleSubmit = async (event) => {

        event.preventDefault();

        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        }).then(({ paymentIntent }) => {
            //paymentIntent = payment confirmation

            const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
            /*  db
              .collection("users")
              .doc(user?.uid)
              .collection("orders")
              .doc(paymentIntent.id)*/
            setDoc(ref, {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            });

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            });

            history.replace('/orders');
        });

    };

    const handleChange =( e )=> {

        //listen for changes in the cardElement
        // & display any errors as the customer types their card detials
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");

    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                 Checkout (<Link to="/checkout">{basket?.length} items</Link> )
                </h1>

                {/*payment section - delivery address */}
                <div className="payement__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React app</p>
                        <p>123 saudi Arabia</p>
                    </div>

                </div>

                {/*payment section - Review Items */}
                <div className="payement__section">
                    <div className="payment__title">
                        <h3>Review items & dilivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}

                    </div>


                </div>

                {/*payment section - Payment Method */}
                <div className="payement__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payement__details">

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (

                                        <h3>Order Total: {value} </h3>

                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />

                                <button type="submit" disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p> Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/*errors*/}

                            {error && <div>{error}</div>}
                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Payment
