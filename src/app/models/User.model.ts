export class UserModel {
	constructor(
		public name:string,
		public email:string,
		public password:string,
		public active?:number,
		public id?:number,
		public role?:string,
	){}
}