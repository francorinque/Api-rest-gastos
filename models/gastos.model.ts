import { Schema, Model, model, ObjectId } from 'mongoose'

export interface IGasto {
	title: string
	description: string
	price: number
	user: ObjectId
}

export const GastoSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		user: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
	}
)

GastoSchema.methods.toJSON = function () {
	const { __v, _id, ...gasto } = this.toObject()
	return gasto
}

const Gasto: Model<IGasto> = model<IGasto>('Gasto', GastoSchema)
export default Gasto
