const Article = require('../models/Article');
const Edit = require('../models/Edit');

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

async function getAllArticles(req, res) {
    let articles;

    try {
        articles = await Article.find().sort('title');
    } catch (err) {
        console.log(err);
        res.locals.error = 'An error occurred while getting articles from db!';
        return res.render('errors/server-error');
    }

    res.locals.articles = articles;
    res.render('article/list-all');
}

async function getCreateForm(req, res) {
    res.render('article/create');
}

async function createArticle(req, res) {
    let articleData = req.body;
    let title = articleData.title;
    let content = articleData.content;
    let currentUser = req.user;

    let hasErrors = false;
    let errors = {};

    if (!title || title.length === 0) {
        hasErrors = true;
        errors.title = 'The title is required!';
    }

    if (!content || content.length === 0) {
        hasErrors = true;
        errors.content = 'The content is required!';
    }

    if (hasErrors) {
        res.locals.hasErrors = hasErrors;
        res.locals.errors = errors;
        res.locals.data = articleData;
        return res.render('article/create');
    }

    let article;
    let edit;

    try {
        article = await Article.create({
            title: title,
            creationDate: Date.now()
        });
    } catch (err) {
        console.log(err);
        res.locals.error = 'Error occurred while creating an article!';
        return res.render('errors/server-error');
    }

    try {
        edit = await Edit.create({
            author: currentUser._id,
            creationDate: Date.now(),
            content: content,
            articleId: article._id
        });
    } catch (err) {
        console.log(err);
        res.locals.error = 'Error occurred while creating an edit!';
        return res.render('errors/server-error');
    }

    article.edits.push(edit._id);
    try {
        await article.save();
    } catch (err) {
        console.log(err);
        res.locals.error = 'Error occurred while updating an article!';
        return res.render('errors/server-error');
    }

    res.redirect('/');
}

async function showArticleDetails(req, res) {
    let currentUser = req.user;
    let id = req.params.id;
    let article;

    try {
        article = await Article.findById(id);
    } catch (err) {
        console.log(err);
        res.locals.error = 'An error occurred while getting an article!';
        return res.render('errors/server-error');
    }

    if (!article) {
        res.locals.error = 'This article does not exist!';
        return res.render('errors/page-not-found');
    }

    let edit;
    let lastEditId = article.edits[article.edits.length - 1];

    try {
        edit = await Edit.findById(lastEditId);
    } catch (err) {
        console.log(err);
        res.locals.error = 'An error occurred while getting the last edit!';
        return res.render('errors/server-error');
    }

    if (!edit) {
        res.locals.error = 'This edit does not exist!';
        return res.render('errors/page-not-found');
    }

    let isEditable = false;

    if (currentUser) {
        if (currentUser.roles.includes('Admin')) {
            isEditable = true;
        } else if (!article.isLocked) {
            isEditable = true;
        }
    }

    let paragraphs = edit.content.split('\r\n').filter(el => el !== '');
    let reformatedArticle = {};
    reformatedArticle.title = article.title;
    reformatedArticle.paragraphs = paragraphs;
    reformatedArticle.id = article.id;
    reformatedArticle.isEditable = isEditable;

    res.locals.article = reformatedArticle;
    res.render('article/details');
}

async function showArticleToEdit(req, res) {
    let currentUser = req.user;
    let id = req.params.id;
    let article;

    try {
        article = await Article.findById(id);
    } catch (err) {
        console.log(err);
        res.locals.error = 'An error occurred while getting article from db!';
        return res.render('errors/server-error');
    }

    if (!article) {
        res.locals.error = 'This article does not exist!';
        return res.render('errors/page-not-found');
    }

    let edit;
    let lastEditId = article.edits[article.edits.length - 1];

    try {
        edit = await Edit.findById(lastEditId);
    } catch (err) {
        console.log(err);
        res.locals.error = 'An error occurred while getting the last edit!';
        return res.render('errors/server-error');
    }

    if (!edit) {
        res.locals.error = 'This edit does not exist!';
        return res.render('errors/page-not-found');
    }

    let isEditable = false;

    if (currentUser) {
        if (currentUser.roles.includes('Admin')) {
            isEditable = true;
        } else if (!article.isLocked) {
            isEditable = true;
        }
    }

    if (isEditable) {

        let reformatedArticle = {};
        reformatedArticle.title = article.title;
        reformatedArticle.content = edit.content;
        reformatedArticle.id = article._id;
        reformatedArticle.isLocked = article.isLocked;

        res.locals.article = reformatedArticle;
        return res.render('article/edit');
    }

    return res.redirect('/');
}

