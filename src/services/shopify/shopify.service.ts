import Shopify, { ApiVersion, AuthQuery, DataType } from '@shopify/shopify-api';

import { config } from '../../common/config';
import { adaptQuableProduct } from '../quable/quable.service';
import { IQuableProduct } from '../quable/quable.types'

const { SHOP } = config

export const getProducts = async () => {
  const session = await Shopify.Utils.loadOfflineSession(SHOP);
  // console.log('Session: ', session)
  const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
  const response: any = await client.get({
    path: 'products',
  });

  if(!response) {
    return {
      success: false,
      data: response
    }
  }

  return { success: true, data: response }
}

export const addProduct = async (products: IQuableProduct[]) => {
  const session = await Shopify.Utils.loadOfflineSession(SHOP);

  const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
  products.filter(product => product.attributes.product_name && product.attributes.product_name.en_GB.length > 0).forEach(async product => {
    console.log('ADAPTPROD: ', adaptQuableProduct(product))
     const response = await client.post({
      path: 'products',
      data: {product: {
        title: adaptQuableProduct(product).title ? adaptQuableProduct(product).title.en_GB: "",
        body_html: adaptQuableProduct(product).body_html ?adaptQuableProduct(product).body_html.en_GB: "",
        vendor: adaptQuableProduct(product).vendor ? adaptQuableProduct(product).vendor[0].labels.en_GB: "",
        product_type: adaptQuableProduct(product).product_type ?adaptQuableProduct(product).product_type[0].labels.en_GB: ""
      }},
      type: DataType.JSON
    });
    // if(!response) return { success: false}
  })

  return { success: true }
}

export const adaptProducts = (products: IQuableProduct[]) => {
  let adapted = [...products]
  adapted.filter(({ attributes }) => attributes.product_name && attributes.product_name.en_GB.length > 0).map(({ attributes }) => ({
    ["title"]: attributes.product_name? attributes.product_name.en_GB : "",
    ["body_html"]: attributes.product_amazon_desc? attributes.product_amazon_desc.en_GB: "",
    ["vendor"]: attributes.product_brand? attributes.product_brand[0].labels.en_GB: "",
    ["product_type"]: attributes.product_type? attributes.product_type[0].labels.en_GB: ""
  }))

  return adapted
}
export default { addProduct, getProducts, adaptProducts }