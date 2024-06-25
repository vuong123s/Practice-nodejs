import express from "express";
import { engine } from 'express-handlebars';
import path from "path"

let configViewEngine = (app) => {
    app.engine('.hbs', engine({ extname: '.hbs' }));
    app.set('view engine', '.hbs');
    app.set('views', path.resolve(__dirname, '../views'));
};

module.exports = configViewEngine;