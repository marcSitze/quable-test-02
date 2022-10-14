export const quableProductsToAdd = (previousProducts: any[], newProducts: any[]) => {
    let productsToAdd: any[] = []
    newProducts.forEach((product: any, index) => {
        const result = previousProducts.find(item => item.title == product.attributes.product_name ? product.attributes.product_name["en_GB"]: "")
        if(!result) {
            productsToAdd.push(newProducts[index])
        }
    })

    return productsToAdd
}