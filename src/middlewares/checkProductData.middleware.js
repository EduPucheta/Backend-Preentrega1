export const checkProductData = async (req, res, next) => {
  try {
    const { title, description, price, code, stock, category } = req.body;
    const newProduct = {
      title,
      description,
      price,
      code,
      stock,
      category,
    };

    if (Object.values(newProduct).includes(undefined)) {
      return res
        .status(400)
        .json({ status: "error", msg: "Todos los campos son obligatorios" });
    }

    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
};
