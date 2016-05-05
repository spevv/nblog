var Bookshelf = require('../lib/connectMySQL');

// Category model
var Category = Bookshelf.Model.extend({
    tableName: 'categories',
    posts: function () {
        return this.hasMany(Post, 'category_id');
    }
});

// Categories Collections
var Categories = Bookshelf.Collection.extend({
    model: Category
});

module.exports.category = Category;
module.exports.categories = Categories;