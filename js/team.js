function Team() {
	var name = "";

	// List of the team's players. Indexed by player uid.
	var players;

	// The order players bat in, using player uid
	var battingOrder;
	
	// Where the players field at, using player uid
	var fieldingPositions;

	var teamColor;

	// Index of the batter currently at the plate
	var iCurrentBatterIndex = -1;

	// Load information about the team from a json object
	this.loadTeam = function(json) {
		name = json["name"];
		battingOrder = json["battingOrder"];
		fieldingPositions = json["fieldingPositions"];
		teamColor = json["teamColor"];

		var pList = json["players"];
		var tmpInfo;
		var tmpPlayer;

		players = new Object();

		for (var i = 0; i < pList.length; i++) {
			tmpInfo = new PlayerInfo(pList[i]);
			players[pList[i]["id"]] = new Player(pList[i]["id"], tmpInfo, teamColor);
		}
	}

	// Begin the fielding half-inning
	this.fieldTeam = function() {
		for (var i = 0; i < fieldingPositions.length; i++) {
			players[fieldingPositions[i]].setAsFielder(i);
		}
	}

	this.resetFielders = function() {
		for (var i = 0; i < fieldingPositions.length; i++) {
			players[fieldingPositions[i]].returnToFieldingPosition(i);
		}
	}

	// Begin the batting half-innning
	this.batTeam = function(bTopInning) {
		for (var i = 0; i < fieldingPositions.length; i++) {
			if (bTopInning) {
				players[fieldingPositions[i]].returnToDugout(gameField.GetAwayDugoutPos(), true);
			} else {
				players[fieldingPositions[i]].returnToDugout(gameField.GetHomeDugoutPos(), true);
			}
		}
	}

	// Present the next batter in the lineup to the plate
	// Returns the player object
	this.presentNextBatter = function() {
		iCurrentBatterIndex++;

		if (iCurrentBatterIndex >= 8) {
			iCurrentBatterIndex = 0;
		}

		players[battingOrder[iCurrentBatterIndex]].setAsBatter();
		return players[battingOrder[iCurrentBatterIndex]];
	},

	// Returns the pitcher player
	this.getPitcher = function() {
		return this.getFielderForPosition(PITCHER);
	}

	// Returns the fielder at a specific position
	this.getFielderForPosition = function(position) {
		return players[fieldingPositions[position]];
	}

	// Return the position a given fielder is fielding at
	this.getFielderPosition = function(fielder) {
		for (var i = 0; i < fieldingPositions.length; i++) {
			if (players[fieldingPositions[i]] == fielder) {
				return fieldingPositions[i] + 1;
			}
		}

		return -1;
	}
}