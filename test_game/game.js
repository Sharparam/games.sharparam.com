// Constants
var ROTATION_SPEED = 3;
var MOVE_SPEED = 200;
var SHOT_SPEED = 300;

var view = new ss2d.View('mainCanvas');

var quad = new ss2d.Quad(30, 100, 40, 40, 0xffff00);
view.mMainScene.addObject(quad);

quad.mPicked = false;

quad.mPivotX = quad.mWidth / 2;
quad.mPivotY = quad.mHeight / 2;

quad.tick = function(delta) {
	var input = ss2d.CURRENT_VIEW.mInput;

	if (input.mMouseDown && !input.mPreviousMouseDown) {
		if (this.hitTestPoint(input.mMousePoint)) {
			this.mPicked = true;
		}
	}

	this.mPicked = this.mPicked && input.mMouseDown;

	if (this.mPicked) {
		this.mLocation.mX = input.mMouseX;
		this.mLocation.mY = input.mMouseY;
	}
}

var container = new ss2d.DisplayObjectContainer(200, 200);
view.mMainScene.addObject(container);

var cannon = new ss2d.Quad(-10, -30, 20, 60, '#000000');
container.addObject(cannon);

var cannonHead = new ss2d.Quad(-10, -30, 20, 10, '#ff0000');
container.addObject(cannonHead);

container.tick = function(delta) {
	var input = ss2d.CURRENT_VIEW.mInput;

	if (input.isKeyPressed(ss2d.Input.Keys.W)) {
		this.mLocation.mY -= MOVE_SPEED * delta * Math.cos(this.mRotation);
		this.mLocation.mX -= MOVE_SPEED * delta * Math.sin(this.mRotation);
	}

	if (input.isKeyPressed(ss2d.Input.Keys.S)) {
		this.mLocation.mY += MOVE_SPEED * delta * Math.cos(this.mRotation);
		this.mLocation.mX += MOVE_SPEED * delta * Math.sin(this.mRotation);
	}

	if (input.isKeyPressed(ss2d.Input.Keys.A))
		this.mRotation += ROTATION_SPEED * delta;

	if (input.isKeyPressed(ss2d.Input.Keys.D))
		this.mRotation -= ROTATION_SPEED * delta;

	this.mLastRotation = this.mRotation;

	if (input.isKeyPressed(ss2d.Input.Keys.SPACE) && !this.mBarPressed) {
		var bullet = new ss2d.Quad(0, 0, 10, 10, '#ff0000');
		bullet.mPivotX = bullet.mWidth / 2;
		bullet.mPivotY = bullet.mHeight / 2;
		bullet.mLocation.mX = this.mLocation.mX - (30 * Math.sin(this.mRotation));
		bullet.mLocation.mY = this.mLocation.mY - (30 * Math.cos(this.mRotation));
		bullet.mRotation = this.mRotation;
		bullet.mLifeTime = 2;
		bullet.tick = function(delta) {
			this.mLocation.mX -= SHOT_SPEED * delta * Math.sin(this.mRotation);
			this.mLocation.mY -= SHOT_SPEED * delta * Math.cos(this.mRotation);
			this.mLifeTime -= delta;
			if (this.mLifeTime <= 0) {
				this.mParent.removeObject(this);
			}
		}
		ss2d.CURRENT_VIEW.mMainScene.addObject(bullet);
	}

	this.mBarPressed = input.isKeyPressed(ss2d.Input.Keys.SPACE);
}

view.startLoop();
