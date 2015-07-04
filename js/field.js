var gameField = {

	fieldWidth: 800,
	fieldHeight: 800,
	backWallLength: 400,
	infieldRadius: 250,
    basesRadius: 150,
    
    homePlateX: 400,
    homePlateY: 750,

    fieldGraphics: null,

	DrawField: function(game) {
		this.fieldGraphics = game.add.graphics(0, 0);
		var graphics = this.fieldGraphics;

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
	    graphics.arc(this.homePlateX, this.homePlateY, new Phaser.Point(this.backWallLength, this.backWallLength).getMagnitude(), 0, 360);
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
	}
};