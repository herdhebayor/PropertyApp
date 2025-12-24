'use server'

import connectDB from '@/database'
import Property from '@/models/propertyModel'
import { getSessionUser } from '@/utils/getSessionUser'
import { revalidatePath } from 'next/cache'
import {redirect} from 'next/navigation'
import User from '@/models/userModel'

async function bookmarkProperty(propertyId){
    await connectDB()

    const sessionUser = await getSessionUser()
    if(!sessionUser|| !sessionUser.userId){
        throw new Error('User Id is required')
    }

    const {userId} = sessionUser

    const user = await User.findById(userId)

    let isBookmarked = user.bookmarks.includes(propertyId)

    let message;
    if(isBookmarked){
        user.bookmarks.pull(propertyId)
        message = "Bookmark Removed"
        isBookmarked = false;
    }else{
        user.bookmarks.push(propertyId)
        message = 'Bookmark Added';
        isBookmarked = true
    }
    await user.save()
    revalidatePath('/properties/saved','page')

    return {
        message,
        isBookmarked,
    }
}

export default bookmarkProperty