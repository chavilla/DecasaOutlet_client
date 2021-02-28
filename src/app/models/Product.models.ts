export class ProductModel {
	constructor(
		public description:string,
        public reference:string,
		public category: number,
		public cost:number,
		public stock:number,
		public tax:number,
	){}
}