const express = require('express')
const { authCheck } = require("../middlewares/auth");

const router = express.Router()
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUseCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishList,
  createCashOrder
} = require('../controllers/user');

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);
router.post('/user/cart/coupon', authCheck, applyCouponToUseCart);
router.post('/user/order', authCheck, createOrder);
router.post('/user/cash-order', authCheck, createCashOrder);
router.get('/user/orders', authCheck, orders);

router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishList);

//router.get('/user', (req, res) => {
//  res.json({
//     data: 'api user res'
  // })
// })

module.exports = router
