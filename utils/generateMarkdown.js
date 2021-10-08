// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function licenseIcons(licenses) {
  let temp = ''
  if (licenses.includes('MIT')) {temp = temp.concat('[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n')}
  if (licenses.includes('Apache 2.0')) {temp = temp.concat('[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)\n')}
  if (licenses.includes('GPLv3')) {temp = temp.concat('[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)\n')}
  if (licenses.includes('BSD 3-Clause')) {temp = temp.concat('[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)\n')}
  return temp
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

## Description
${data.description}

`;
}

function generateMarkdownTwo(title,data) {
  return `
## ${title}
${data}`;
}
module.exports = {generateMarkdown,generateMarkdownTwo,licenseIcons}
