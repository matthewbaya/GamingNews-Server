const { Article, Category, User } = require("../models");
const { Op } = require("sequelize");
var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
class ArticleController {
  static async postNewArticle(req, res, next) {
    try {
      let { title, content, imgUrl, categoryId } = req.body;
      console.log(req.body);
      let article = await Article.create({
        title,
        content,
        imgUrl,
        categoryId,
        authorId: req.user.id,
      });
      res.status(201).json(article);
    } catch (error) {
      next(error);
    }
  }

  static async getAllArticles(req, res, next) {
    try {
      let articles = await Article.findAll({
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: User,
            attributes: ["username", "email", "phoneNumber", "address"],
          },
        ],
      });

      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getArticleById(req, res, next) {
    try {
      let article = await Article.findByPk(req.params.id, {
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: User,
            attributes: ["username", "email", "phoneNumber", "address"],
          },
        ],
      });

      if (!article) {
        throw { name: "InvalidData" };
      }
      res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }

  static async updateArticleById(req, res, next) {
    try {
      let { title, content, imgUrl, categoryId } = req.body;
      let article = await Article.findByPk(req.params.id);
      if (!article) {
        throw { name: "InvalidData" };
      }
      await Article.update(
        {
          title,
          content,
          imgUrl,
          categoryId,
        },
        { where: { id: req.params.id } }
      );
      res.status(200).json({ message: "Data has been updated" });
    } catch (error) {
      next(error);
    }
  }

  static async updateArticleImage(req, res, next) {
    try {
      // let { title, content, imgUrl, categoryId, authorId } = req.body;
      let article = await Article.findByPk(req.params.id);
      if (!article) {
        throw { name: "InvalidData" };
      }
      if (!req.file) {
        throw { name: "FileError" };
      }
      const buffer = req.file.buffer.toString("base64");
      const base64 = `data:${req.file.mimetype};base64,${buffer}`;

      let result = await cloudinary.uploader.upload(base64);
      console.log(result);
      await article.update({ imgUrl: result.url });
      res.status(200).json({
        message: `Image of article with id ${req.params.id} has been updated`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteArticleById(req, res, next) {
    try {
      let article = await Article.findByPk(req.params.id);
      if (!article) {
        throw { name: "InvalidData" };
      }
      await article.destroy();
      res.status(200).json({
        message: `Article with id ${req.params.id} successfully deleted`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPublicArticles(req, res, next) {
    try {
      const { categoryId, titleSearch, sort, page } = req.query;
      const paramsQuerySQL = {};
      // if (categoryId) {
      //   paramsQuerySQL.where = { categoryId };
      // }
      if (titleSearch) {
        paramsQuerySQL.where = { title: { [Op.iLike]: `%${titleSearch}%` } };
      }
      if (sort) {
        const ordering = sort[0] === "-" ? "DESC" : "ASC";
        const columnName = ordering === "DESC" ? sort.slice(1) : sort;
        paramsQuerySQL.order = [[columnName, ordering]];
      }

      //pagination
      //page.number = halaman
      //page.size = limit data per halaman
      if (page) {
        let limit = 10;
        let pageNumber = page.number || 1;
        if (page.size) {
          limit = page.size;
          paramsQuerySQL.limit = limit;
        }

        if (page.number) {
          paramsQuerySQL.offset = limit * (pageNumber - 1);
        }
        const { count, rows } = await Article.findAndCountAll(paramsQuerySQL);
        res.status(200).json({
          page: pageNumber,
          data: rows,
          totalData: count,
          totalPage: Math.ceil(count / limit),
          dataPerPage: limit,
        });
      }

      let articles = await Article.findAll(paramsQuerySQL);
      res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  }

  static async getPublicArticleById(req, res, next) {
    try {
      let article = await Article.findByPk(req.params.id);
      if (!article) {
        throw { name: "InvalidData" };
      }
      res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ArticleController;
