'use server'

import cloudinary from "/config/cloudinaryConfig"
import connectDB from '@/database'
import Property from '@/models/propertyModel'
import {getSessionUser} from '@/utils/getSessionUser'
import {revalidatePath} from 'next/cache'


async function deleteProperty(propertyid){
    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId){
        throw new Error('User Id is required')
    }

    const {userId} = sessionUser
    const property = Property.findById(proeprtyid)
    if(!property){
        throw new Error('Property Not Found')
    }

    //Verify ownership
    if(property.owner.tpString() !== userId){
        throw new Error('Unauthorized')
    }

    //Delete from cloudinary
    //Extract public Id from image URLs and exclude the .jg extension

    const publicIds = property.images.map((imageUrl)=>{
        const parts = imageUrl.split('/')
        return parts.at(-1).split('.').at(0)
    })

    //Delete images from cloudinary
    if(publicIds.length > 0){
        for (let publicId of publicIds){
            try{
                await cloudinary.uploader.destroy(`propertyApp2025/${publicId}`);
            }catch(error){
                
                console.error('Error deleting image from cloudinary', error)
            
            }
        }
    }

    await property.deleteOne()
    revalidatePath('/', 'layout')
}

export default deleteProperty