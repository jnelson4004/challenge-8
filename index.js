const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Square, Circle } = require('./shapes/shapes.js');

// Function writes the SVG file using user answers from inquirer prompts

function writeToFile(filename, answers) {
    // File starts as an empty string
    let svgString = '';
    // Sets width and height of logo container
    svgString = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    // <g> tag wraps <text> tag so that the user font input layers on top of the shape (polygon), not behind
    svgString += '<g>';
    // Takes user input for shape choice and inserts it into SVG file
    svgString += `${answers.shape}`;

    // Conditional check takes users input from choices array and adds shape properties and shape color to SVG string
    let shapeChoice;
    if (answers.shape === 'Triangle') {
        shapeChoice = new Triangle();
        svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === 'Square') {
        shapeChoice = new Square();
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
        shapeChoice = new Circle();
        svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }

    // <text> tag for text alignment, content and color taken from user prompt and gives font size of 40
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    // Closing </g> tag
    svgString += '</g>';
    // Closing </svg> tag
    svgString += '</svg>';

    // Using file system module to generate svg file, takes in file name given in the promptUser function, svg string,
    // ternary operator which handles logging errors and console messages
    fs.writeFile(filename, svgString, (err) => {
        err ? console.log(err) : console.log('Generated logo.svg');
    });
}


// Function uses inquirer .prompt to prompt the user to answer questions in the CLI and save user input

function promptUser() {
    inquirer.prompt([
        // Text prompt for user input
        {
            type: 'list',
            message: 'What shape would you like the logo to render?',
            choices: ['Triangle', 'Square', 'Circle'],
            name:'shape',
        },
        // Shape color prompt for user input
        {
            type: 'input',
            message: 'What color would you like the shape to be? (enter color keyword OR a hexadecimal number)',
            name: 'shapeBackgroundColor',
        },
        // Text prompt
        {
            type: 'input',
            message: 'What text would you like the logo to display? (enter up to three characters)',
            name: 'text',
        },
        // Text color prompt
        {
            type: 'input',
            message: 'What color would you like the text to be? (enter color keyword OR a hexadecimal number)',
            name: 'textColor',
        },
    ])
    .then((answers) => {
        // Error handling for text prompt (user must enter 3 characters or less for logo to generate)
        if (answers.text.length > 3) {
            console.log('Error: Text must be 3 characters or less');
            promptUser();
        } else {
            // Calling write file function to generate SVG file
            writeToFile('logo.svg', answers);
        }
    });
}
   

// Calling promptUser function so inquirer prompts fire off when app is run

promptUser();