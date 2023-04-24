import * as dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import { modifyfiles } from './convert_files.mjs';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// result yearsAndTitles after modifying the index.md files
const yearsAndTitles = modifyfiles();
const years = yearsAndTitles.map(item => item.year);
const titles = yearsAndTitles.map(item => item.title);


// Working with Cloudinary

const rootFolderCloudinary = 'uploads/';

async function getAllPublicIds() {
  try {
    // add year to images url paths
    
    // Get a list of all the folders in the root folder
    const result = await cloudinary.api.sub_folders(rootFolderCloudinary);
    const folders = result.folders;

    const images = [];

    // Loop through each folder
    for (const folder of folders) {
      // console.log(`Folder with uploads: ${folder.path}`);
      // console.log(`Folder name: ${folder.path.slice(8)}`);

      // Get a list of all the images in the folder
      const imagesResult = await cloudinary.search
      .expression(`folder:${folder.path}/*`)
      .execute();
      images.push(...imagesResult.resources);
    }
      
      
    // Loop through each image and log its public ID
    for (const image of images) {
      // console.log(`Public ID: ${image.public_id}`);
      // console.log(`Folder with uploads: ${image.folder}`);
      // console.log(`Folder name: ${image.folder.slice(8)}`);

      console.log(titles.includes(image.folder.slice(8)));
      const publicId = image.public_id;

      // modify public ID
      // const newPublicId = publicId.replace(/(uploads\/)/, `$1${years[index]}/`);

      // Call the rename method to move the image to the target folder
      // cloudinary.uploader.rename(publicId, newPublicId, (error, result) => {
      //     if (error) {
      //     console.error(error);
      //     } else {
      //     console.log(result);
      //     }
      // });

    }

  } catch (error) {
    console.error(error);
  }
}

getAllPublicIds()