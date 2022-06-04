const puppeteer = require("puppeteer");
const readline = require('readline');
const colors = require('colors')
const fs = require('fs');
const { getPackedSettings } = require("http2");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Veuillez mettre le lien du site web: ".green, function(reponse) {
    run(reponse)
})

async function run(url) {
 
    let browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser'
      })
    let page = await browser.newPage();
    await page.goto(url).then(async p => {
        fs.writeFileSync(`copie.html`, await page.content())
        console.log(`La page web: ${url} a bien été copier dans le fichier  (file:///home/pi/Desktop/copie.html dans le navigateur)`)
    }).catch(error => {
        console.log(error)
        return console.log("Lien invalide".red)
    })
    process.exit(1)
}

