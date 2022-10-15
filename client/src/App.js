import React, { useContext, useEffect } from 'react';
import './App.css';
import TableItem from './components/TableItem';
import Spinner from './components/Spinner';
import { productsContext } from './context/products/productsContext'

function App() {
  const { products, getProducts, loading } = useContext(productsContext)

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
  }, [loading])

  // console.log('Products: ', products)
  // console.log('loading: ', loading)
  return (
    <div className="App">
      <p>Quable Product list</p>
      {loading && <Spinner />}
      <table>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Vendor</th>
          <th>Type</th>
          <th>Created at</th>
        </tr>
      {products.map((product, index) => <TableItem product={product} key={index} />)}
      </table>
    </div>
  );
}

export default App;