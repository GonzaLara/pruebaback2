import cartsService from "../services/carts.service.js";

class CartsController {
  constructor() {
    this.service = cartsService;
  }

  createOne = async (req, res) => {
    const data = {
      user_id: req.user._id,
      product_id: req.body.product_id,
      quantity: parseInt(req.body.quantity) || 1,
    };
    const created = await this.service.createOne(data);
    res.json201(created);
  };

  readAll = async (req, res) => {
    const filter = { user_id: req.user._id };
    const items = await this.service.readAll(filter);
    if (items.length > 0) {
      res.json200(items);
    } else {
      res.json404("No hay productos en el carrito.");
    }
  };

  destroyById = async (req, res) => {
    const { id } = req.params;
    const deleted = await this.service.destroyById(id);
    if (deleted) {
      res.json200(deleted._id);
    } else {
      res.json404("Producto no encontrado en el carrito.");
    }
  };

  destroyAll = async (req, res) => {
    const filter = { user_id: req.user._id };
    const result = await this.service.destroyAll(filter);
    res.json200(null, "Carrito vaciado");
  };

  updateById = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const updated = await this.service.updateById(id, { quantity });
    if (updated) {
      res.json200(updated);
    } else {
      res.json404("Producto no encontrado para actualizar.");
    }
  };
}

const cartsController = new CartsController();
export default cartsController;
