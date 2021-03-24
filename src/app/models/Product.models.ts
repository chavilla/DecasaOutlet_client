export class ProductModel {
	constructor(
		public description:string,
        public reference:string,
		public category_id: number,
		public cost:number,
		public priceTotal:number,
		public stock:number,
		public tax:number,
		public codebar:string,
		public id?:number,
		public active?:number,
	){}
}