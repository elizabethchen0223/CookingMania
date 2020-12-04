var world
var camX = 0
var camY = 1.8
var camZ = 5
var score = 0
var remaining_time = 10
var score_holder

//*************HUD field
var recipe_container, recipe_show_button, recipe_textholder
var recipe_opened_container,recipe_close_button,recipe_close_textholder
var recipe_detail
var holdingitem_show_box
var holdingitem_show_box_img

//***************customer field
var customers_list = []
var astronaut, astronaut2, r2d2, puppy;
var customerx,customerycustomerz;
var customer_order, current_customer
var customer_order_list = []
var customer_hitbox;

//***************Interactable Objects
var pot
var knife

//****************Cutting board
var board_stack = 0.9
var selected_items
var selected_items_name
var cutting_board_item = []

//************* Action field
var interactable_obj = []	// list of items that users can interact with
// var selected_items = []
var holdingitem	= knife			// item that we are currently holding
var holding = false		   	// is there an item in our hands?
var holding_item_name		// item name that we are currently holding
var container_holding_item
var clicked = false

// variable for specific tools
var knife_clicked = false

// complete order
var food_in_plate = []
var iscorrect_food = false


function setup() {
	noCanvas();
	world = new World('VRScene');
	let recipex = -1.5;
	let recipey = 0.5;
	let recipez = -0.1;

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

	//********************When recipe is opend
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

	// Ajust Camera
	world.setUserPosition(camX,camY,camZ)


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

	customer_order_list = ["Steak","Noodle","Sandwitch"]
	 set_random_customer_order()

	//  ******** SETTING ********
		// FLOOR
		var _floor = new Plane({
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
		var counter = new Ring({
			x:0, y:0.9, z:5,
			radiusInner: 0.35,
			radiusOuter: 2,
			red:200, green: 157, blue:105,
			rotationX: -90,
			asset:"wood"
		})
		world.add(counter);
		//Counter walls: 		x,		z,		rotateY
		var wall1 = new Walls (0,		4.646,	0)
		var wall2 = new Walls (-0.339,	4.803,	50)
		var wall3 = new Walls (-0.359,	5.156,	125)
		var wall4 = new Walls (0,		5.353,	180)
		var wall5 = new Walls (0.326,	4.803,	-50)
		var wall6 = new Walls (0.326,	5.156,	-125)


	// ******** SERVING AREA ********
		// plate: interactable
		// var plate = new OBJ({
		// 	asset: 'dish_obj', mtl: 'dish_mtl',
		// 	x:0.85, y:0.94, z:5.13,
		// 	scaleX:1.5, scaleY:1.5, scaleZ:1.5
		// })
		var plate = new Interactables('dish_obj','dish_mtl',0.85,0.94,5.13,1.5,1.5,1.5,0,0,0,0.85,0.94,5.13,0,0,0,0.5,'plate')
		//world.add(plate)


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
		var fridgeBox = new Objects('fridge_obj', 'fridge_mtl', 0, 1.27, 5.9, 1,1,1, 0,90,0)
		//var fridgeDoorClosed = new Objects('fridgeDoor_obj', 'fridgeDoor_mtl', -0.15, 1.34, 5.74, 1,1,1, 0,220,0)
		var fridgeDoorOpen = new Objects('fridgeDoor_obj', 'fridgeDoor_mtl', 0.403, 1.34, 5.55, 1,1,1, 0,80,0)

	// ******** COOKING AREA ********
		var stove = new Box({
			x:-0.93, y:0.91, z:5.28,
			width:1, height:0.76, depth:0.03,
			rotationX:-90, rotationY:100,
			asset: "stove",
			clickFunction: function(theBox) {
				console.log("stove was clicked!")
			}
		})
		world.add(stove)

		pot = new Objects('pot_obj','pot_mtl',-0.95,0.94,5.04,0.008,0.01,0.008,0,300,0,"pot")
		var pan = new Objects('pan_obj','pan_mtl',-0.66,1,5.49,1,1,1,0,270,0,"pan")


	//  ******** PREPARATION AREA ********
		// cutting board: interactable
		var cuttingBoard = new Box ({

			x:0, y:0.91, z:4.23,
			width:1.21, height:0.9, depth:0.03,
			scaleX:0.5,scaleY:0.5,scaleY:0.5,
			rotationX: -90,
			asset:'boardPattern',
			clickFunction: function(theBox) {

				// if user has selected sth
				if(holding){
					board_stack += 0.05;
					selected_items.setPosition(0,board_stack,4.2)

					// put the selected item in the middle of the cutting board
					if(!knife_clicked){
						cutting_board_item.push(selected_items);
						food_in_plate.push(selected_items_name);
						world.add(selected_items)
						holding = false;
					}
					let items_on_board = selected_items_name

					// add a hitbox for whatever items on cutting board
					// let hitbox = new Plane ({
					// 	x: 0,
					// 	y: 1.1,
					// 	z: 4.4,
					// 	rotationX: 0,
					// 	rotationY: 0,
					// 	rotationZ:0,
					// 	scaleX: 0.4,
					// 	scaleY: 0.4,
					// 	scaleZ: 0.4,
					//
					// 	red:255,
					// 	opacity: 0.8,
					// 	clickFunction: function(theBox){
					// 		// did user select a knife
					// 		if(knife_clicked){
					// 			// swap the asset with sliced product
					// 		//	console.log("You have ",items_on_board)
					// 			console.log("display a sliced product")
					//
					// 		}
					//
					// 	}
					// })

					//world.add(hitbox)
					console.log("cutting board was clicked!")
				}
				console.log("cutting board was clicked!")
			}

		})
		world.add(cuttingBoard)

		knife = new Interactables('knife_obj','knife_mtl',	0.378, 0.84,4.35,	0.0015,0.0015,0.0015,	90,90,0,	0.39, 0.95,4.25,90,0,0,0.4, "knife")


	// ******** SPICE SHELF ********
		// spice shelf
		var shelf = new Objects('shelf_obj','shelf_mtl',0,0.84,3.64,0.99,0.63,0.72,0,0,0,"shelf")
		var ketchup = new Objects('ketchup_obj','ketchup_mtl',-0.51,1,4.17,0.0003,0.0003,0.0003,0,60,0,"ketchup")
		var trashCan =  new Objects('trashCan_obj','trashCan_mtl',0.28,0.112,4.979,0.002,0.002,0.002,0,0,0,"trashCan")
		var hotSauce =  new Objects('hotSauce_obj','hotSauce_mtl',-0.22,1.18,3.75,0.3,0.3,0.3,0,180,0,"hotSauce")

		// ingrediants
		var bread= new Interactables('bread_obj','bread_mtl',		-1.13,1,4.276,	1,1,1,	-80,30,0,	-1.13,1,4.276,	-80,30,0,0.3,	"bread")
		// 	_asset,		_mtl,			x,	y,	z,		sX,sY,sZ,_rotationX,_rotationY,_rotationZ,	hitboxX,hitboxY,hitboxZ, hitRotationX, hitRotationY, hitRotationZ, hitBozScale,_name
		var tomato= new Interactables('tomato_obj','tomato_mtl',	-0.5,1.45,3.64,	0.005,0.005,0.005,	-90,0,0,  -0.5,1.47,3.78,0,0,0,0.3,	"tomato")
		var cheese = new Box({
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

		// ******** DECORATIONS ********
		var plant1 = new Objects('plant1_obj','plant1_mtl',		1.26,0.88,4.24,		0.1,0.1,0.1,	0,0,0)
		//
		// var basket1 = new Objects('basket_obj','basket_mtl',	-0.86,1,4.48,		0.5,0.5,0.5,	0,0,0)
		// var basket2 = new Objects('basket_obj','basket_mtl',	-0.72,1,4.27,		0.5,0.5,0.5,	0,0,0)
		// var basket3 = new Objects('basket_obj','basket_mtl',	-0.58,1,4.05,		0.5,0.5,0.5,	0,0,0)
		//
		// *** below baskets seem to be too computationally expensive,
		// *** might consider remove/change them
		// var basket4 = new Objects('basket2_obj','basket2_mtl',	-1.18,0.89,4.26,	0.0001,0.0001,0.0001,	-90,90,0)
		// var basket5 = new Objects('basket2_obj','basket2_mtl',	-0.957,0.89,3.81,	0.0001,0.0001,0.0001,	-90,90,0)





	//Action init: Select Tools

		// did the user click on an item's hitbox??
		if(holding){
			//remove the default cursor
			world.camera.holder.removeChild( world.camera.cursor.tag );

		//default item is knife for now
			holdingitem = new Objects('knife_obj','knife_mtl',0.378, 0.84,4.35,0.0015,0.0015,0.0015,90,90,0,"knife").utensil
			holding_item_name = holdingitem.name
			//set the position and rotation to look natural
			holdingitem.setPosition(0,-0.2,-0.5)
			holdingitem.setRotation(0,0,0)
			holdingitem.rotateY(100)

			//set this as a cursor
			holdingitem.tag.setAttribute('cursor', 'rayOrigin: mouse');

			world.camera.holder.appendChild(holdingitem.tag);
	}
}



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
			score_holder.tag.setAttribute('text','value: Score: ' +score+  '\n Remaining Time: '+remaining_time+' ; color: rgb(0,0,0); align: center;');
		}
	}

}



// FUNCTIONS ----------------------------------------------------------------------

function set_random_customer_order(){
	customer_order = random(customer_order_list);

	if(customer_order == "Steak"){
		recipe_detail = "The Customer wants a Steak"

	}
	else if(customer_order == "Noodle"){
		recipe_detail = "The Customer wants some Noodles"
	}
	else if(customer_order == "Sandwitch"){
		recipe_detail = "The Customer wants a Sandwitch \n\n Get the bread on the cutting board \n Get the tomato on the cuttin board \n Get the cheese on the cutting board \n Get the bread on the cutting board"
	}
	recipe_close_textholder.tag.setAttribute('text','value:' +recipe_detail+ ' ; color: rgb(0,0,0); align: center;');
}
function check_recipe(){
	if(customer_order == "Steak"){

	}
	else if(customer_order == "Sandwitch"){
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


	}
}
// CLASSES ----------------------------------------------------------------------
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

	cosntructor(){
		this.myContainer = new Container3D({
			x:0, y:1, z:0
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

		// this.myContainer.addChild(this.fridgeBox)
		// this.myContainer.addChild(this.fridgeDoorClosed)
		// world.add(this.myContainer)
	}
}

// display statioanry objects
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

		// this.hitbox = new Plane({
		// 	x: x,
		// 	y: y,
		// 	z: z,
		// 	rotationX: _rotationX,
		// 	rotationY: _rotationY,
		// 	rotationZ:_rotationZ,
		// 	scaleX: sX,
		// 	scaleY: sY,
		// 	scaleZ: sZ,
		// 	red:255,
		// 	opacity: 0.8,
		//
		// 	side:'double',
		// 	upFunction: function(me){
		// 	}
		// })
		// world.add(this.hitbox)


	}

}

