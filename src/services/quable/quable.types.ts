export type IProduct = {
    title: string;
    body_html: string;
    vendor: string;
    product_type: string;
    tags: string[];
};

export type IQuableProduct = {
    attributes: {
      product_name: {
        en_GB: string
      },
      product_type: {
        labels: {
          en_GB: string
        }
      }[],
      product_brand: {
        labels: {
          en_GB: string
        }
      }[],
      product_amazon_desc?: {
        en_GB: string
      }
    }
}