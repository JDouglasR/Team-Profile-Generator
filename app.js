// Variables for different filepaths and modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Variables to access path to write a new HTML file to.
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Variable for path to file that renders the HTML.
const render = require("./lib/htmlRenderer");

// Empty array that will take answer objects.
let employees = [];

// This fuction starts the prompts for Manager, pushes an object of responses set in a variables to array, and calls addTeamMemember function.
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
    }).catch(function(err) {
        console.log(err)
    });
};

// This fuction starts the prompt for addTeamMember.  Depending on the answer, it will call either addEngineer, addIntern, or the buildTeam function.
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
    }).catch(function(err) {
        console.log(err)
    });
};

// This fuction starts the prompts for Engineer, pushes an object of responses set in a variables to array, and calls addTeamMemember function.
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
    }).catch(function(err) {
        console.log(err)
    });
};

// This fuction starts the prompts for Intern, pushes an object of responses set in a variables to array, and calls addTeamMemember function.
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
    }).catch(function(err) {
        console.log(err)
    });
};

// This function passes the employees array into the render function and sets the response to a variable. Then, writes the new HTML file to outpath directory.
function buildTeam() {
     const finishedHtml = render(employees);
    fs.writeFileSync(outputPath, finishedHtml);
};

addManager();

