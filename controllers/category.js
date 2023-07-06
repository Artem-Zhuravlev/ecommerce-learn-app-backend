const Category = require('../models/category');
const Sub = require('../models/sub');
const Product = require('../models/product');

const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new Error('Category already exists');
    }

    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (err) {
    res.status(400).send(err.message || 'Create category failed');
  }
}

exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category }).populate("category").exec();

  res.json({
    category,
    products,
  });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    )

    res.json(updated);
  } catch (err) {
    res.status(400).send('Category update failed');
  }
}

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({slug: req.params.slug});
    res.json(deleted)
  } catch (err) {
    res.status(400).send('Category delete failed');
  }
}

exports.list = async (req, res) => {
  res.json(await Category.find({}).sort({createdAt: -1}).exec());
}

exports.getSubs = async (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err)
    res.json(subs)
  })
}
