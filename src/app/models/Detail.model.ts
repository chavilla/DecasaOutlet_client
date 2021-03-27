export class DetailModel {
	constructor(
		public id:number,
		public amount:number,
		public priceTotal:number,
		public priceTotalSale:number,
		public description:string,
		public codebar:string,
		public tax:number,
		public reference:string,
	){}
}