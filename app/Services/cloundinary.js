
import { config, uploader } from 'cloudinary';
import { config as _config } from 'dotenv';
import process from "process"

_config();

config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export function uploads(file, folder) {
    console.log('FILE PATH', file);
    return new Promise(resolve => {
        uploader.upload(file, (result) => {
            console.log(result);
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}