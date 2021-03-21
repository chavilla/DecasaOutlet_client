export class InputModel {
	constructor(
		public product_id:number,
		public amount:number,
		public cost:number,
		public description?:string,
		public updated_at?: string,
		public user?:number,
	){}
}