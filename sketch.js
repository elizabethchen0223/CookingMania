// PROBLEMS THAT STILL NEEDS SOLVING：
// - clicking on the cutting board will whatever items that were already there disappear
// 

var world
var camX = 0
var camY = 1.8
var camZ = 5

//************* HUD field
var recipe_container = ["tomato slice","lettuce shred","bread","beef"]		//temporary recipe holder for a hamburger

var recipe_container, recipe_show_button, recipe_textholder
var recipe_opened_container,recipe_close_button,recipe_close_textholder
var recipe_detail
var holdingitem_show_box
var holdingitem_show_box_img

var score = 0
var remaining_time = 10
var score_holder

//************* UI 
var selected_items 					// user's current selection
var selected_items_name
var save_items, save_items_name

var clearSelectionBtn, selectionUI
var clearSelection = false

var warning, warning_msg

//*************** Customer field
var customers_list = []
var astronaut, astronaut2, r2d2, puppy;
var customerx,customerycustomerz;
var customer_order, current_customer
var customer_order_list = []
var customer_hitbox;

//*************** Interactable Objects 1: objects that implement actions
var pot, pan, knife
var ketchup, hotSauce

// *************** Interactable Objects 2: ingredients (objects that can have actions implemented on)
var tomato, tomato_slice, cheese, bread
var ingredients = []				// array of objects that actions can implement on; 
									// this should only be those that can be displayed on cutting board

//*************** Interactable Objects 3: objects that action will take place
var board_stack = 0.9
var plate, cuttingBoardBox, menu_stand, trashCan
var cuttingBoard
var cutting_board_item = []


//*************** Decorative / Stationary Objects 
var _floor, counter, wall1, wall2, wall3, wall4, wall5, wall6
var stove, fridgeBox, shelf
var plant1, basket1, basket2,basket3

//************* Action field
var holdingitem	= knife			// item that we are currently holding
var holding_item_name		// item name that we are currently holding
var container_holding_item
var holding = false		   	// is there an item in our hands?
var clicked = false
var stove_clicked = false

//variable for noodles
var noodle_clicked = false
var pot_clicked = false
var boiled = false
var noodle_in_pot = false
var water_filled = false
var water
var pasta1, pasta2, soup, egg1
var bubble=[]
var egg_clicked = false
var egg_in_pot = false
var noodle_prepared
var noodle_finished = false
var bubbled = false
var plate_clicked = false



// variable for specific tools 
var knife_clicked = false		// keep track of knife

// order check
var food_in_plate = []
var food_in_plate_name = []
var dish_clicked = false

var iscorrect_food = false



<<<<<<< HEAD


// ****************************** SETUP() ******************************
// ---------------------------------------------------------------------
=======
//sound
var stove_click, boil, cut_tomato, food_to_plate, fridge_close, fridge_open, egg_cracking, eating
var garbage, putting_cheese_on, sauce, switch_on, background_music, fry_oil, water_pouring


//preload sounds
function preload(){
	stove_click = loadSound("resources/sounds/open_oven.wav")
	boil = loadSound("resources/sounds/boil.wav")
	cut_tomato = loadSound("resources/sounds/cut_tomato.wav")
	food_to_plate = loadSound("resources/sounds/food_to_plate.wav")
	fridge_close = loadSound("resources/sounds/fridge_close.wav")
	fridge_open = loadSound("resources/sounds/garbage.wav")
	garbage = loadSound("resources/sounds/garbage.wav")
	putting_cheese_on = loadSound("resources/sounds/putting_cheese_on.wav")
	sauce = loadSound("resources/sounds/sauce.wav")
	switch_on = loadSound("resources/sounds/switch.wav")
	background_music = loadSound("resources/sounds/background_music.wav")
	fry_oil = loadSound("resources/sounds/fry_oil.wav")
	water_pouring = loadSound("resources/sounds/water_pouring.wav")
	egg_cracking = loadSound("resources/sounds/egg_cracking.wav")
	eating = loadSound("resources/sounds/eating.mp3")
}




