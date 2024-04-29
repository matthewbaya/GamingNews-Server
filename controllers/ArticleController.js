const { Article } = require("../models");
class ArticleController {
  static async postNewArticle(req, res) {
    try {
      let { title, content, imgUrl, categoryId, authorId } = req.body;
      console.log(req.body);
      let article = await Article.create({
        title,
        content,
        imgUrl,
        categoryId,
        authorId,
      });
      res.status(201).json(article);
    } catch (error) {
      console.log(error.name);
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({
          message: error.errors.map((e) => {
            return e.message;
          }),
        });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async getAllArticle(req, res) {
    try {
      res.send("hello");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ArticleController;
