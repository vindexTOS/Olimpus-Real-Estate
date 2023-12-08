// multer.config.ts
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as path from 'path';
import { BadRequestException } from '@nestjs/common';
const dirName = __dirname;
const imagePath = path.join(dirName + `/productPictures`);

// // Define a function to check if the file is an image
const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new BadRequestException('Only image files are allowed'), false);
  }
  callback(null, true);
};



export const multerOptions = {
  storage: diskStorage({
    filename: (req, file, callback) => {
      const fileExtName = extname(file.originalname);
      callback(null, `${Date.now()}${fileExtName}`);
    },
  }),
  fileFilter: imageFileFilter, // Add the file filter to check for image file types
};

