const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const rootDirFestivals = 'src/references/festivals';
const rootDirCorporate = 'src/references/corporate';

const festivalDirs = fs.readdirSync(rootDirFestivals).filter(file => {
    return fs.statSync(`${rootDirFestivals}/${file}`).isDirectory();
  });

const corporateDirs = fs.readdirSync(rootDirCorporate).filter(file => {
    return fs.statSync(`${rootDirCorporate}/${file}`).isDirectory();
  });


const festivalContents = festivalDirs.map((dir) => {
    return fs.readFileSync(`${rootDirFestivals}/${dir}/index.md`, 'utf8')
})

const corporateContents = corporateDirs.map((dir) => {
    return fs.readFileSync(`${rootDirCorporate}/${dir}/index.md`, 'utf8')
})

const festivalYmlContents = festivalContents.map(fileContent => {
    return yaml.loadAll(fileContent);
});

const corporateYmlContents = corporateContents.map(fileContent => {
    return yaml.loadAll(fileContent);
});

// corporateYmlContents.forEach(e => console.log(e[0].date.getFullYear()))
const corporateUpdatedUrls = corporateYmlContents.map(fileContent => {
    const yearToAdd = fileContent[0].date.getFullYear()
    fileContent[0].coverImage[0] = fileContent[0].coverImage[0].replace(/(uploads\/)/, `$1${yearToAdd}/`);
    fileContent[0].galleryImages = fileContent[0].galleryImages.map(imageUrl => imageUrl.replace(/(uploads\/)/, `$1${yearToAdd}/`))
    return fileContent;
})
const festivalUpdatedUrls = festivalYmlContents.map(fileContent => {
    const yearToAdd = fileContent[0].date.getFullYear()
    fileContent[0].coverImage[0] = fileContent[0].coverImage[0].replace(/(uploads\/)/, `$1${yearToAdd}/`);
    fileContent[0].galleryImages = fileContent[0].galleryImages.map(imageUrl => imageUrl.replace(/(uploads\/)/, `$1${yearToAdd}/`))
    return fileContent;
})
console.log(festivalUpdatedUrls[0][0])
console.log(corporateUpdatedUrls[0][0])
