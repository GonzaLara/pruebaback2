import productsService from "../services/products.service.js";

class ProductsController {
  constructor() {
    this.service = productsService;
  }
  createOne = async (req, res) => {
    const data = req.body;
    const one = await this.service.createOne(data);
    res.json201(one._id);
  };

  readAll = async (req, res) => {
    const filter = req.query;
    const all = await this.service.readAll(filter);
    if (all.lenght > 0) {
      res.json200(all);
    } else {
      res.json404();
    }
  };

  readById = async (req, res) => {
    const { id } = req.params;
    const one = await this.service.readById(id);
    if (one) {
      res.json201(one);
    } else {
      res.json404();
    }
  };

  updateById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const one = await this.service.updateById(id, data);
    if (one) {
      res.json200(one._id);
    } else {
      res.json404();
    }
  };

  destroyById = async (req, res) => {
    const { id } = req.params;
    const one = await this.service.destroyById(id);
    if (one) {
      res.json200(one._id);
    } else {
      res.json404();
    }
  };
}

const productsController = new ProductsController();
export default productsController;