async function editArticle(req, res) {
    let currentUser = req.user;
    let id = req.params.id;
    let content = req.body.content;
    let article;

    let hasErrors = false;
    let errors = {};
    let data;

    try {
        article = await Article.findById(id);
    } catch (err) {
        console.log(err);
        res.locals.error = 'An error occurred while getting article from db!';
        return res.render('errors/server-error');
    }

    if (!article) {
        res.locals.error = 'This article does not exist!';
        return res.render('errors/page-not-found');
    }

    if (!content || content.length === 0) {
        hasErrors = true;
        errors.content = 'The content is required!';
    }

    data = {
        content: req.body.content,
        title: article.title,
        id: article._id,
        isLocked: article.isLocked
    };

    if (hasErrors) {
        res.locals.hasErrors = hasErrors;
        res.locals.errors = errors;
        res.locals.article = data;
        return res.render('article/edit');
    }

    let edit;

    try {
        edit = await Edit.create({
            author: currentUser._id,
            creationDate: Date.now(),
            content: content,
            articleId: article._id
        })
    } catch (err) {
        console.log(err);
        res.locals.error = 'An error occurred while creating new edit!';
        return res.render('errors/server-error');
    }

    article.edits.push(edit._id);

    try {
        await article.save();
    } catch (err) {
        console.log(err);
        res.locals.error = 'An error occurred while saving the new edit!';
        return res.render('errors/server-error');
    }
    res.redirect('/articles');
}

async function lockArticle(req, res) {
    let id = req.params.id;
    let article;

    try {
        article = await Article.findById(id);
    } catch (err) {
        console.log(err);
        res.locals.error = 'An error occurred while getting an article!';
        return res.render('errors/server-error');
    }

    if (!article) {
        res.locals.error = 'This article does not exist!';
        return res.render('errors/page-not-found');
    }

    article.isLocked = !article.isLocked;

    try {
        await article.save();
    } catch (err) {
        console.log(err);
        res.locals.error = 'An error occurred while locking/unlocking an article!';
        return res.render('errors/server-error');
    }

    res.redirect('/articles');
}

async function showArticleHistory(req, res) {
    let id = req.params.id;
    let article;

    try {
        article = await Article.findById(id);
    } catch (err) {
        console.log(err);
        res.locals.error = 'An error occurred while getting an article!';
        return res.render('errors/server-error');
    }

    if (!article) {
        res.locals.error = 'This article does not exist!';
        return res.render('errors/page-not-found');
    }

    let edits;

    try {
        edits = await Edit.find({ articleId: article._id}).sort('-creationDate').populate('author');
    } catch(err) {
        console.log(err);
        res.locals.error = 'An error occurred while getting all edits of an article!';
    }
    let reformatedEdits = [];

    for (let edit of edits) {
        let date = edit.creationDate;
        let hours = date.getHours();
        let minutes = date.getMinutes();

        let day = date.getDate();
        let month = monthNames[date.getMonth()];
        let year = date.getFullYear();
 
        reformatedEdits.push({
            id: edit._id,
            time: `${hours}:${minutes}`,
            date: `${day} ${month} ${year}`,
            author: edit.author.name
        });
    }

    res.locals.edits = reformatedEdits;
    res.render('article/history');
}

async function showEditReview(req, res) {
    let id = req.params.id;
    let edit;

    try {
        edit = await Edit.findById(id);
    } catch(err) {
        console.log(err);
        res.locals.error = 'An error occurred while getting an edit!';
        return res.render('errors/server-error');
    }

    if(!edit) {
        res.locals.error = 'This edit does not exist!';
        return res.render('errors/page-not-found');
    }

    let article;

    try {
        article = await Article.findById(edit.articleId);
    } catch(err) {
        console.log(err);
        res.locals.error = 'An error occurred while getting an article!';
        return res.render('errors/server-error');
    }

    if(!article) {
        res.locals.error = 'This article does not exist!';
        return res.render('errors/page-not-found');
    }


    let paragraphs = edit.content.split('\r\n').filter(el => el !== '');
    let reformatedArticle = {};
    reformatedArticle.title = article.title;
    reformatedArticle.paragraphs = paragraphs;
    reformatedArticle.id = article.id;

    res.locals.article = reformatedArticle;
    res.render('article/review');
}

module.exports = {
    getAllArticles: getAllArticles,
    getCreateForm: getCreateForm,
    createArticle: createArticle,
    showArticleDetails: showArticleDetails,
    showArticleToEdit: showArticleToEdit,
    editArticle: editArticle,
    lockArticle: lockArticle,
    showArticleHistory: showArticleHistory,
    showEditReview: showEditReview
};
