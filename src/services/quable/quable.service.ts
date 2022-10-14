import axios from "axios";

import { config } from "../../common/config";
import { IQuableProduct } from '../quable/quable.types'

const { HOST, TOKEN } = config.quable;

let headersList = {
  Accept: "*/*",
  Authorization: `Bearer ${TOKEN}`,
};

export const getProducts = async () => {
  let reqOptions = {
    url: `${HOST}/api/documents`,
    method: "GET",
    headers: headersList,
  };

  let result: any = await axios.request(reqOptions);
  return result.data
};

export function adaptQuableProduct({attributes}: IQuableProduct) {
  return Object.freeze({
      title: attributes.product_name,
      body_html: attributes.product_amazon_desc,
      vendor: attributes.product_brand,
      product_type: attributes.product_type
  })
}

export default { getProducts, adaptQuableProduct }