const { Article } = require("../models");
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
      let articles = await Article.findAll();
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getArticleById(req, res, next) {
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

  static async updateArticleById(req, res, next) {
    try {
      let { title, content, imgUrl, categoryId, authorId } = req.body;
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
          authorId,
        },
        { where: { id: req.params.id } }
      );
      res.status(200).json({ message: "Data has been updated" });
    } catch (error) {
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
        message: `Article with id ${req.params.id} succesfully deleted`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPublicArticles(req, res, next) {
    try {
      let articles = await Article.findAll();
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
