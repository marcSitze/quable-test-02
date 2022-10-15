import React from 'react'

function TableItem({ product }) {
  console.log('product: ', product)
  const { attributes } = product
  return (
    <tr>
        <td>{attributes?.product_name?.en_GB}</td>
        <td><div dangerouslySetInnerHTML={{ __html: attributes?.product_amazon_desc?.en_GB }}/></td>
        <td>{attributes?.product_brand ? attributes?.product_brand[0]?.labels?.en_GB : ""}</td>
        <td>{attributes?.product_type? attributes?.product_type[0]?.labels.en_GB: ""}</td>
        <td>{attributes?.created_at}</td>
      </tr>
  )
}

export default TableItem