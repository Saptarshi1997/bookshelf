const fs = require('fs');
const axios = require('axios');
const { promisify } = require('util');
const path = require('path');


function getRootDirectory() {
    let currentDir = __dirname;
    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
        currentDir = path.dirname(currentDir);
    }
    return currentDir;
}

const rootDir = getRootDirectory();

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

async function fetchAndWritePages() {
    try {
        // getting the urls.txt directory
        const filePath = path.join(rootDir, 'public', 'docs', 'urls.txt');

        // getting the urls as string
        const urls = await readFileAsync(filePath, 'utf-8');

        // make the strings into array
        const urlList = urls.split('\n').map(url => url.trim()).filter(Boolean);

        const promises = urlList.map(async (url, index) => {
            try {

                // getting the content from the url
                const response = await axios.get(url);
                return { content: response.data, index: index + 1 };
            } catch (error) {
                console.error(`Failed to fetch ${url}: ${error.message}`);
                return null;
            }
        });

        const contents = await Promise.all(promises);

        // generate the html file with the content that is taken from the url
        contents.forEach(async ({ content, index }) => {
            try {
                const pageFilePath = path.join(rootDir, 'public', 'docs', `page${index}.html`);
                await writeFileAsync(pageFilePath, content);
                console.log(`Page ${index} created successfully.`);
            } catch (error) {
                console.error(`Failed to write page${index}.html: ${error.message}`);
            }
        });

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

module.exports = { fetchAndWritePages };
