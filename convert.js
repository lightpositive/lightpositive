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

// console.dir(festivalContents, { depth: null, maxArrayLength: null});

// console.dir(corporateContents, { depth: null, maxArrayLength: null});

const festivalYmlContents = festivalContents.map(fileContent => {
    return yaml.loadAll(fileContent);
});

const corporateYmlContents = corporateContents.map(fileContent => {
    return yaml.loadAll(fileContent);
});


// console.dir(festivalYmlContents, { depth: null, maxArrayLength: null});

console.dir(corporateYmlContents, { depth: null, maxArrayLength: null});