// interactable objs
class Interactables {
	constructor(_asset,_mtl,x,y,z,sX,sY,sZ,_rotationX,_rotationY,_rotationZ,hitboxX,hitboxY,hitboxZ, hitRotationX, hitRotationY, hitRotationZ, hitBozScale,_name){
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
			x: hitboxX,
			y: hitboxY,
			z: hitboxZ,
			rotationX: hitRotationX,
			rotationY: hitRotationY,
			rotationZ:hitRotationZ,
			scaleX: hitBozScale,
			scaleY: hitBozScale,
			scaleZ: hitBozScale,


			opacity: 0.8,


			clickFunction: function(theBox){
				selected_items_name = _name

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
						else {
							if(selected_items_name == "bread"){
								holdingitem_show_box.setAsset("bread_hold")
							}
							selected_items = new OBJ({asset:_asset,
								mtl: _mtl,
								x:x, y:y, z:z,
								scaleX: sX, scaleY:sY, scaleZ: sZ,
								rotationX:_rotationX,
								rotationY:_rotationY,
								rotationZ:_rotationZ
							})

						}


						if(selected_items_name == 'knife'){
							knife_clicked = true
						}else{
							knife_clicked = false
						}


					}
					// if user would like to put back the item
					else {
						holding = false
						holdingitem_show_box.setAsset("")

						holdingitem.hide()
						holding_item_name = ''
					}
					//world.add(checkmark)

					// holdingitem.toggleVisibility()

					console.log("holding is " + holding)
					console.log(selected_items_name + " was clicked!")
					// console.log(selected_items)
				}
				else{
					board_stack = 0.9
					for(let i = 0; i < cutting_board_item.length; i++){
						cutting_board_item[i].setPosition(x,y+(0.05*i),z)
					}
				}
			}
		})

		this.container.add(this.hitbox)


		this.checkmark = new Plane({
			x: hitboxX,
			y: hitboxY,
			z: hitboxZ,
			rotationX: hitRotationX,
			rotationY: hitRotationY,
			rotationZ:hitRotationZ,
			scaleX: hitBozScale,
			scaleY: hitBozScale,
			scaleZ: hitBozScale,
			transparent: true,
			asset:'selected'
		})
		// this.container.add(this.checkmark)


		world.add(this.container)


	}

	checkmark(){


	}

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

}
