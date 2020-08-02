const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");
const Choices = require("inquirer/lib/objects/choices");

let employees = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function promptUser() {
    inquirer.prompt([
        {
            message: "What is your team name?",
            name: "teamName"
        }
    ]).then(function(response) {
        const teamName = response.teamName;
        employees.push(teamName);
        addManager();
    })
}

function addManager(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of your team manager?",
            name: "name"
        },{
            type: "input",
            message: "What is your manager's id number?",
            name: "id"
        },{
            type: "input",
            message: "What is your manager's e-mail address?",
            name: "email"
        },{
            type: "input",
            message: "What is your manager's office number?",
            name: "officeNumber"
        }
    ]).then(function(response) {
        const name = response.name;
        const id = response.id;
        const email = response.email;
        const officeNumber = response.officeNumber;
        const teamMember = new Manager(name, id, email, officeNumber)
        employees.push(teamMember)
        addTeamMember();  
    })
}

function addTeamMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "Are there any more team members?",
            choices: [
                "Add an engineer.",
                "Add an intern.",
                "Done adding team members."
            ],
            name: "addMemberChoice"
        }
    ]).then(function(response) {
        switch (response.addMemberChoice) {
            case "Add an engineer.":
                addEngineer();
                break;

            case "Add an intern.":
                addIntern();
                break;
            
            case "Done adding team members.":
                buildTeam();
        }
    })
}
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of this engineer?",
            name: "name"
        },{
            type: "input",
            message: "What is your engineer's id number?",
            name: "id"
        },{
            type: "input",
            message: "What is this engineer's e-mail address?",
            name: "email"
        },{
            type: "input",
            message: "What is this engineer's Github?",
            name: "github"
        },
    ]).then(function(response) {
        const name = response.name;
        const id = response.id;
        const email = response.email;
        const github = response.github;
        const teamMember = new Engineer(name, id, email, github)
        employees.push(teamMember)
        addTeamMember();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of this intern?",
            name: "name"
        },{
            type: "input",
            message: "What is your intern's id number?",
            name: "id"
        },{
            type: "input",
            message: "What is this intern's e-mail address?",
            name: "email"
        },{
            type: "input",
            message: "What is this intern's school?",
            name: "school"
        }
    ]).then(function(response) {
        const name = response.name;
        const id = response.id;
        const email = response.email;
        const school = response.school;
        const teamMember = new Intern(name, id, email, school)
        employees.push(teamMember)
        addTeamMember();
    })
}

function buildTeam() {
    render(employees);
    console.log(employees);
}

promptUser();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
