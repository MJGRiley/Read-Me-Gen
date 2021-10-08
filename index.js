// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const {generateMarkdown,generateMarkdownTwo,licenseIcons} = require('./utils/generateMarkdown')
let data = ''

// TODO: Create an array of questions for user input
function askAway() {
    const pQs = [
        {
        type: 'input',
        message: 'What is your title of your Project?',
        name: 'title',
        },{
        type: 'input',
        message: 'Please write a short description of your project?',
        name: 'description',
        },{
        type: 'confirm',
        message: 'Do you want a table of contents?',
        name: 'table',
        },{
        type: 'checkbox',
        message: 'Which licenses do you want to include?',
        name: 'licenses',
        choices: ['MIT', 'Apache 2.0', 'GPLv3', 'BSD 3-Clause'],
        }
        
    ]
    inquirer
        .prompt(pQs)
        .then((answers) => {
            data = generateMarkdown(answers) + licenseIcons(answers.licenses)
            if (answers.table){tOC()}
        })
}
askAway()

function tOC() {
    let secNames = []
    const sectionQs = []
    const contentQs = []
    const tOCQs = [
        {
            type: 'number',
            message: 'How many sections do you need?',
            name: 'howMany',
        },
    ]
    inquirer
        .prompt(tOCQs)
        .then((answers) => {
            for(i=0;i<answers.howMany;i++) {
                let temp = {type:'suggest',message:'Title for section '+(i+1),name:'section' + (i+1),suggestions:['Description', 'Installation', 'Usage', 'Contributing','Tests']}
                contentQs.push(temp)
            }
            inquirer
                .prompt(contentQs)
                .then((answers) =>{ 
                    secNames = (Object.values(answers))
                    for (const answer of secNames) {
                        let temp = {type:'input',message:`What content do you want for ${answer}`,name:`${answer}` }
                        sectionQs.push(temp)
                    }
                })
                .then(() => {
                    inquirer
                        .prompt(sectionQs)
                        .then((answers) => {
                            data = data.concat(`## Table of Contents\n`)
                            let temp = (Object.values(answers))
                            secNames.forEach(elem => data = data.concat(`- [${elem}](#${elem.toLowerCase().trim()})\n`))
                            for (const [i,answer] of secNames.entries()) {
                                let tempTwo = generateMarkdownTwo(answer,temp[i])
                                data = data.concat(tempTwo)
                            }
                            appendLicenses(data)
                            printThatBOut(data)
                        })
                    })
        })
}
const appendLicenses = (data) => {
    inquirer
}

// TODO: Create a function to write README file
const printThatBOut = (data) => {
    fs.writeFile('highQualityProfessionalREADME.md', data, err => {
        if (err) {
            console.error(err)
            return
        }
    //file written successfully
    })
}
// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();


// sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README
// What was your motivation?
// Why did you build this project? 
// What problem does it solve?
// What did you learn?
// What makes your project stand out?