const Joi = require("joi");
const Product = require("../models/product");
const { CLOUD_NAME, API_KEY, API_SECRET } = require("../config/index");
const ProductDTO = require("../dtos/product");

const cloudinary = require("cloudinary").v2;

const mongodbIdPattren = /^[0-9a-fA-F]{24}$/;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const productController = {
  // create
  async create(req, res, next) {
    const productSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      brand: Joi.string().required(),
      price: Joi.number().required(),
      discountPercentage: Joi.number().required(),
      category: Joi.string().required(),
      totalStock: Joi.number().required(),
      available: Joi.string().required(),
      images: Joi.required(),
    });

    const { error } = productSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const {
      title,
      description,
      price,
      brand,
      discountPercentage,
      category,
      totalStock,
      images,
      available,
    } = req.body;

    let imagesBuffer;
    try {
      let photos = [...images];
      imagesBuffer = [];

      for (let i = 0; i < photos.length; i++) {
        const response = await cloudinary.uploader.upload(photos[i], {
          folder: "Restaurant",
        });

        imagesBuffer.push({
          public_id: response.public_id,
          url: response.secure_url,
        });
      }
    } catch (error) {
      return next(error);
    }

    let product;
    try {
      const newProduct = new Product({
        title,
        description,
        price,
        brand,
        discountPercentage,
        category,
        totalStock,
        available,
        images: imagesBuffer,
      });
      product = await newProduct.save();
    } catch (error) {
      return next(error);
    }

    return res
      .status(201)
      .json({ product: product, message: "Successfully Created!" });
  },

  // getAll
  async getAll(req, res, next) {
    try {
      const products = await Product.find({});

      const allProducts = [];

      for (let i = 0; i < products.length; i++) {
        const dto = new ProductDTO(products[i]);
        allProducts.push(dto);
      }

      return res.status(200).json({ product: allProducts });
    } catch (error) {
      return next(error);
    }
  },

  // getById
  async getById(req, res, next) {
    const getByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattren).required(),
    });

    const { error } = getByIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }

    const { id } = req.params;

    let product;
    try {
      product = await Product.findOne({ _id: id });
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ product: product });
  },

  // update
  async update(req, res, next) {
    // const productSchema = Joi.object({
    //   title: Joi.string().required(),
    //   description: Joi.string().required(),
    //   price: Joi.number().required(),
    //   discountPercentage: Joi.number().required(),
    //   rating: Joi.string().required(),
    //   category: Joi.string().required(),
    //   stock: Joi.number().required(),
    //   images: Joi.string().required(),
    // });

    // const { error } = productSchema.validate(req.body);
    // if (error) {
    //   return next(error);
    // }

    const {
      id,
      title,
      description,
      price,
      brand,
      discountPercentage,
      category,
      totalStock,
      images,
      available,
    } = req.body;

    const newImages = images.filter((image) => image.thumbUrl);

    const oldImages = images.filter((image) => image.url);


    const oldImagesSecreUrls = oldImages.map((image) => image.url); 

    try {
      const oldProduct = await Product.findOne({ _id: id });

      const images = oldProduct.images;

      const fileToDelete = images.filter(
        (image) => !oldImagesSecreUrls.includes(image.url)
      );

      fileToDelete.map(async (image) => {
        await cloudinary.uploader.destroy(image.public_id);
      });

      let allImages = [...oldImages];

      for (let index = 0; index < newImages.length; index++) {
        const image = await cloudinary.uploader.upload(
          newImages[index].thumbUrl,
          {
            folder: "Restaurant",
          }
        );

        allImages.push({
          public_id: image.public_id,
          url: image.secure_url,
        });
      }

      let updateData = {
        title,
        description,
        price,
        brand,
        discountPercentage,
        category,
        totalStock,
        images: allImages,
        available,
      };

      await Product.updateOne({_id: id}, updateData);

      return res.status(200).json({ message: 'Successfuly Updated'})

    } catch (error) {
      return next(error);
    }
  },

  //delete
  async deleteById(req, res, next) {
    const idSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattren).required(),
    });

    const { error } = idSchema.validate(req.params);
    if (error) {
      return next(error);
    }

    const { id } = req.params;

    let product;
    try {
      product = await Product.findOne({ _id: id });

      let photos = product.images;

      for (let index = 0; index < photos.length; index++) {
        await cloudinary.uploader.destroy(photos[index].public_id);
        // return res.status(200).json({ message: "Cloud Images Deleted" });
      }
      await Product.deleteOne({ _id: id });
    } catch (error) {
      return next(error);
    }

    res.status(200).json({ message: "Successfully Deleted" });
  },
};

module.exports = productController;
