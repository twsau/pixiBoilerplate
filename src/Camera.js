import * as PIXI from 'pixi.js';
const { Container } = PIXI;

export default class Camera extends Container {

	constructor(bounds) {
		super();
		Object.assign(this, {
			bounds: bounds,
			panSpeed: 10,
			sortableChildren: true,
			target: null
		});
	}

	panToTarget() {
		const coordinates = {
			x: -this.target.x + this.bounds.w / 2,
			y: -this.target.y + this.bounds.h * 0.66
		};
		const angle = Math.atan2(coordinates.y - this.y, coordinates.x - this.x);
		if (Math.hypot(this.x - coordinates.x, this.y - coordinates.y) > Camera.config.panSpeed) {
			this.position.set(
				this.x + Math.cos(angle) * Camera.config.panSpeed,
				this.y + Math.sin(angle) * Camera.config.panSpeed
			);
		} else {
			this.position.set(coordinates.x, coordinates.y);
		}
	}

	setTarget(target) {
		this.target = target;
	}

	update() {
		if (!!this.target) {
			this.panToTarget();
		}
	}

}