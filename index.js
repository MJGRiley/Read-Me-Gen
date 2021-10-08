// TODO: Include packages needed for this application
const inquirer = require('inquirer')
inquirer.registerPrompt('suggest', require('inquirer-prompt-suggest'))
const fs = require('fs')
const {generateMarkdown,generateMarkdownTwo,licenseIcons,BSD,MIT,GPL,apache} = require('./utils/generateMarkdown')
let licenses = []
let repo = ''
let uName = ''
let userId = ''
let data = ''


// TODO: Create an array of questions for user input
function askAway() {
    const pQs = [
        { //This is the first array of questions the user will be asked
        type: 'input',
        message: 'What\'s your Name?',
        name: 'uName',
        },{
        type: 'input',
        message: 'What\'s your GitHub username?',
        name: 'gHUID',
        },{
        type: 'suggest', //This should give the user a suggestion
        message: 'What\'s your Project\'s Repo\'s name?',
        suggestions: ['Not the full URL'],
        name: 'repo',
        },{
        type: 'input',
        message: 'What\'s the title of your Project?',
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
        type: 'list',
        message: 'Which licenses do you want to include?',
        name: 'licenses',
        choices: ['MIT', 'Apache 2.0', 'GPLv3', 'BSD 3-Clause'],
        }
        
    ]
    inquirer // asks the questions above and returns answers in an object
        .prompt(pQs)
        .then((answers) => {
            licenses = answers.licenses
            repo = answers.repo // pulling out some data for global use
            userId = answers.gHUID
            uName = answers.uName
            data = generateMarkdown(answers) + licenseIcons(licenses)//uses functions in utils folder that have been included up top
            if (answers.table){tOC()}// if the user wants a table of contents this starts that function
        })
}
askAway()

function tOC() {
    let secNames = [] //local scope variables
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
            for(i=0;i<answers.howMany;i++) {//creates as many sections titles as the user wants, supposed to give suggestions
                let temp = {type:'suggest',message:'Title for section '+(i+1),name:'section' + (i+1),suggestions:['Description', 'Installation', 'Usage', 'Contributing','Tests']}
                contentQs.push(temp)//sets up the questions for the next inquirer
            }
            inquirer
                .prompt(contentQs)
                .then((answers) =>{
                    secNames = (Object.values(answers))//takes all the answers and puts them in an array
                    for (const answer of secNames) {//iterates through that array to setup questions for the next inquirer
                        let temp = {type:'input',message:`What content do you want for ${answer}`,name:`${answer}` }
                        sectionQs.push(temp)
                    }
                })
                .then(() => {
                    inquirer
                        .prompt(sectionQs)//asks the final set of questions
                        .then((answers) => {
                            data = data.concat(`\n## Table of Contents\n`) //adds table of contents to the data string
                            let temp = (Object.values(answers)) //takes all the answers just given and puts them in an array
                            secNames.forEach(elem => data = data.concat(`- [${elem}](#${elem.toLowerCase().split(' ').join('')})\n`))
                            data = data.concat(`- [Links](#links)\n`)
                            if (licenses) {data = data.concat(`- [License](#license)\n`)}
                            for (const [i,answer] of secNames.entries()) {//iterates through the sections titles and gives an index
                                let tempTwo = generateMarkdownTwo(answer,temp[i])//uses that index to select corresponding content
                                data = data.concat(tempTwo)//adds it to the data string
                            }
                            appendLicenses(data)
                        })
                })
        })
}
const appendLicenses = (data) => {
    data = data.concat("\n## Links\n")//adds the user's GitHub pages and repo
    data = data.concat(`[GitHub pages](https://${userId}.github.io/${repo})\n`)
    data = data.concat(`[GitHub repo](https://github.com/${userId}/${repo})\n`)
    if (licenses) {//If you requested a license it adds one to the bottom of the README
        data = data.concat("\n## License\n")
        if (licenses.includes('MIT')) {data = data.concat(MIT(uName))} //Licenses added to javascript file to save on space
        if (licenses.includes('Apache 2.0')) {data = data.concat(apache(uName))}
        if (licenses.includes('GPLv3')) {data = data.concat(GPL(uName))}
        if (licenses.includes('BSD 3-Clause')) {data = data.concat(BSD(uName))}
    }
    printThatBOut(data)
}

// TODO: Create a function to write README file
const printThatBOut = (data) => {//this outputs the data to a file, README.md is already taken
    fs.writeFile('highQualityProfessionalREADME.md', data, err => {
        if (err) {
            console.error(err)
            return
        }
    })
}
// TODO: Create a function to initialize app
function init() {}//I didn't know what to put here

// Function call to initialize app
init();