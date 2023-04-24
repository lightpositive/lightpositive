const fs = require('fs');
const yaml = require('js-yaml');


// Working with .md files 


// add an array for collect the years from every index.md file

const modifyfiles = function() {

  const yearsAndTitle = [];
  
  const rootDirs = ['src/references/corporate','src/references/festivals'];
  
  for (const rootDir of rootDirs) {
  
    // filter out only the directories (where index.md files live)
    const dirs = fs.readdirSync(rootDir).filter(file => {
      return fs.statSync(`${rootDir}/${file}`).isDirectory();
    });
    
    // read all the index.md files inside all teh directories into an array
    const contents = dirs.map((dir) => {
      return fs.readFileSync(`${rootDir}/${dir}/index.md`, 'utf8')
    })
    
    // convert yaml format array items to objects 
    const ymlContents = contents.map(fileContent => {
      return yaml.loadAll(fileContent);
    });
    
    
    // add year to images url paths
    const updatedUrls = ymlContents.map(fileContent => {
      const yearToAdd = fileContent[0].date.getFullYear()
      const titleToAdd = fileContent[0].title
    
      yearsAndTitle.push({'year': yearToAdd, 'title': titleToAdd});
    
      fileContent[0].coverImage[0] = fileContent[0].coverImage[0].replace(/(uploads\/)/, `$1${yearToAdd}/`);
      fileContent[0].galleryImages = fileContent[0].galleryImages.map(imageUrl => imageUrl.replace(/(uploads\/)/, `$1${yearToAdd}/`))
      return fileContent;
    })
    // console.log(yearsAndTitle)
    
    // convert objects back to yaml format array items 
    const backToYmlContents = updatedUrls.map(fileContent => {
      return '---\n' + yaml.dump(fileContent,{
        flowLevel: 3,
      }).replace(/^(-\s+)/, '').replace(/^  /gm, '').replace('- null','');
    });
    // console.log(corporateBackToYmlContents)
    
    // overwriteing all the index.md files in it's directory
    dirs.map((dir, i) => {
      return fs.writeFile(`${rootDir}/${dir}/index.md`, backToYmlContents[i], (err) => {
        if (err) throw err;
        // console.log(`${rootDir}/${dir}/index.md has been saved!`);
      });
    })
  
  }
  return yearsAndTitle;
}

export {modifyfiles};
