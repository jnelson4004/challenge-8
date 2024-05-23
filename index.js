const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require("./shapes/shapes.js");

function writeToFile(filename, answers) {
    let svgString = '';
    svgString = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
    svgString += "<g>";
    svgString += `${answers.shape}`;

    let shapeChoice;
    if (answers.shape === "Circle") {
        shapeChoice = new Circle();
        svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeColor}"/>`;
    } else if (answers.shape === "Triangle") {
        shapeChoice = new Triangle();
        svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
    } else {
        shapeChoice = new Square();
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
    }

    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    svgString += "</g>";
    svgString += "</svg>";

    fs.writeFile(filename, svgString, (err) => {
        err ? console.log(err) : console.log("all good hurruh potter");
    });
};

function promptUser() {
    inquirer.prompt([
        {
            type: "list",
            message: "pick shape:",
            choices: ["circle", "triangle", "square"],
            name:"shape",
        },
        {
            type: "input",
            message: "enter shape color:",
            name: "shapeColor",
        },
        {
            type: "input",
            message: "enter text- max three characters:",
            name: "text",
        },
        {
            type: "input",
            message: "enter text color:",
            name: "textColor",
        },
    ])
    .then((answers) => {
        if (answers.text.length > 3) {
            console.log("max three characters");
            promptUser();
        } else {
            writeToFile("logo.svg", answers);
        }
    });
};

promptUser();
