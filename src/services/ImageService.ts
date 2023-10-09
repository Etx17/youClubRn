import { Storage } from 'aws-amplify';

export const uploadImageToS3 = async (uri: String): Promise<String> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const s3Response = await Storage.put(blob._data.name, blob, {
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
    });
    return s3Response.key;
  } catch (e: any) {
    throw new Error("Error uploading file: " + e.message);
  }
};

// export const updateImageKeysInS3 = async (actualImagesFromClub: string[], selectedImages: string[]): Promise<string[]> => {
//   const deletedImageKeys: string[] = [];

//   // Step 1: Identify images to delete from S3
//   const imagesToDeleteFromS3 = actualImagesFromClub.filter((image) => !selectedImages.includes(image));
//   console.log(imagesToDeleteFromS3, 'images to delete from S3')
//   for (const imageToDelete of imagesToDeleteFromS3) {
//     try {
//       await Storage.remove(imageToDelete);
//       console.log('image deleted from S3', imageToDelete);
//       deletedImageKeys.push(imageToDelete);
//     } catch (error) {
//       console.log(error, 'there was an error deleting the image');
//     }
//   }

//   // Step 2: Upload new images to S3 and get their keys
//   const newImageKeys = await Promise.all(
//     selectedImages.map(async (image) => {
//       if (!actualImagesFromClub.includes(image)) {
//         try {
//           const uploadedKey = await uploadImageToS3(image);
//           console.log('image uploaded to S3', uploadedKey);
//           return uploadedKey;
//         } catch (error) {
//           console.log(error.message, 'there was an error uploading the image');
//           return undefined;
//         }
//       }
//     })
//   );

//   // Filter out any undefined elements from the newImageKeys array (caused by the if condition)
//   const filteredNewImageKeys = newImageKeys.filter((key) => key) as string[];

//   // Combine the deletedImageKeys and filteredNewImageKeys to get the final array of image keys
//   const finalImageKeys = [...actualImagesFromClub.filter((image) => selectedImages.includes(image)), ...filteredNewImageKeys];

//   return finalImageKeys;
// };
