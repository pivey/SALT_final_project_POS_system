import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TicketItem from './TicketItem';


function OrderForm(props) {
  const context = useContext(AppContext);

  function submitHandler(e) {
    e.preventDefault();
    const data1 = new URLSearchParams();
    data1.append('table_id', document.querySelector('#table_id').value);
    console.log(data1);
    fetch('http://localhost:8000' + '/api/tickets/', {
      method: "POST",
      credentials: "include",
      body: data1
    })
      .then(res => res.json())
      .then(res => {
        const {ticket_id} = res;
        const data = new URLSearchParams();
        const arr = Array.from(document.querySelector('#productsInOrder').children);
        const productList = arr.reduce((acc, e) => {
          acc.push({
            product_id: e.querySelector('.product_id').value,
            quantity: e.querySelector('.quantity').value
          });
          return acc;
        }, []);
        data.append('products', JSON.stringify(productList));

        console.log('submitting form for ticket nr', ticket_id );
        fetch('http://localhost:8000' + `/api/tickets/${ticket_id}`, {
          method: "POST",
          credentials: "include",
          body: data
        })
          .then(res => res.json())
          .then(res => {
            context.setProductInTicket([]);
            console.log(res)});
      });
  }

  return (
    <div id="order-form-div">
      <form id="order-form" onSubmit={submitHandler}>
        <p>Table #</p>
        <input id="table_id" type="number" defaultValue={1} name="table_id"></input>
        <div id="productsInOrder">
          {context.productsInTicket.map(itemId => {
            const product = context.products.results.find(e => e.product_id == itemId);

            return (
                <TicketItem product={product} itemId={itemId}/>
            )
          })}
        </div>
        <input type='submit' value="Send Order"></input>

      </form>
    </div>
  );
}

export default OrderForm;
