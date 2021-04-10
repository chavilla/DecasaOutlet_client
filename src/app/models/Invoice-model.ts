export class InvoiceModel {
	constructor(
		public invoice:string,
		public clientName:string,
		public clientLastName:string,
		public seller:string,
		public created_at:string,
	){}
}