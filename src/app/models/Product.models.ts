export class ProductModel {
	constructor(
		public description:string,
        public reference:string,
		public category_id: number,
		public cost:number,
		public stock:number,
		public tax:number,
	){}
}