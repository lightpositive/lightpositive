const fs = require('fs');
const yaml = require('js-yaml');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: '',
  api_key: '',
  api_secret: '',
});




// console.log(corporateUpdatedUrls[0][0])


// working with Cloudinary

// const rootFolder = 'Home/test/toMove/';

// async function moveFolders() {
//     try {
//     // Get a list of all the folders in the root folder
//     const result = await cloudinary.api.root_folders({ prefix: rootFolder });
//     const folders = result.folders;
  
//     // Loop through each folder
//     for (const folder of folders) {
//       // Extract the year from the folder name
//       const year = 2019;
  
//       // Construct the new folder path
//       const newFolderPath = `original_folder/${year}/${folder.name}`;
  
//       // Move the folder to the new path
//       await cloudinary.api.move_folder(folder.name, newFolderPath);
  
//       console.log(`Moved folder ${folder.name} to ${newFolderPath}`);
//     }
// } catch (error) {
//     console.error(error);
//   }
//   }
  
//   moveFolders();

// const yearToAdd = '2019';
// const rootFolder = 'test/';

// async function getAllPublicIds() {
//     try {
//     // Get a list of all the folders in the root folder
//     const result = await cloudinary.api.sub_folders(rootFolder);
//     const folders = result.folders;
  
//     // Loop through each folder
//     for (const folder of folders) {
//       console.log(`Folder: ${folder.path}`);
  
//       // Get a list of all the images in the folder
//       const imagesResult = await cloudinary.search
//         .expression(`folder:${folder.path}/*`)
//         .execute();
  
//       const images = imagesResult.resources;
  
//       // Loop through each image and log its public ID
//       for (const image of images) {
//         console.log(`  Public ID: ${image.public_id}`);
//         const publicId = image.public_id
//         const newPublicId = publicId.replace(/(test\/)/, `$1${yearToAdd}/`)

//         // Call the rename method to move the image to the target folder
//         cloudinary.uploader.rename(publicId, newPublicId, (error, result) => {
//             if (error) {
//             console.error(error);
//             } else {
//             console.log(result);
//             }
//         });

//       }
//     }
//     } catch (error) {
//     console.error(error);
//   }
//   }
  
//   getAllPublicIds();


//   // Define the source and target folders
// const sourceFolder = 'source_folder';
// const targetFolder = 'target_folder';

// // Define the public ID of the image to move
// const publicId = 'example_image';

// // Construct the new public ID, with the target folder name
// const newPublicId = `${targetFolder}/${publicId}`;

// // Call the rename method to move the image to the target folder
// cloudinary.uploader.rename(publicId, newPublicId, (error, result) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(result);
//   }
// });





// const rootFolder = 'test/';


// async function getAllPublicIds() {
//   try {
//     // Get the contents of the YAML file and extract the year to add
//     const rootDirCorporate = 'src/references/corporate';
//     const corporateContents = fs.readFileSync(`${rootDirCorporate}/teszt/index.md`, 'utf8');
//     const corporateYmlContents = yaml.loadAll(corporateContents);
//     const yearToAdd = corporateYmlContents[0].date.getFullYear();
    
//     // Update the image URLs in the YAML file
//     corporateYmlContents[0].coverImage[0] = corporateYmlContents[0].coverImage[0].replace(/(uploads\/)/, `$1${yearToAdd}/`);
//     corporateYmlContents[0].galleryImages = corporateYmlContents[0].galleryImages.map(imageUrl => imageUrl.replace(/(uploads\/)/, `$1${yearToAdd}/`));
    
//     // Get a list of all the folders in the root folder
//     const result = await cloudinary.api.sub_folders(rootFolder);
//     const folders = result.folders;
  
//     // Loop through each folder
//     for (const folder of folders) {
//       console.log(`Folder: ${folder.path}`);
  
//       // Get a list of all the images in the folder
//       const imagesResult = await cloudinary.search
//         .expression(`folder:${folder.path}/*`)
//         .execute();
  
//       const images = imagesResult.resources;
  
//       // Loop through each image and log its public ID
//       for (const image of images) {
//         console.log(`  Public ID: ${image.public_id}`);
//         const publicId = image.public_id;
//         const newPublicId = publicId.replace(/(test\/)/, `$1${yearToAdd}/`);

//         // Call the rename method to move the image to the target folder
//         cloudinary.uploader.rename(publicId, newPublicId, (error, result) => {
//             if (error) {
//             console.error(error);
//             } else {
//             console.log(result);
//             }
//         });

//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// getAllPublicIds()

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

// add year to images url paths
const corporateUpdatedUrls = corporateYmlContents.map(fileContent => {
  const yearToAdd = fileContent[0].date.getFullYear()
  fileContent[0].coverImage[0] = fileContent[0].coverImage[0].replace(/(uploads\/)/, `$1${yearToAdd}/`);
  fileContent[0].galleryImages = fileContent[0].galleryImages.map(imageUrl => imageUrl.replace(/(uploads\/)/, `$1${yearToAdd}/`))
  return fileContent;
})

// convert objects back to yaml format array items 
const corporateBackToYmlContents = corporateUpdatedUrls.map(fileContent => {
  return yaml.dump(fileContent);
});

// wteing only the test case

// select only the test case
const getTest = corporateBackToYmlContents.filter(fileContent => fileContent.includes('NSZ_Front_sponsorTower.jpg'));
// console.log(getTest)


fs.writeFile(`${rootDirCorporate}/test/index.md`, getTest[0], (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});



// const rootFolder = 'test/';


// async function getAllPublicIds() {
//   try {
//     // Get the contents of the YAML file and extract the year to add
//     const rootDirCorporate = 'src/references/corporate';
//     const corporateContents = fs.readFileSync(`${rootDirCorporate}/teszt/index.md`, 'utf8');
//     const corporateYmlContents = yaml.loadAll(corporateContents);
//     const yearToAdd = corporateYmlContents[0].date.getFullYear();
    
//     // Update the image URLs in the YAML file
//     corporateYmlContents[0].coverImage[0] = corporateYmlContents[0].coverImage[0].replace(/(uploads\/)/, `$1${yearToAdd}/`);
//     corporateYmlContents[0].galleryImages = corporateYmlContents[0].galleryImages.map(imageUrl => imageUrl.replace(/(uploads\/)/, `$1${yearToAdd}/`));
    
//     // Get a list of all the folders in the root folder
//     const result = await cloudinary.api.sub_folders(rootFolder);
//     const folders = result.folders;
  
//     // Loop through each folder
//     for (const folder of folders) {
//       console.log(`Folder: ${folder.path}`);
  
//       // Get a list of all the images in the folder
//       const imagesResult = await cloudinary.search
//         .expression(`folder:${folder.path}/*`)
//         .execute();
  
//       const images = imagesResult.resources;
  
//       // Loop through each image and log its public ID
//       for (const image of images) {
//         console.log(`  Public ID: ${image.public_id}`);
//         const publicId = image.public_id;
//         const newPublicId = publicId.replace(/(test\/)/, `$1${yearToAdd}/`);

//         // Call the rename method to move the image to the target folder
//         cloudinary.uploader.rename(publicId, newPublicId, (error, result) => {
//             if (error) {
//             console.error(error);
//             } else {
//             console.log(result);
//             }
//         });

//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// getAllPublicIds()