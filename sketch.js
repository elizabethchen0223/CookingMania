var world
var recipe_container
var recipe_steak_button,recipe_steak_textholder
var recipe_noodle_button, recipe_noodle_textholder
var steak_container, steak_button, steak_textholder
var noodle_container, noodle_button, noodle_textholder




function setup() {
	noCanvas();
	world = new World('VRScene');

	//Recipe Selection HUD
	recipe_container = new Container3D({});

	//Recipe button for Steak
	recipe_steak_button = new Plane({
    x:1,y:-0.75,z:-0.5,
    red:255,green:0,blue:0,
    width:1,height:0.5,depth:1,
    clickFunction: function(me){

			console.log("REcipe clicked");
			steak_container.show()
			recipe_container.hide();


		}
  })
	recipe_steak_textholder = new Plane({

			x: 1, y: -0.75, z: -0.5,
			width: 1, height: 0.3,
			red: 255, green: 255, blue: 255

	})
	recipe_steak_textholder.tag.setAttribute('text','value: Check Steak; color: rgb(0,0,0); align: center;');
	recipe_container.addChild(recipe_steak_button);
	recipe_container.addChild(recipe_steak_textholder)


	//Recipe Button for Noodle
	recipe_noodle_button = new Plane({
    x:-1,y:-0.75,z:-0.5,
    red:255,green:0,blue:0,
    width:1,height:0.5,depth:1,
    clickFunction: function(me){

			console.log("REcipe clicked");
			noodle_container.show()
			recipe_container.hide();

		}
  })
	recipe_noodle_textholder = new Plane({

			x: -1, y: -0.75, z: -0.5,
			width: 1, height: 0.3,
			red: 255, green: 255, blue: 255

	})
	recipe_noodle_textholder.tag.setAttribute('text','value: Check Noodle; color: rgb(0,0,0); align: center;');
	recipe_container.addChild(recipe_noodle_button);
	recipe_container.addChild(recipe_noodle_textholder)

	world.camera.cursor.addChild(recipe_container);
	recipe_container.show();


	//Steak Recipe HUD
	steak_container = new Container3D({});
	steak_button = new Plane({
    x:1,y:0.5,z:-0.5,
    red:255,green:0,blue:0,
    width:1,height:1.5,depth:1,
		clickFunction: function(me){

			console.log("REcipe clicked");
			steak_container.hide()
			recipe_container.show();


		}
  })
	steak_textholder = new Plane({

			x: 1, y: 0.5, z: -0.5,
			width: 1, height: 1,
			red: 255, green: 255, blue: 255

	})
	steak_textholder.tag.setAttribute('text','value: Steak Recipe: \n\n 1. Get the steak from the fridge \n 2. Salt and paper the meat \n 3. Place the meat on the pan \n 4. Flip it between 9 - 12 seconds \n 5. Plate it after 7 - 10 after step 4. \n 6. Enjoy your delicious food :); color: rgb(0,0,0); align: center;');

	steak_container.addChild(steak_button);
	steak_container.addChild(steak_textholder)
	world.camera.cursor.addChild(steak_container);
	steak_container.hide();

	//Noodle Recipe HUD
	noodle_container = new Container3D({});
	noodle_button = new Plane({
    x:-1,y:0.5,z:-0.5,
    red:255,green:0,blue:0,
    width:1,height:1.5,depth:1,
		clickFunction: function(me){

			console.log("REcipe clicked");
			noodle_container.hide()
			recipe_container.show();


		}
  })
	noodle_textholder = new Plane({

			x: -1, y: 0.5, z: -0.5,
			width: 1, height: 1,
			red: 255, green: 255, blue: 255

	})
	noodle_textholder.tag.setAttribute('text','value: Noodle Recipe: \n\n 1. Get the pot at the sink \n 2. Pour water in the pot \n 3. Place the pot on the stove \n 4. Wait until it boils \n 5. Put noodle in the pot and wait 6-10 seconds \n 6. Enjoy your delicious food :); color: rgb(0,0,0); align: center;');

	noodle_container.addChild(noodle_button);
	noodle_container.addChild(noodle_textholder)
	world.camera.cursor.addChild(noodle_container);
	noodle_container.hide();

	world.camera.cursor.show();


	// // box primitive
	var ingredient_box = new Box({
		x:0,y:1,z:0,
		width:1, height: 1, depth: 1,
		red:0, green:255, blue:0,
		clickFunction: function(me){
			console.log("Move to ingredient station");

			}
	});
	world.add(ingredient_box);
	ingredient_box.rotateY(90)


	var stove_box = new Box({
		x:-5,y:1,z:0,
		width:1, height:1, depth:1,
		red:255, green:0, blue:0,
		clickFunction: function(me){

			console.log("Move to stove station");

			}
	});
	world.add(stove_box);
	stove_box.rotateY(90)

	var sink_box = new Box({
		x:5,y:1,z:0,
		width: 1, height:1,depth:1,
		red:0, green:0, blue:255,
		clickFunction: function(me){

			console.log("Move to sink station");

			}
	});
		world.add(sink_box);

	var floor = new Plane({
		x:0, y:0, z:0,
		width:100, height:100,
		red:120, green:120, blue:120,
		rotationX:-90, metalness:0.25,
		asset: "floor",
		repeatX: 50,
		repeatY: 50
	});

	// add the plane to our world
	world.add(floor);
}

function draw() {
	if(mouseIsPressed){
	}
}
