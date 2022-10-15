import config from "../common/config";

export const getProducts = async () => {
  try {
    const response = await fetch(`${config.API}/api/products/quable`)
    const result = await response.json()
    // console.log('result: ', result.data)
    return result;
  } catch (error) {
    console.error('errService: ', error)
  }
}