>>>>>>> 7926a081a50ea8ee48639971d5e8c95c67f7516f
function setup() {
	background_music.loop()
	noCanvas();
	world = new World('VRScene');

	let recipex = -1.5;
	let recipey = 0.5;
	let recipez = -0.1;

	// Ajust Camera
	world.setUserPosition(camX,camY,camZ)
	world.camera.holder.removeAttribute('wasd-controls')


	// ***************Check recipe button**************
	recipe_container = new Container3D({
		x:recipex
	});
	recipe_show_button = new Plane({
		x:0, y:recipey,z:recipez,
		red:255,green:0,blue:0,
		width:1,height:0.5,depth:1,
		clickFunction: function(me){

			console.log("Show Recipe");
			recipe_opened_container.setY(0);
			recipe_opened_container.show()
			recipe_container.hide();
			recipe_container.setY(-100);
		}
	})
	recipe_textholder = new Plane({
		x:0, y:recipey,z:recipez,
		width: 1, height: 0.3,
		red: 255, green: 255, blue: 255,
		clickFunction: function(me){

			console.log("Show Recipe");
			recipe_opened_container.setY(0);
			recipe_opened_container.show()
			recipe_container.hide();
			recipe_container.setY(-100);
		}

	})
	recipe_textholder.tag.setAttribute('text','value: Check Recipe; color: rgb(0,0,0); align: center;');
	recipe_container.addChild(recipe_show_button);
	recipe_container.addChild(recipe_textholder);
	world.camera.cursor.addChild(recipe_container);

	//******************** When recipe is opend
	recipe_opened_container = new Container3D({
		x:recipex,
		y: -100
	});
	recipe_close_button = new Plane({
		x:0, y:recipey,z:recipez,
		red:255,green:0,blue:0,
		width:1,height:0.5,depth:1,
		clickFunction: function(me){

			console.log("close Recipe");
			recipe_container.setY(0);
			recipe_container.show()
			recipe_opened_container.hide();
			recipe_opened_container.setY(-100);
		}
	})
	recipe_close_textholder = new Plane({

		x:0, y:recipey,z:recipez,
		width: 1, height: 0.3,
		red: 255, green: 255, blue: 255,
		clickFunction: function(me){

			console.log("close Recipe");
			recipe_container.setY(0);
			recipe_container.show()
			recipe_opened_container.hide();
			recipe_opened_container.setY(-100);
		}

	})
	recipe_close_textholder.tag.setAttribute('text','value:' +recipe_detail+ ' ; color: rgb(0,0,0); align: center;');
	recipe_opened_container.addChild(recipe_close_button);
	recipe_opened_container.addChild(recipe_close_textholder);
	world.camera.cursor.addChild(recipe_opened_container);
	recipe_opened_container.hide();


	//************************ Hold Item Show box
	holdingitem_show_box = new Plane({
		x:0,y:0.5,z:0,
		width:0.2,
		height:0.2
	})
	remaining_time = int(random(15,30))

	score_holder = new Plane({
		x:0,y:0.7,z:0,
		red:186,green:255,blue:201,
		width:1,
		height:0.2
	})
	score_holder.tag.setAttribute('text','value: Score: ' +score+  '\n Remaining Time: '+remaining_time+' ; color: rgb(0,0,0); align: center;');

	world.camera.cursor.addChild(holdingitem_show_box);
	world.camera.cursor.addChild(score_holder);

	//show the HUD
	world.camera.cursor.show();

<<<<<<< HEAD

=======
	// Ajust Camera
	world.setUserPosition(camX,camY,camZ)
	//world.camera.holder.removeAttribute('wasd-controls')
>>>>>>> 7926a081a50ea8ee48639971d5e8c95c67f7516f

	//  ******** CUSTOMERS ********
	customerx = 3
	customery = 1
	customerz = 5

	r2d2 = new Customer("r2d2_obj","r2d2_mtl",0,-0.5,0,190,1,"r2d2")
	puppy = new Customer("puppy_obj","puppy_mtl",0,0,0,40,3,"puppy")
	astronaut = new Customer("astronaut_obj","astronaut_mtl",0,-1,0,-90,0.5,"astronaut")
	astronaut2 = new Customer("astronaut2_obj","astronaut2_mtl",0,0,0,120,0.5,"astronaut2")

	customers_list.push(r2d2)
	customers_list.push(puppy)
	customers_list.push(astronaut)
	customers_list.push(astronaut2)

	current_customer = random(customers_list);
	current_customer.add_to_world()

	customer_order_list = ["Steak","Noodle","Sandwich"]
	customer_order = random(customer_order_list);
	console.log(customer_order);




	//  ******** SETTING ********
		// FLOOR
		_floor = new Plane({
			x:0, y:0, z:0,
			width:20, height:30,
			red:120, green:120, blue:120,
			rotationX:-90, metalness:0.25,
			asset: "floor",
			repeatX: 50,
			repeatY: 50
		});
		// world.add(_floor);


	//  ******** COUNTER ********
		counter = new Ring({
			x:0, y:0.9, z:5,
			radiusInner: 0.35,
			radiusOuter: 2,
			red:200, green: 157, blue:105,
			rotationX: -90,
			asset:"wood"
		})
		world.add(counter);
		//Counter walls: 		x,		z,		rotateY
		wall1 = new Walls (0,		4.646,	0)
		wall2 = new Walls (-0.339,	4.803,	50)
		wall3 = new Walls (-0.359,	5.156,	125)
		wall4 = new Walls (0,		5.353,	180)
		wall5 = new Walls (0.326,	4.803,	-50)
		wall6 = new Walls (0.326,	5.156,	-125)


	// ******** SERVING AREA ********
		// PLATE: see clickFunction in class Interactables 
		plate = new Interactables('dish_obj','dish_mtl',	0.85, 0.94, 5.13,	1.5,1.5,1.5,	0,0,0,	0.5,0.3,0.5,	'plate')
	

<<<<<<< HEAD
		// mat
		var mat = new Plane ({
			x:0.87, y:0.91, z:5.13,
			width:0.8, height:1,
			rotationX:-90, rotationZ:0,
			asset: "servingMat"
		})
		world.add(mat)

=======
>>>>>>> 7926a081a50ea8ee48639971d5e8c95c67f7516f
		var blanket = new Plane ({
			x:-0.92, y:0.91, z:4.13,
			width:0.8, height:1,
			rotationX:-90, rotationY:-30,
			asset: "blanket"
		})
		world.add(blanket)


	//  ******** APPLIANCES ********
	// FRIDGE ---------------
		// fridge (see Fridge Class) : interactable
		fridge = new Fridge()
		// fridgeBox = new Objects('fridge_obj', 'fridge_mtl', 0, 1.27, 5.9, 1,1,1, 0,90,0)
		// var fridgeDoorClosed = new Objects('fridgeDoor_obj', 'fridgeDoor_mtl', -0.15, 1.34, 5.74, 1,1,1, 0,220,0)
		// var fridgeDoorOpen = new Objects('fridgeDoor_obj', 'fridgeDoor_mtl', 0.403, 1.34, 5.55, 1,1,1, 0,80,0)

	// ******** COOKING AREA ********
		stove = new Box({
			x:-0.93, y:0.91, z:5.28,
			width:1, height:0.76, depth:0.03,
			rotationX:-90, rotationY:100,
			asset: "stove",
			clickFunction: function(theBox) {
				stove_clicked = true
				console.log("stove was clicked!")
			}
		})
		world.add(stove)

<<<<<<< HEAD
		pot = new Objects('pot_obj','pot_mtl',-0.95,0.94,5.04,0.008,0.01,0.008,0,300,0,"pot")
		pan = new Objects('pan_obj','pan_mtl',-0.66,1,5.49,1,1,1,0,270,0,"pan")
=======
		
		pot = new Interactables('pot_obj','pot_mtl',-0.95,0.94,5.04,0.008,0.01,0.008,0,300,0,-0.95,0.94,5.04,0,0,0,0.5, "pot")
//!-------------------------
		//pot = new Objects('pot_obj','pot_mtl',-0.95,0.94,5.04,0.008,0.01,0.008,0,300,0,"pot")
		var pan = new Objects('pan_obj','pan_mtl',-0.66,1,5.49,1,1,1,0,270,0,"pan")
>>>>>>> 7926a081a50ea8ee48639971d5e8c95c67f7516f


	//  ******** PREPARATION AREA ********
		// cutting board
		cuttingBoard = new Box ({
			x:0, y:0.91, z:4.23,
			width:1.21, height:0.9, depth:0.03,
			scaleX:0.5,scaleY:0.5,scaleY:0.5,
			rotationX: -90,
			asset:'boardPattern'
		})

		cuttingBoardBox = new Box({
			x:0, y:1.04, z:4.27,
			width:0.54, height:0.4, depth:0.21,
			scaleX:0.5,scaleY:0.5,scaleY:0.5,
			opacity: 0.8,
			clickFunction: function(theBox){
				// if use has selected an item
				if(selected_items != undefined){

					// put the saved selected item in the box
					if(knife_clicked == false){
						// if the cutting board is not occupied 
						// - prevent user from adding more stuff when cutting board already has other itens
						if(save_items == undefined){
							// place sepcific item in center
							if(selected_items_name == 'tomato' || selected_items_name == 'cheese' ){
								save_items = selected_items 
								save_items_name = selected_items_name
								save_items.setPosition(theBox.x,theBox.y,theBox.z)
								console.log("voila")
							}
						}						
					}else{
						// iniate the animation of cutting
						// knife.utensil.hide()
						// selected_items.rotateX(0)
						// selected_items.setPosition(0.08,1,4.4)

						// tomato - show tomato slice
						if(save_items_name == "tomato"){
                            // hide state before cutting
                            save_items.hide()
                            // substitute the product
                            save_items = new Objects('tomatoSlice_obj', 'tomatoSlice_mtl', -0.05,0.93,4.25, 0.15,0.15,0.15,	0,0,0, "tomato slice")
                            tomato_slice = save_items
							save_items_name = save_items.name
							save_items.show()
						}
		
					}
					world.add(save_items)
                // user has not selected an item
                }else {
                    // check to see if there is item on the cutting board already
                    // save_items defines what was previously on the board
					if(save_items != undefined){
						// if so, selected item becomes the previously saved item
						selected_items = save_items
						selected_items_name = save_items_name
					}
				}
				console.log("You clicked on the cutting board!")
			}
		
		})

		world.add(cuttingBoard)
		world.add(cuttingBoardBox)


		knife = new Interactables('knife_obj','knife_mtl',	0.378, 0.84,4.35,	0.0015,0.0015,0.0015,	90,90,0,	0.25,0.2,0.42, "knife")
		// menu_stand = new Objects('menuStand_obj','menuStand_mtl', 0.89,1.1,4.2, 0.34,0.34,0.28, 0,130,0,"menu_stand")



	// ******** SPICE SHELF ********
		// spice shelf
<<<<<<< HEAD
		shelf = new Objects('shelf_obj','shelf_mtl',0,0.84,3.64,0.99,0.63,0.72,0,0,0,"shelf")
		ketchup = new Objects('ketchup_obj','ketchup_mtl',-0.51,1,4.17,0.0003,0.0003,0.0003,0,60,0,"ketchup")
		trashCan =  new Interactables('trashCan_obj','trashCan_mtl',	0.28,0.112,4.979,	0.002,0.002,0.002,	0,0,0,	0.3,0.3,0.3, "Trash Can")
		hotSauce =  new Objects('hotSauce_obj','hotSauce_mtl',-0.22,1.18,3.75,0.3,0.3,0.3,0,180,0,"hotSauce")

		// ingredients 
		bread= new Objects('bread_obj','bread_mtl',		-1.13,1,4.276,	1,1,1,	-80,30,0,	"bread")
		tomato= new Interactables('tomato_obj','tomato_mtl',	-0.5,1.45,3.64,	0.005,0.005,0.005,	-90,0,0, 0.3,0.3,0.3,	"tomato")
		cheese = new Box({
=======
		var shelf = new Objects('shelf_obj','shelf_mtl',0,0.84,3.64,0.99,0.63,0.72,0,0,0,"shelf")
		var ketchup = new Objects('ketchup_obj','ketchup_mtl',-0.51,1,4.17,0.0003,0.0003,0.0003,0,60,0,"ketchup")
		var trashCan =  new Objects('trashCan_obj','trashCan_mtl',0.28,0.112,4.979,0.002,0.002,0.002,0,0,0,"trashCan")
		var hotSauce =  new Objects('hotSauce_obj','hotSauce_mtl',-0.22,1.18,3.75,0.3,0.3,0.3,0,180,0,"hotSauce")

		// ingrediants
		var bread= new Interactables('bread_obj','bread_mtl',		-1.13,1,4.276,	1,1,1,	-80,30,0,	-1.13,1,4.276,	-80,30,0,0.3,	"bread")
		// 	_asset,		_mtl,			x,	y,	z,		sX,sY,sZ,_rotationX,_rotationY,_rotationZ,	hitboxX,hitboxY,hitboxZ, hitRotationX, hitRotationY, hitRotationZ, hitBozScale,_name
		var tomato= new Interactables('tomato_obj','tomato_mtl',	-0.5,1.45,3.64,	0.005,0.005,0.005,	-90,0,0,  -0.5,1.47,3.78,0,0,0,0.3,	"tomato")
		
		var egg = new Interactables('egg_obj', 'egg_mtl', -0.172, 1.382, 5.97, 0.001,0.001,0.001, -80,30,0,	-0.172, 1.390, 5.97,0,0,0,0.2, "egg")

		var noodle = new Container3D({
		})

		world.add(noodle)

		for (var i =0;i<5;i++){

			var pasta = new TorusKnot({
				x:-0.172+0.03*i, y:1.200+0.001*i, z:5.97,
				width:0.1,	height:0.08, depth: 0.13,
				red:244, green:188, blue:25,
				scaleX:0.02, scaleY:0.02, scaleZ: 0.02,
				rotationX:0.1+0.05*i, rotationY:0.1 +0.05*i, rotationZ:0.1+0.05*i,
				clickFunction: function(theBox) {
					console.log("NOODLE!");
					selected_items_name = "noodle"
					if(holding == false){
						holding = true
						holdingitem_show_box.setAsset("noodle_hold")
						noodle_clicked = true

							selected_items = new Box({
								width:0.2,
								height:0.02,
								depth:0.2,
								red:255,green:255,blue:0,
								rotationX: 0
							})
						}
					// if user would like to put back the item
					else {
						holding = false
						holdingitem_show_box.setAsset("")

						holdingitem.hide()
						holding_item_name = ''
					}
					console.log("noodle was clicked!")
				}
			})
			noodle.add(pasta)
		}


		var cheese = new Box({
>>>>>>> 7926a081a50ea8ee48639971d5e8c95c67f7516f
			x:0.072, y:1.387, z:5.97,
			width:0.07,	height:0.05, depth: 0.13,
			red:244, green:208, blue:63,
			clickFunction: function(theBox) {
				selected_items_name = "cheese"
				if(holding == false){
					holding = true
					holdingitem_show_box.setAsset("cheese_hold")

						selected_items = new Box({
							width:0.2,
							height:0.02,
							depth:0.2,
							red:255,green:255,blue:0,
							rotationX: 0
						})
					}
				// if user would like to put back the item
				else {
					holding = false
					holdingitem_show_box.setAsset("")
					holdingitem.hide()
					holding_item_name = ''
				}
				console.log("cheese was clicked!")
			}
		})
		world.add(cheese)

		ingredients.push('tomato', 'cheese')
	

	// ******** DECORATIONS ********
		plant1 = new Objects('plant1_obj','plant1_mtl',		1.26,0.88,4.24,		0.1,0.1,0.1,	0,0,0)
		basket1 = new Objects('basket_obj','basket_mtl',	-0.86,1,4.48,		0.5,0.5,0.5,	0,0,0)
		basket2 = new Objects('basket_obj','basket_mtl',	-0.72,1,4.27,		0.5,0.5,0.5,	0,0,0)
		basket3 = new Objects('basket_obj','basket_mtl',	-0.58,1,4.05,		0.5,0.5,0.5,	0,0,0)
			// *** below baskets seem to be too computationally expensive, 
			// *** might consider remove/change them
			// var basket4 = new Objects('basket2_obj','basket2_mtl',	-1.18,0.89,4.26,	0.0001,0.0001,0.0001,	-90,90,0)
			// var basket5 = new Objects('basket2_obj','basket2_mtl',	-0.957,0.89,3.81,	0.0001,0.0001,0.0001,	-90,90,0)


		//  var test = new Objects('tomatoSlice_obj', 'tomatoSlice_mtl', -0.05,0.93,4.25, 0.15,0.15,0.15,	0,0,0)
		// world.add(test)
		


		//Action init: Select Tools
		// 	//remove the default cursor
			// world.camera.holder.removeChild( world.camera.cursor.tag );

	
	// ****************************** UI ******************************
		// clear selection button
		clearSelectionBtn = new Plane({
			x:0.6, y:0.5, z:-0.8,
			red:185,green:190,blue:195, opacity: 0.8,
			width:0.5, height:0.1,
			clickFunction: function(thePlane){
				console.log("Clear Selection!")
			
				if(knife_clicked){
					knife_clicked = false
					knifeMovement()
				}			
				else{
					selected_items = undefined
					selected_items_name = undefined
				}

<<<<<<< HEAD
			}
		})
		clearSelectionBtn.tag.setAttribute('text','value: Clear Selection ; color: rgb(0,0,0); align:center; height: 1; width:1;')


		// show user's current selection 
		selectionUI = new Plane ({
			x:-0.6, y:0.5, z:-0.8,
			red:185,green:190,blue:195, opacity: 0.8,
			width:0.8, height:0.1
		})
		selectionUI.tag.setAttribute('text','value: You have not selected anything; color: rgb(0,0,0); align:center; height: 1; width:1;')

		// add Btns to the HUD
		selectionUI.tag.setAttribute('cursor','rayOrigin: mouse')		
		world.camera.holder.appendChild(selectionUI.tag);
		world.camera.holder.appendChild(clearSelectionBtn.tag);
=======
	//Action init: Select Tools
>>>>>>> 7926a081a50ea8ee48639971d5e8c95c67f7516f




}



// ****************************** DRAW() ******************************
// ---------------------------------------------------------------------
function draw() {
	
	if(frameCount%60 == 0){
		score_holder.tag.setAttribute('text','value: Score: ' +score+  '\n Remaining Time: '+remaining_time+' ; color: rgb(0,0,0); align: center;');

		remaining_time -= 1
		if(remaining_time <= 0){

			current_customer.remove_from_world()
			let prev_customer = current_customer
			while(prev_customer == current_customer){
				current_customer = random(customers_list);
			}
			set_random_customer_order()
			current_customer.add_to_world()
			remaining_time = int(random(15,30))
			score -= 1
			score_holder.tag.setAttribute('text','value: Score: ' + score +  '\n Remaining Time: ' + remaining_time + ' ; color: rgb(0,0,0); align: center;');
		}
	}

	if (bubbled == false){
	// ******** EFFECTS ********
		for (var i =0;i<3;i++){
			var bubbles = new Bubbles(-0.95,0.94,5.04)
			bubble.push(bubbles)
		}
		bubbled = true
	}

	if (stove_clicked == true && noodle_in_pot == true && water_filled == true && egg_in_pot == true){
		if (boil.isPlaying()==false){
			boil.play()
		}
		for (var i = 0; i < bubble.length; i++) {
			console.log("bubbling!!")
			var result = bubble[i].move();
			if (result == "gone") {
				bubble.splice(i, 1);
				i-=1;
			}
		}
		if (bubble.length == 0){
			boiled = true
		}
	}


	// move the holding item correspondingly following the mouse
	if(knife_clicked){
		holdingitem.setX(map(mouseX,0,windowWidth,-1,1))
		holdingitem.setY(map(mouseY,0,windowHeight,-0.5,0.5) * -1)
	}

	
	// update selection UI
	if(selected_items_name == undefined ){
		selectionUI.tag.setAttribute('text','value: You have not selected anything; color: rgb(0,0,0); align:center; height: 1; width:1;')
	}else{
		selectionUI.tag.setAttribute('text','value: You selected : '+ selected_items_name + ';  color: rgb(0,0,0); align:center; height: 1; width:1;')
	}

}



// ****************************** FUNCTIONS ******************************
// ---------------------------------------------------------------------
function set_random_customer_order(){
	customer_order = random(customer_order_list);

	if(customer_order == "Steak"){
		recipe_detail = "The Customer wants a Steak"

	}
	else if(customer_order == "Noodle"){
		recipe_detail = "The Customer wants some Noodles \n\n Get the pasta and the egg from the frige \n Put them into the pot \n Boil them"
	}
	else if(customer_order == "Sandwich"){
		recipe_detail = "The Customer wants a Sandwich \n\n Get the bread on the cutting board \n Get the tomato on the cuttin board \n Get the cheese on the cutting board \n Get the bread on the cutting board"
	}
	recipe_close_textholder.tag.setAttribute('text','value:' +recipe_detail+ ' ; color: rgb(0,0,0); align: center;');
}

function check_recipe(){
	if(customer_order == "Steak"){

	}
	else if(customer_order == "Sandwich"){
		if(food_in_plate[0] != "bread" && food_in_plate[1] != "tomato" && food_in_plate[2] != "cheese", food_in_plate[3] != "bread"){

			food_in_plate = []
			for(let i = 0; i < cutting_board_item.length; i++){
				world.remove( cutting_board_item[i])
			}
			cutting_board_item = []
			console.log(food_in_plate);
			console.log(cutting_board_item);
			console.log("wrong food");
			iscorrect_food = false
			score -= 1
			score_holder.tag.setAttribute('text','value: Score: ' +score+  '\n Remaining Time: '+remaining_time+' ; color: rgb(0,0,0); align: center;');
		}
		else{
			score += remaining_time * 3
			food_in_plate = []
			for(let i = 0; i < cutting_board_item.length; i++){
				world.remove( cutting_board_item[i])
			}
			cutting_board_item = []
			iscorrect_food = true
			console.log("GOOD JOB");
			score_holder.tag.setAttribute('text','value: Score: ' +score+  '\n Remaining Time: '+remaining_time+' ; color: rgb(0,0,0); align: center;');

		}
	}
	else if(customer_order == "Noodle"){
		if (noodle_finished ==  true){
			iscorrect_food = true
			score += remaining_time * 3
			console.log("GOOD JOB");
			score_holder.tag.setAttribute('text','value: Score: ' +score+  '\n Remaining Time: '+remaining_time+' ; color: rgb(0,0,0); align: center;');
		}
		else{
			iscorrect_food = false
			score -= 1
			score_holder.tag.setAttribute('text','value: Score: ' +score+  '\n Remaining Time: '+remaining_time+' ; color: rgb(0,0,0); align: center;');
		}

	}
}
<<<<<<< HEAD

function plateFunction(theBox){

	console.log("you clicked plate")

	// if user has selected an item
	if(selected_items != undefined){
		// tomato slice - put on plate
		if(save_items_name == "tomato slice"){

			save_items.utensil.hide()
			tomato_slice.utensil.setPosition(0.77, 0.93, 5.13)
			tomato_slice.utensil.show()

			// clear save_items
			save_items = undefined
			save_items_name = undefined

			// add ingredient to the plate array
			food_in_plate.push(tomato_slice)
			food_in_plate_name.push(tomato_slice.name)

			world.add(tomato_slice)
		}
		// check to see if the plate has what we need to complete a recipe
		else if(selected_items_name == "plate"){
			console.log("in checking step")

			warning = true
			warning_msg = "Sorry, wrong ingredient"
		}
			
	}else{
		console.log("in checking step")
		// console.log(food_in_plate_name)
		var currentlyLack = []
		
		for(let i=0; i < recipe_container.length; i ++){
			
			for(let j=0; j<food_in_plate_name.length; j++){
				if(food_in_plate_name[j] != recipe_container[i]){
					currentlyLack.push(recipe_container[i])
				}
			}
		}

		if(currentlyLack.length == 0){
			console.log("You have all the ingrediants for a hamburger")
		}else{
			console.log("You still need more ingrediants")
		}
		
		// console.log(recipe_container, food_in_plate_name)

	}

		
}

function knifeMovement(){

	if(knife_clicked){
		// hide origianl knife
		knife.utensil.hide()
		holdingitem = new Objects('knife_obj','knife_mtl',	0.378, 0.84,4.35,	0.0015,0.0015,0.0015,	90,90,0, "knife").utensil

		//set the position and rotation to look natural
		holdingitem.setPosition(0,-0.2,-0.5)
		holdingitem.setRotation(0,0,0)
		holdingitem.rotateY(100)

		//set this as a cursor
		holdingitem.tag.setAttribute('cursor', 'rayOrigin: mouse');
		world.camera.holder.appendChild(holdingitem.tag);

	}
	else{
		
		// remove knife from the cursor camera
		world.camera.holder.removeChild(holdingitem.tag);
		knife.utensil.show()			// show original knife
		holdingitem.hide()				
		holdingitem = undefined

		// clear selection
		selected_items = undefined
		selected_items_name = undefined

		world.remove(holdingitem)		// remove cursor knife - prevent overloading the browser
=======
// CLASSES ----------------------------------------------------------------------
class Bubbles{

	constructor(x,y,z) {

		this.myBox = new Sphere({
			x:x+random(0.035, 0.045), y:y-0.2+random(0.15, 0.22), z:z+random(0.01, 0.05),
			red: 255, green:230, blue:random(170,180),
			radius: 0.015
		});

		world.add(this.myBox);

		this.xOffset = random(1000);
		this.zOffset = random(2000, 3000);
	}

	move() {

		var yMovement = 0.001;
		var xMovement = map( noise(this.xOffset), 0, 1, -0.001, 0.001);
		var zMovement = map( noise(this.zOffset), 0, 1, -0.001, 0.001);

		this.xOffset += 0.01;
		this.yOffset += 0.01;


		this.myBox.nudge(xMovement, yMovement, zMovement);

		var boxScale = this.myBox.getScale();
		this.myBox.setScale( boxScale.x-0.0025, boxScale.y-0.0025, boxScale.z-0.0025);

		if (boxScale.x <= 0) {
			world.remove(this.myBox);
			return "gone";
		}
		else {
			return "ok";
		}
>>>>>>> 7926a081a50ea8ee48639971d5e8c95c67f7516f
	}
}


<<<<<<< HEAD

// ****************************** CLASSES ******************************
// ---------------------------------------------------------------------
=======
>>>>>>> 7926a081a50ea8ee48639971d5e8c95c67f7516f
class Walls {
	constructor(x,z,yrotate){
		this.wall = new Plane({
			x:x,y:0.430,z:z,
			width:0.480, height:0.93,
			red:168, green: 131, blue:86,
			rotationY:yrotate,
			asset:'wood'
		})
		world.add(this.wall)
	}
}

//***Error: unable to display even though everything works fine if not in a container
class Fridge {

	constructor(){
		this.isclose = true
		this.hitboxsize = 0.35
		this.myContainer = new Container3D({
			x:0, y:0, z:0
		})
		this.fridgeBox = new OBJ({
			asset:'fridge_obj',
			mtl: 'fridge_mtl',
			x:0, y:1.27, z:5.9,
			scaleX: 1, scaleY:1, scaleZ:1,
			rotationX:0,
			rotationY:90
		})
		this.fridgeDoorClosed = new OBJ({

			asset:'fridgeDoor_obj',
			mtl: 'fridgeDoor_mtl',
			x:-0.15, y:1.34, z:5.74,
			scaleX: 1, scaleY:1, scaleZ:1,
			rotationX:0,
			rotationY:220
		})
		this.fridgeDoorOpen = new OBJ({

			asset:'fridgeDoor_obj',
			mtl: 'fridgeDoor_mtl',
			x:0.403, y:1.34, z:5.55,
			scaleX: 1, scaleY:1, scaleZ:1,
			rotationX:0,
			rotationY:80
		})
		this.hitbox_close = new Box({

			x:-0.05, y:1.34, z:5.74,
			scaleX: this.hitboxsize, scaleY:this.hitboxsize+0.2, scaleZ:this.hitboxsize,
			rotationX:0,opacity:0.5,
			clickFunction: function(me){
				fridge.Open_Door()

			}

		})
		this.hitbox_open = new Box({

			x:0.35, y:1.34, z:5.55,
			scaleX: this.hitboxsize, scaleY:this.hitboxsize+0.2, scaleZ:this.hitboxsize,
			rotationX:0,
			rotationY:220,opacity:0.5,
			clickFunction: function(me){
				fridge.Close_Door()

			}

		})


	  this.myContainer.addChild(this.fridgeBox)
  	this.myContainer.addChild(this.fridgeDoorClosed)
		this.myContainer.addChild(this.fridgeDoorOpen)
		this.myContainer.addChild(this.hitbox_close)
		this.myContainer.addChild(this.hitbox_open)
		this.fridgeDoorOpen.hide()
		this.hitbox_open.hide()
		this.hitbox_close.hide()
		this.hitbox_open.setY(-100)

		world.add(this.myContainer)
	}
	Open_Door(){
		if (fridge_open.isPlaying()==false){
			fridge_open.play()
		}
		this.fridgeDoorOpen.show()
		this.fridgeDoorClosed.hide()
		this.fridgeDoorClosed.setY(-100)

		this.hitbox_open.setY(1.34)
		this.hitbox_close.setY(-100)
		this.isclose = false;
	}
	Close_Door(){
		if (fridge_close.isPlaying()==false){
			fridge_close.play()
		}
		this.fridgeDoorOpen.hide()
		this.fridgeDoorClosed.show()
		this.fridgeDoorClosed.setY(1.34)

		this.hitbox_open.setY(-100)
		this.hitbox_close.setY(1.34)
		this.isclose = true
	}
}

// display statioanry/decorative objects
class Objects {
	constructor(_asset,_mtl,x,y,z,sX,sY,sZ,_rotationX,_rotationY,_rotationZ,_name){

		this.name = _name
		this.utensil = new OBJ({
			asset:_asset,
			mtl: _mtl,
			x:x, y:y, z:z,
			scaleX: sX, scaleY:sY, scaleZ: sZ,
			rotationX:_rotationX,
			rotationY:_rotationY,
			rotationZ:_rotationZ,
			clickFunction: function(me){
				console.log(pot.name);
			}
		})
		world.add(this.utensil)
	}

}

// interactable objs
class Interactables {
	constructor(_asset,_mtl,	x,y,z,	sX,sY,sZ,	_rotationX,_rotationY,_rotationZ,	hitBozScaleX,hitBozScaleY,hitBozScaleZ,	_name){
		this.container = new Container3D({
			// blank
		})

		this.name = _name

		this.utensil = new OBJ({
			asset:_asset,
			mtl: _mtl,
			x:x, y:y, z:z,
			scaleX: sX, scaleY:sY, scaleZ: sZ,
			rotationX:_rotationX,
			rotationY:_rotationY,
			rotationZ:_rotationZ
		})
		this.container.add(this.utensil)

		this.hitbox = new Box({
			x: x,
			y: y,
			z: z,
			scaleX: hitBozScaleX,
			scaleY: hitBozScaleY,
			scaleZ: hitBozScaleZ,

			red:255,
			opacity: 0.8,


			clickFunction: function(theBox){
				// update selected item
					// unable to refer to the obejct directly via this.utensil
					// therefore have to create another obj 
				selected_items = new OBJ({asset:_asset,
					mtl: _mtl,
					x:x, y:y, z:z,
					scaleX: sX, scaleY:sY, scaleZ: sZ,
					rotationX:_rotationX,
					rotationY:_rotationY,
					rotationZ:_rotationZ
				})						

				// update current selection name
				selected_items_name = _name

<<<<<<< HEAD
=======

				if(selected_items_name != 'plate'){

					// the user has seleted an item
					if(holding == false){
						holding = true

						// update holding item
							// unable to refer to the obejct directly via this.utensil
							// therefore have to create another obj

						if(selected_items_name == "tomato"){
							holdingitem_show_box.setAsset("tomato_hold")
							selected_items = new Cylinder({
								x:x, y:y, z:z,
								radius: 0.1,
								height:0.02,
								red:255,green:0,blue:0,
								rotationX: 0
							})

						}
						else if(selected_items_name == "bread"){
							holdingitem_show_box.setAsset("bread_hold")
							selected_items = new OBJ({asset:_asset,
								mtl: _mtl,
								x:x, y:y, z:z,
								scaleX: sX, scaleY:sY, scaleZ: sZ,
								rotationX:_rotationX,
								rotationY:_rotationY,
								rotationZ:_rotationZ
							})

						}

						else if(selected_items_name == "egg"){
							egg_clicked = true;
							holdingitem_show_box.setAsset("egg_hold")
							selected_items = new OBJ({asset:_asset,
								mtl: _mtl,
								x:x, y:y, z:z,
								scaleX: sX, scaleY:sY, scaleZ: sZ,
								rotationX:_rotationX,
								rotationY:_rotationY,
								rotationZ:_rotationZ
							})

						}

						else if (selected_items_name == 'pot'){
							console.log("plate_clicked: "+plate_clicked)
							//if boiled then remove from world after clicking the pot again
							if (boiled == true) {
								console.log("removed!")
	
								noodle_prepared =  new Container3D({
								})

								var noodle1_temp = new TorusKnot({
											x:0.72, y:0.98, z:5.10,
											red:244, green:188, blue:25,
											scaleX:0.02, scaleY:0.02, scaleZ: 0.02,
											rotationX:0.1, rotationY:0.1, rotationZ:0.1,
								})

								var noodle2_temp = new TorusKnot({
											x:0.79, y:0.98, z:5.14,
											red:244, green:188, blue:25,
											scaleX:0.02, scaleY:0.02, scaleZ: 0.02,
											rotationX:0.1, rotationY:0.1, rotationZ:0.1,
								})

								var noodle3_temp = new TorusKnot({
											x:0.84, y:0.98, z:5.09,
											red:244, green:188, blue:25,
											scaleX:0.02, scaleY:0.02, scaleZ: 0.02,
											rotationX:0.1, rotationY:0.1, rotationZ:0.1,
								})
								var noodle4_temp = new TorusKnot({
											x:0.82, y:0.98, z:5.11,
											red:244, green:188, blue:25,
											scaleX:0.02, scaleY:0.02, scaleZ: 0.02,
											rotationX:0.1, rotationY:0.1, rotationZ:0.1,
								})

								var noodle5_temp = new TorusKnot({
											x:0.76, y:0.98, z:5.13,
											red:244, green:188, blue:25,
											scaleX:0.02, scaleY:0.02, scaleZ: 0.02,
											rotationX:0.1, rotationY:0.1, rotationZ:0.1,
								})

								var noodle6_temp = new TorusKnot({
											x:0.81, y:0.98, z:5.16,
											red:244, green:188, blue:25,
											scaleX:0.02, scaleY:0.02, scaleZ: 0.02,
											rotationX:0.1, rotationY:0.1, rotationZ:0.1,
								})

								var noodle7_temp = new TorusKnot({
											x:0.75, y:0.98, z:5.08,
											red:244, green:188, blue:25,
											scaleX:0.02, scaleY:0.02, scaleZ: 0.02,
											rotationX:0.1, rotationY:0.1, rotationZ:0.1,
								})

								var soup_temp = new Cylinder({
									x:0.81, y:0.96, z:5.13,
									radius:0.20,
									height: 0.005,
									red:255, green:230 , blue:179
								})

								var egg_temp = new OBJ({
									asset:'egg_obj',
									mtl:'egg_mtl',
									x:0.83, y:1.01, z:5.10,
									scaleX: 0.001, scaleY:0.001, scaleZ: 0.001
								})

								noodle_prepared.addChild(egg_temp)
								noodle_prepared.addChild(noodle1_temp)
								noodle_prepared.addChild(noodle2_temp)
								noodle_prepared.addChild(noodle3_temp)
								noodle_prepared.addChild(noodle4_temp)
								noodle_prepared.addChild(noodle5_temp)
								noodle_prepared.addChild(noodle6_temp)
								noodle_prepared.addChild(noodle7_temp)
								noodle_prepared.addChild(soup_temp)


								if (food_to_plate.isPlaying()==false){
									food_to_plate.play()
								}
								world.add(noodle_prepared)
							
							

								egg1.setY(-100)
								pasta1.setY(-100)
								pasta2.setY(-100)
								water.setY(-100)

								boiled = false
								water_filled = false
								egg_in_pot = false
								noodle_in_pot = false
								bubbled = false
								noodle_finished = true
							}

							else{

								soup = new Container3D({
								})

								world.add(soup)

								if (water_filled == false){
									//one click fill the pot with water
									water = new Cylinder({
										x:x, y:y+0.08, z:z,
										red:255, green:230, blue:179,
										height: 0.10, radius: 0.130
									})

									if (water_pouring.isPlaying()==false){
										water_pouring.play()
									}

									soup.addChild(water)
									water_filled = true
									console.log("filled!")
								}

								if (egg_clicked == true && holding == true){
									if (egg_in_pot ==  false){
										egg1 = new OBJ({
											asset:'egg_obj',
											mtl:'egg_mtl',
											x:x-0.02, y:y+0.14, z:z-0.01,
											scaleX: 0.001, scaleY:0.001, scaleZ: 0.001
										})
										if (egg_cracking.isPlaying()==false){
											egg_cracking.play()
										}
										soup.addChild(egg1)
										egg_in_pot = true
										egg_clicked = false
									}
								}


								// if the user is taking the noodle
								if (noodle_clicked == true && holding ==  true){
									//put noodle into the pot
									if(noodle_in_pot == false){
										pasta1 = new TorusKnot({
											x:x, y:y+0.13, z:z,
											red:244, green:188, blue:25,
											scaleX:0.02, scaleY:0.02, scaleZ: 0.02,
											rotationX:0.1, rotationY:0.1, rotationZ:0.1,
										})
										soup.addChild(pasta1)
										pasta2 = new TorusKnot({
											x:x+0.04, y:y+0.12, z:z+0.02,
											red:244, green:188, blue:25,
											scaleX:0.02, scaleY:0.02, scaleZ: 0.02,
											rotationX:0.1+0.05, rotationY:0.1 +0.1, rotationZ:0.1+0.05,
										})
										soup.addChild(pasta2)
										noodle_in_pot = true
									}
									noodle_clicked = false
								}

								console.log("pot!")
							}
						}

						if(selected_items_name == 'knife'){
							knife_clicked = true

						}else{
							knife_clicked = false
						}

>>>>>>> 7926a081a50ea8ee48639971d5e8c95c67f7516f

				if(selected_items_name == 'knife'){
					if(knife_clicked){
						knife_clicked = false
					}else{
						knife_clicked = true
					}
					knifeMovement()
					console.log(knife_clicked)

				}
				else{
					knife_clicked = false
					// knifeMovement()
					if(selected_items_name == 'plate'){

						// if(save_items_name == "tomato slice"){
							plateFunction()
						// }
					}
					knifeMovement()
				}
				// console.log(knife_clicked)
			}

		})
		
		this.container.add(this.hitbox)
		world.add(this.container)
	}

<<<<<<< HEAD
=======
	checkmark(){
	}
>>>>>>> 7926a081a50ea8ee48639971d5e8c95c67f7516f

}

class Customer{

	constructor(_asset, _mtl, x_align,y_align,z_align,_rotationY,_scale,_name){
		this.container = new Container3D({
			y: -10
		})
		this.name = _name
		this.customer = new OBJ({
			asset: _asset,
			mtl: _mtl,
			x: customerx + x_align,
			y: customery + y_align,
			z: customerz + z_align,
			rotationX: 0,
			rotationY: _rotationY,
			scaleX: _scale,
			scaleY: _scale,
			scaleZ: _scale
		});

		this.hitbox = new Plane({
			x: customerx + x_align -0.5,
			y: customery,
			z: customerz + z_align,
			rotationX: 0,
			rotationY: 90,
			scaleX: 1,
			scaleY: 1,
			scaleZ: 1,

			side:'double',
			clickFunction: function(me){
				//reveal order
				console.log(customer_order);
			}
		})

		this.serve_button = new Plane({
			x: customerx + x_align -0.5,
			y: customery + 1,
			z: customerz + z_align + 1,
			red:0,green:120,blue:0,
			rotationX: 0,
			rotationY: 270,
			scaleX: 1,
			scaleY: 0.5,
			scaleZ: 1,
			asset:'serveimg',
			side:'double',
			clickFunction: function(me){

				console.log("you served " + customer_order);
				//check food
				check_recipe()
				if(iscorrect_food){
					if (noodle_finished = true){
						noodle_finished = false
						world.remove(noodle_prepared)
					}
					if (eating.isPlaying() == false){
						eating.play()
					}
					//score
					current_customer.remove_from_world()
					let prev_customer = current_customer
					while(prev_customer == current_customer){
						current_customer = random(customers_list);
					}
					set_random_customer_order()
					console.log(recipe_detail);
					recipe_close_textholder.tag.setAttribute('text','value:' +recipe_detail+ ' ; color: rgb(0,0,0); align: center;');

					current_customer.add_to_world()
					iscorrect_food = false
				}
			}
		})

		this.kickout_button = new Plane({
			x: customerx + x_align -0.5,
			y: customery+1,
			z: customerz + z_align-1,
			red:120,green:0,blue:0,

			rotationX: 0,
			rotationY: 270,
			scaleX: 1,
			scaleY: 0.5,
			scaleZ: 1,
			asset: 'kickoutimg',
			side:'double',
			clickFunction: function(me){

				console.log("Kicked out the customer");
				//current_customer.remove_from_world()
				score -= 1
				score_holder.tag.setAttribute('text','value: Score: ' +score+  '\n Remaining Time: '+remaining_time+' ; color: rgb(0,0,0); align: center;');
				food_in_plate = []
				for(let i = 0; i < cutting_board_item.length; i++){
					world.remove( cutting_board_item[i])
				}
				cutting_board_item = []
				current_customer.remove_from_world()
				let prev_customer = current_customer
				while(prev_customer == current_customer){
					current_customer = random(customers_list);
				}
				set_random_customer_order()
				current_customer.add_to_world()

			}

		})

		this.container.addChild(this.customer)
		this.container.addChild(this.hitbox)
		this.container.addChild(this.serve_button)
		this.container.addChild(this.kickout_button)
		this.hitbox.hide()
		world.add(this.container)

	}
	//constructor ends

	add_to_world(){
		this.container.setY(0)

	}

	remove_from_world(){
		this.container.setY(-10)

	}

<<<<<<< HEAD
}
=======
}

>>>>>>> 7926a081a50ea8ee48639971d5e8c95c67f7516f
