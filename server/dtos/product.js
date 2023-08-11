class ProductDTO {
  constructor(product) {
    this._id = product._id;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.brand = product.brand;
    this.category = product.category;
    this.totalStock = product.totalStock;
    this.available = product.available;
    this.images = product.images;
    this.discountPercentage = product.discountPercentage;
  }
}

module.exports = ProductDTO;
