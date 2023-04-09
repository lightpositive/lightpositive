const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: '',
  api_key: '',
  api_secret: '',
});



// Working with .md files 

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
// console.log(festivalUpdatedUrls[0][0])
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





const rootFolder = 'test/';


async function getAllPublicIds() {
  try {
    // Get the contents of the YAML file and extract the year to add
    const rootDirCorporate = 'src/references/corporate';
    const corporateContents = fs.readFileSync(`${rootDirCorporate}/teszt/index.md`, 'utf8');
    const corporateYmlContents = yaml.loadAll(corporateContents);
    const yearToAdd = corporateYmlContents[0].date.getFullYear();
    
    // Update the image URLs in the YAML file
    corporateYmlContents[0].coverImage[0] = corporateYmlContents[0].coverImage[0].replace(/(uploads\/)/, `$1${yearToAdd}/`);
    corporateYmlContents[0].galleryImages = corporateYmlContents[0].galleryImages.map(imageUrl => imageUrl.replace(/(uploads\/)/, `$1${yearToAdd}/`));
    
    // Get a list of all the folders in the root folder
    const result = await cloudinary.api.sub_folders(rootFolder);
    const folders = result.folders;
  
    // Loop through each folder
    for (const folder of folders) {
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
        const newPublicId = publicId.replace(/(test\/)/, `$1${yearToAdd}/`);

        // Call the rename method to move the image to the target folder
        cloudinary.uploader.rename(publicId, newPublicId, (error, result) => {
            if (error) {
            console.error(error);
            } else {
            console.log(result);
            }
        });

      }
    }
  } catch (error) {
    console.error(error);
  }
}

getAllPublicIds()
