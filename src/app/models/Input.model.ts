export class InputModel {
	constructor(
		public product_id:number,
		public amount:number,
		public cost:number,
		public invoice_number?:string,
		public updated_at?: string,
		public user?:number,
	){}
}