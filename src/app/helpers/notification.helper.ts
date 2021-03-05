import { Renderer2 } from "@angular/core";

export class NotificationHelper {
	
	public message:string;

	public toggleElement(render: Renderer2,toggleElement: HTMLElement, messageStatus:string, className:string) {	
		
		setTimeout(() => {
		  render.removeClass(toggleElement, 'hide');
		  render.addClass(toggleElement, 'show');
		  render.addClass(toggleElement, className);
		  this.message = messageStatus;
		  setTimeout(() => {
			render.removeClass(toggleElement, 'show');
			render.addClass(toggleElement, 'hide');
			render.removeClass(toggleElement, className);
		  }, 4000)
		}, 0);

	}
}