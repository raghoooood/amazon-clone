import React, { useEffect, useState } from 'react'
import './Orders.css';
import { db } from '../../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useStateValue } from '../StateProvider';
import Order from '../order/Order';


function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {

            /* const collRef = collection(db, "users", user?.uid, "orders");
             const orderRef = query(collRef, orderBy("created", "desc"));
             onSnapshot(orderRef, (QuerySnapshot)=> {
                 setOrders(QuerySnapshot.docs.map((doc) => ({
                      id: doc.id,
                 data: doc.data()
                 }))
                 );
             });*/

            db.collection('users')
                .doc(user?.uid)
                .orderBy('created', 'desc')
                .onSnapshot(onSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })))
        } else {
            setOrders([]);
        }

    }, [user])

    return (
        <div className="orders">
            <h1>Your Orders</h1>

            <div className="orders__order">
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders