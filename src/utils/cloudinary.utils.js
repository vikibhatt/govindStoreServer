import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
  api_key: process.env.CLOUDNARY_API_KEY, 
  api_secret: process.env.CLOUDNARY_API_SECRET 
});

const addFilesToCloudnary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null

        const targetFolder = "samples/trialApi";

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
            folder: targetFolder
        })

        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        console.error('Error in addFilesToCloudnary:', error);
        fs.unlinkSync(localFilePath)
        return null
    }
}

const getPublicIdFromUrl = (url) => {
    const publicIdMatches = url.match(/\/v\d+\/samples\/trialApi\/(.+?)\.\w+/);
    return publicIdMatches ? publicIdMatches[1] : null;
}; 

const deleteFilesFromCloudnary = async(oldFilePath, type) => {
    if(oldFilePath){
        try {
            const publicId = getPublicIdFromUrl(oldFilePath);
            let result
            if(type.toString() === 'video'.toString()){
                result = await cloudinary.uploader.destroy(`samples/trialApi/${publicId}`,
                    {
                        resource_type: 'video',
                        invalidate: true
                    }
                )
            }
            else{
                result = await cloudinary.uploader.destroy(`samples/trialApi/${publicId}`,
                    {
                        resource_type: 'image',
                        invalidate: true
                    }
                )
            }

            if(result.result === 'ok'){
                console.log(`File deleted from Cloudinary`);
            }
            else{
                console.error(`Failed to delete file from Cloudinary: ${result.result}`);
            }
        } catch (error) {
            console.error(`Error deleting file from Cloudinary`, error);
        }
    }
    
}

export {addFilesToCloudnary, deleteFilesFromCloudnary}

