import { Schema,model, models } from "mongoose";

const MessageSchema = new Schema({
	sender: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},

	recipient: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
	property: {
		type: Schema.Types.ObjectId,
		ref: 'Property',
		require: true,
	},
	name: {
		type: String,
		require: [true, 'Name is required'],
	},
	email: {
		type: String,
		require: [true, 'Email is required'],
	},
    phone:String,
    body:String,
    read:{
        type:Boolean,
        default:false,
    }
},
{
    timestamps:true,
}
)

const Message = models.Message || model("Message",MessageSchema)
export default Message