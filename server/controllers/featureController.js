const Food = require("../models/Food");
const User = require("../models/User");
const stripe = require("stripe")(process.env.STRIPE_KEY);
//add to cart
const addToCart = async (req, res) => {
  const userId = req.params.id;
  const { id, name, price, rating, image, quantity } = req.body;

  try {
    let existingItem = await Food.findOne({ id, userId });
    if (existingItem) {
      let updatedItem = await Food.findOneAndUpdate(
        { id, userId },
        {
          $set: {
            quantity: existingItem.quantity + 1,
            totalPrice: existingItem.price * (existingItem.quantity + 1),
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      if (!updatedItem) {
        return res.status(400).json({
          success: false,
          message: "failed to add to cart",
        });
      }
    }

    let newFood = await Food.create({
      id,
      name,
      price,
      rating,
      image,
      quantity,
      userId,
      totalPrice: price * quantity,
    });
    const saveFood = await newFood.save();

    let user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          cartItems: saveFood._id,
        },
      }
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "failed to add to cart",
      });
    }
    return res.status(200).json({
      success: true,
      message: "added to cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  const userId = req.params.id;
  console.log("your user id ",userId)
  try {
    const cartItems = await Food.find({ userId });
      console.log("your card items: " + cartItems)
    if (!cartItems) {
      return res.status(400).json({
        success: false,
        message: "no item in cart",
      });
    }

    return res.status(200).json({
      success: true,
      
      cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//remove from cart
const removeFromCart = async (req, res) => {
  const id = req.params.id;

  try {
    let food = await Food.findOneAndDelete({ _id: id });
    if (!food) {
      return res.status(400).json({
        success: false,
        message: "failed to remove from cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "removed from cart",
      data: food,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const incrementQuantity = async (req, res) => {
  const id = req.params.id;
  try {
    let food = await Food.findOneAndUpdate(
      { _id: id },
      [
        {
        $set: {
          quantity: { $add: ["$quantity", 1] },
          totalPrice: { $multiply: ["$price", { $add: ["$quantity", 1] }] },
        },
      },
    ],

      {
        upsert: true,
        new: true,
      }
    );
    if (!food) {
      return res.status(400).json({
        success: false,
        message: "failed to increment quantity",
      });
    }

    return res.status(200).json({
      success: true,
      message: "incremented food quantity",
      data: food,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const decrementQuantity = async (req, res) => {
  const id = req.params.id;

  try {
    let food = await Food.findOneAndUpdate(
      { _id: id, quantity: { $gt: 0 } },
      [{
        $set: {
          quantity: { $subtract: ["$quantity", 1] },
          totalPrice: { $subtract: ["$totalPrice", "$price"] },
        },
      },],
      {
        upsert: true,
        new: true,
      }
    );
    if (!food) {
      return res.status(400).json({
        success: false,
        message: "failed to decrement quantity",
      });
    }

    return res.status(200).json({
      success: true,
      message: "decremented food quantity",
      data: food,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//checkout route
const checkout = async (req, res) => {
  const userId = req.id;
  try {
    const cartItems = await Food.find({
      userId,
    });
     
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => {
        return {
          
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "https://glamour-food-app1.vercel.app/success",
      cancel_url: "https://glamour-food-app1.vercel.app/",
    });
    res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const clearCart = async (req, res) => {
  const userId = req.id;

  try {
    const deletedItem = await Food.deleteMany({ userId });
    const deletedList = await User.findOneAndUpdate(
      { _id: userId },
      {
        cartItems: [],
      }
    );

    if (!deletedItem) {
      return res.status(400).json({
        success: false,
        message: "failed to clear cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "cleared cart",
      data: deletedList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  checkout,
  clearCart,
};
