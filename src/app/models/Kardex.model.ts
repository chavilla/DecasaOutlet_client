export class KardexModel {
	constructor(
		public description:string,
		public cost_pp:number,
		public input_amount:number,
		public input_value:number,
		public output_amount:number,
		public output_value:number,
		public balance_amount:number,
		public balance_value:number,
		public created_at: string,
		public product_id: number,
		public id:number,
	){

	}
}