import { Schema, Model, model, ObjectId } from 'mongoose'

export interface IUser {
	name: string
	email: string
	password: string
	gastos: ObjectId[]
}

export const UserSchema = new Schema({
	name: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	gastos: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Gasto',
		},
	],
})

UserSchema.methods.toJSON = function () {
	const { __v, _id, password, ...user } = this.toObject()
	return user
}

const User: Model<IUser> = model<IUser>('User', UserSchema)
export default User
