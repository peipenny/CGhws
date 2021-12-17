export class Candle {

	constructor(pos, mesh ,mesh2) {
		this.mesh = mesh;
		this.pos = pos.clone();
		this.fire = mesh2;

		this.mesh.position.copy(this.pos);
		this.fire.position.copy(this.pos);
		//console.log(this.fire.flameMesh);
	}

}

