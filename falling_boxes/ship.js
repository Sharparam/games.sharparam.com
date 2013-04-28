var Ship = function(x, y, w, h, speed) {
	this.mMoveSpeed = speed;

	
}

goog.inherits(Ship, ss2d.Quad);

Ship.prototype.tick = function(delta) {
	var input = ss2d.CURRENT_VIEW.mInput;

	if (input.isKeyPressed(ss2d.Input.Keys.A))
		this.mLocation.mX -= this.mSpeed;

	if (input.isKeyPressed(ss2d.Input.Keys.D))
		this.mLocation.mX += this.mSpeed;

	if (this.mLocation.mX < 0)
		this.mLocation.mX = 0;
	else if (this.mLocation.mX + this.mWidth > ss2d.CURRENT_VIEW.mCanvas.width)
		this.mLocation.mX = ss2d.CURRENT_VIEW.mCanvas.width - this.mWidth;
}
