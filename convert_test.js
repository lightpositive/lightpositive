const fs = require('fs');
const yaml = require('js-yaml');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'lightpositive',
  api_key: '994851172912571',
  api_secret: 'VID47dou9Z2Sc832Th_Kn2uxGZU',
});


// Working with .md files 

const rootDirCorporate = 'src/references/corporate';

// filter out only the directories (where index.md files live)
const corporateDirs = fs.readdirSync(rootDirCorporate).filter(file => {
  return fs.statSync(`${rootDirCorporate}/${file}`).isDirectory();
});

// read all the index.md files inside all teh directories into an array
const corporateContents = corporateDirs.map((dir) => {
  return fs.readFileSync(`${rootDirCorporate}/${dir}/index.md`, 'utf8')
})

// convert yaml format array items to objects 
const corporateYmlContents = corporateContents.map(fileContent => {
  return yaml.loadAll(fileContent);
});

// add an array for collect the years from every index.md file
const years = [];

// add year to images url paths
const corporateUpdatedUrls = corporateYmlContents.map(fileContent => {
  const yearToAdd = fileContent[0].date.getFullYear()

  years.push(yearToAdd);

  fileContent[0].coverImage[0] = fileContent[0].coverImage[0].replace(/(uploads\/)/, `$1${yearToAdd}/`);
  fileContent[0].galleryImages = fileContent[0].galleryImages.map(imageUrl => imageUrl.replace(/(uploads\/)/, `$1${yearToAdd}/`))
  return fileContent;
})


// convert objects back to yaml format array items 
const corporateBackToYmlContents = corporateUpdatedUrls.map(fileContent => {
  return '---\n' + yaml.dump(fileContent,{
    flowLevel: 3,
  }).replace(/^(-\s+)/, '').replace(/^  /gm, '').replace('- null','');
});
// console.log(corporateBackToYmlContents)


// writeing only the test case

          // // select only the test case
          // const getTest = corporateBackToYmlContents.filter(fileContent => fileContent.includes('NSZ_Front_sponsorTower.jpg'));
          // // console.log(getTest)

          // fs.writeFile(`${rootDirCorporate}/test/index.md`, getTest[0], (err) => {
          //   if (err) throw err;
          //   console.log('The file has been saved!');
          // });

// overwriteing all the index.md files in it's directory
corporateDirs.map((dir, i) => {
  return fs.writeFile(`${rootDirCorporate}/${dir}/index.md`, corporateBackToYmlContents[i], (err) => {
    if (err) throw err;
    console.log(`${rootDirCorporate}/${dir}/index.md has been saved!`);
  });
})




// latest cloudinray setup:

const rootFolder = 'test/';


async function getAllPublicIds() {
  try {
    // add year to images url paths
    
    // Get a list of all the folders in the root folder
    const result = await cloudinary.api.sub_folders(rootFolder);
    const folders = result.folders;
    
    // Loop through each folder
    folders.forEach((folder, i) => {
      console.log(`Folder: ${folder.path}`);
  
      // Get a list of all the images in the folder
      const imagesResult = await cloudinary.search
        .expression(`folder:${folder.path}/*`)
        .execute();
  
      const images = imagesResult.resources;
  
      // Loop through each image and log its public ID
      for (const image of images) {
        console.log(`  Public ID: ${image.public_id}`);
        const publicId = image.public_id;
        const newPublicId = publicId.replace(/(test\/)/, `$1${years[i]}/`);

        // Call the rename method to move the image to the target folder
        cloudinary.uploader.rename(publicId, newPublicId, (error, result) => {
            if (error) {
            console.error(error);
            } else {
            console.log(result);
            }
        });

      }
    })
  } catch (error) {
    console.error(error);
  }
}

getAllPublicIds()