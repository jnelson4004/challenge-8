const { Circle, Triangle, Square } = require("./shapes.js");

describe("circle", () => {
    test( () => {
        const shape = new Circle();
        shape.setColor("green");
        expect(shape.render()).toEqual("<circle cx='150' cy='115' r='80' fill='green' />");
    });
});

describe("triangle", () => {
    test( () => {
        const shape = new Triangle();
        shape.setColor("red");
        expect(shape.render()).toEqual("<polygon points='150, 18 244, 182 56, 182' fill='red' />");
    });
});

describe("square", () => {
    test( () => {
        const shape = new Square();
        shape.setColor("blue");
        expect(shape.render()).toEqual("<rect x='73' y='40' width='160' height='160' fill='blue' />");
    });
});