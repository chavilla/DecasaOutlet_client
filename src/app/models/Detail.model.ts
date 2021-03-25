export class DetailModel {
	constructor(
		public description,
		public amount:number,
		public reference:string,
		public stock:number,
		public priceTotal:number,
		public codebar:string,
		public tax:number,
		public priceTotalSale?:number,
		
	){}
}