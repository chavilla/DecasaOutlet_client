export class InputModel {
	constructor(
		public description:string,
		public amount:number,
		public cost:number,
		public updated_at?: string,
		public user?:number,
	){}
}