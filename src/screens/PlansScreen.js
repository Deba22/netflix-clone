import React, { useState, useEffect } from 'react'
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import './PlansScreen.css'
import { loadStripe } from "@stripe/stripe-js"
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSubscription } from '../features/subsSlice';

function PlansScreen() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [subscription, setSubscription] = useState(null);
    useEffect(() => {
        db.collection("customers").doc(user.uid).collection("subscriptions").get().then((querySnapshot) => {
            querySnapshot.forEach(async (subscription) => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })

            })
        })

    }, [user.uid])

    useEffect(() => {
        console.log("fireddd");
        if (subscription) {
            console.log("subs is thereeeee");
            dispatch(
                setCurrentSubscription(subscription)
            );
        }
        console.log("nnnnot sureee");
    }, [subscription])

    useEffect(() => {
        db.collection('products').where("active", "==", true).get()
            .then((querySnapshot) => {
                const products = {};
                querySnapshot.forEach(async (productDoc) => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection("prices").get();
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        }
                    })
                })
                setProducts(products);
            })
    }, [])

    console.log(products);
    console.log(subscription);
    const loadCheckout = async (priceId) => {
        const docRef = await db.collection("customers").doc(user.uid).collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            });
        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                //Show an error to the customer
                //inspect your cloud function logs in the firebase console
                alert(`An error occurred: ${error.message}`);
            }
            if (sessionId) {
                //we have a session, lets redirect to checkout
                //Init Stripe
                const stripe = await loadStripe('pk_test_51I5uSFKSw31fJXZ7E6Somdxa4MbsJtcPKUB0TXoDnV1kzKx4SiC2umnfW5C2ZJJC4HR75r3Ngi5HWf054679muKQ00IlyT8uR5');
                stripe.redirectToCheckout({ sessionId });

            }
        })
    }

    return (
        <div className="plansScreen">
            <br />
            {
                subscription ? (<p>
                    Renewal date:{" "} {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}
                </p>) : null

            }

            {Object.entries(products).map(([productId, productData]) => {
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
                return (
                    <div key={productId} className={`${isCurrentPackage && "plansScreen__plan__disabled"} plansScreen__plan`}>
                        <div className="plansScreen__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button className="plansScreen__button" onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>{isCurrentPackage ? "Current Package" : "Subscribe"}</button>
                    </div>
                );
            })}
        </div>
    )
}

export default PlansScreen
