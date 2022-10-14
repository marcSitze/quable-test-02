import { Request, Response } from "express"

import quable from '../services/quable/quable.service'
import shopifyService from '../services/shopify/shopify.service'
import { quableProductsToAdd } from "../common/helper"
import { IProduct } from "../services/quable/quable.types"

export const getProducts = async (req: Request, res: Response) => {
  try {
    const response: any = await shopifyService.getProducts()
    let result: any = await quable.getProducts()
    const productsToAdd = quableProductsToAdd(response.data.body.products, result["hydra:member"])

    if(productsToAdd.length === 0 && response) {
      return res.json({success: true, data: { products: response.data.body.products}});
    }
    const mergeNewProducts = await shopifyService.addProduct(productsToAdd)
    if(!mergeNewProducts.success) {
      return res.json({ success: false, data: { error: "Error while geting new products"}})
    }

    const newProducts = await shopifyService.getProducts()
    if(!newProducts.success) {
      return res.json({ success: false, data: { error: "Error while geting latest products"}})
    }
    res.json({success: true, data: newProducts.data});
  } catch (error) {
    console.error('Some errors: ', error)
  }
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const response: any = await (await shopifyService.getProducts())
    let result: any = await quable.getProducts()
    const quableProducts = shopifyService.adaptProducts(result["hydra:member"])
    console.log('ADAPTEDEDPRODUCTS: ', quableProducts)
    res.json({success: true, data: {products: [...response.data.body.products]}});
  } catch (error) {
    console.error('Some Errors: ', error)
  }
}