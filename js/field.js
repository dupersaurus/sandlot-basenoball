var gameField = {

	fieldWidth: 800,
	fieldHeight: 800,
	backWallLength: 385,
	infieldRadius: 250,
    outfieldRadius: 420,

    // Distance from home plate to mound
    basesRadius: 150,

    catcherInfluence: 125,
    infieldInfluence: 375,
    outfieldInfluence: 425,
    backWallInfluence: 0,
    homeRunInfluence: 650,
    
    // The distance between the infield and the fence
    outfieldGap: 0,
    
    homePlateX: 400,
    homePlateY: 550,

    fieldGraphics: null,

	DrawField: function(game) {
		this.outfieldGap = this.backWallLength - this.infieldRadius;
		this.backWallInfluence = new Phaser.Point(this.backWallLength, this.backWallLength).getMagnitude();

		this.fieldGraphics = game.add.graphics(0, 0);
		var graphics = this.fieldGraphics;
		//game.stage.addChild(graphics);
		//graphics.z = -100;

		// Grass
	    graphics.beginFill(0x00aa00, 1);
	    graphics.drawRect(0, 0, 800, 800);
	    graphics.endFill();

	    // Infield
	    graphics.lineStyle(1, 0x8B4513, 1);
	    graphics.beginFill(0x8B4513, 1);
	    
	    graphics.moveTo(this.homePlateX, this.homePlateY);
	    graphics.lineTo(this.homePlateX - this.infieldRadius, this.homePlateY - this.infieldRadius);
	    graphics.lineTo(this.homePlateX + this.infieldRadius, this.homePlateY - this.infieldRadius);
	    graphics.lineTo(this.homePlateX, this.homePlateY);
	    graphics.arc(this.homePlateX, this.homePlateY, new Phaser.Point(this.infieldRadius, this.infieldRadius).getMagnitude(),
	    		 		game.math.degToRad(225), game.math.degToRad(315));
	    graphics.endFill();

	    // Batter's box
	    graphics.beginFill(0x8B4513, 1);
	    graphics.drawRect(this.homePlateX - 40, this.homePlateY - 40, 80, 80);
	    graphics.endFill();
	    
	    // Bases
	    this.DrawBase(this.GetHomePlatePos(), graphics, true);		// Home
	    this.DrawBase(this.GetFirstBasePos(), graphics); 	// First
	    this.DrawBase(this.GetSecondBasePos(), graphics);	// Second
	    this.DrawBase(this.GetThirdBasePos(), graphics);	// Third

	    // Mound
	    this.DrawMound();
	    
	    // Foul lines
	    graphics.lineStyle(2, 0xffffff, 1);
	    graphics.moveTo(this.homePlateX - 40, this.homePlateY - 40);
	    graphics.lineTo(this.homePlateX - this.fieldWidth * 0.5, this.homePlateY - this.fieldWidth * 0.5);
	    graphics.moveTo(this.homePlateX + 40, this.homePlateY - 40);
	    graphics.lineTo(this.homePlateX + this.fieldWidth * 0.5, this.homePlateY - this.fieldWidth * 0.5);
	    
	    // Back wall
	    graphics.arc(this.homePlateX, this.homePlateY, this.backWallInfluence, game.math.degToRad(225), game.math.degToRad(315));

	    /*graphics.lineStyle(1, 0xff00ff, 1);
	    graphics.arc(this.homePlateX, this.homePlateY, this.catcherInfluence, 0, 360);
	    graphics.arc(this.homePlateX, this.homePlateY, this.infieldInfluence, 0, 360);
	    graphics.arc(this.homePlateX, this.homePlateY, this.outfieldInfluence, 0, 360);
	    graphics.arc(this.homePlateX, this.homePlateY, this.homeRunInfluence, 0, 360);*/
	},

	DrawBase: function(point, graphics, bHome) {
		var graphics = this.fieldGraphics;

	    graphics.lineStyle(0, 0xffffff, 1);
	    graphics.beginFill(0xffffff, 1);
	    //graphics.drawRect(cx - 7, cy - 7, 14, 14);

	    graphics.moveTo(point.x - 10, point.y);
	    graphics.lineTo(point.x, 	point.y + 10);
	    graphics.lineTo(point.x + 10, point.y);
	    graphics.lineTo(point.x, 	point.y - 10);
	    graphics.lineTo(point.x - 10, point.y);

	    if (bHome == true) {
	    	graphics.drawRect(point.x - 10, point.y - 10, 20, 10);
	    }

	    graphics.endFill();
	},

	DrawMound: function() {
		var pos = this.GetMoundPos();

		this.fieldGraphics.beginFill(0xffffff, 1);
	    this.fieldGraphics.drawRect(pos.x - 10, pos.y - 3, 20, 6);
	    this.fieldGraphics.endFill();
	},

	// ** Positions in the world ******************************************************
	GetBasePosition: function(base) {
		switch (base) {
			case HOME:
				return this.GetHomePlatePos();

			case FIRST:
				return this.GetFirstBasePos();

			case SECOND:
				return this.GetSecondBasePos();

			case THIRD:
				return this.GetThirdBasePos();
		}
	},

	GetMoundPos: function() {
		return new Phaser.Point(this.homePlateX, this.homePlateY - this.basesRadius);
	},

	GetHomePlatePos: function() {
		return new Phaser.Point(this.homePlateX, this.homePlateY - 10);
	},

	GetFirstBasePos: function() {
		return new Phaser.Point(this.homePlateX + this.basesRadius - 10, this.homePlateY - this.basesRadius);
	},

	GetSecondBasePos: function() {
		return new Phaser.Point(this.homePlateX, this.homePlateY - this.basesRadius * 2);
	},

	GetWideSecondBasePos: function() {
		return new Phaser.Point(this.homePlateX + this.basesRadius * 0.5 + 20, this.homePlateY - this.basesRadius * 2 + 20);
	},

	GetShortstopPos: function() {
		return new Phaser.Point(this.homePlateX - this.basesRadius * 0.5 - 20, this.homePlateY - this.basesRadius * 2 + 20);
	},

	GetThirdBasePos: function() {
		return new Phaser.Point(this.homePlateX - this.basesRadius + 10, this.homePlateY - this.basesRadius);
	},

	GetLeftFieldPos: function() {
		var point = Phaser.Point.rotate(new Phaser.Point(this.outfieldRadius, 0), 0, 0, 235, true);
		point.x += this.homePlateX;
		point.y += this.homePlateY;

		return point;
	},

	GetCenterFieldPos: function() {
		var point = Phaser.Point.rotate(new Phaser.Point(this.outfieldRadius, 0), 0, 0, 270, true);
		point.x += this.homePlateX;
		point.y += this.homePlateY;

		return point;
	},

	GetRightFieldPos: function() {
		var point = Phaser.Point.rotate(new Phaser.Point(this.outfieldRadius, 0), 0, 0, 305, true);
		point.x += this.homePlateX;
		point.y += this.homePlateY;

		return point;
	},

	GetHomeDugoutPos: function() {
		var point = this.GetFirstBasePos();
		return new Phaser.Point(point.x + 220, point.y + 20);
	},

	GetAwayDugoutPos: function() {
		var point = this.GetThirdBasePos();
		return new Phaser.Point(point.x - 220, point.y + 20);
	},	

	GetLeftBattingBoxPos: function() {
		var point = this.GetHomePlatePos();
		point.x -= 24;

		return point;
	},

	GetRightBattingBoxPos: function() {
		var point = this.GetHomePlatePos();
		point.x += 24;

		return point;
	}
};