var world
var camX = 0
var camY = 1.8
var camZ = 5

//*************HUD field
var recipe_container
var recipe_steak_button,recipe_steak_textholder
var recipe_noodle_button, recipe_noodle_textholder
var steak_container, steak_button, steak_textholder
var noodle_container, noodle_button, noodle_textholder

var clearSelectionBtn, selectionUI
var clearSelection = false

//***************customer field
var customers_list = []
var astronaut, astronaut2, r2d2, puppy;
var customerx,customerycustomerz;
var customer_order, current_customer
var customer_order_list = []
var customer_hitbox;

//*************** Interactable Objects 1
var pot
var knife

//*************** Interactable Objects 2

//*************** Decorative Objects


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

// test 
var selected_items 
var selected_items_name



// complete order
var food_in_plate = []


function setup() {
	noCanvas();
	world = new World('VRScene');

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
	customer_order = random(customer_order_list);
	console.log(customer_order);




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
		var plate = new OBJ({
			asset: 'dish_obj', mtl: 'dish_mtl',
			x:0.85, y:0.94, z:5.13,
			scaleX:1.5, scaleY:1.5, scaleZ:1.5
		})
		world.add(plate)

		// mat
		var mat = new Plane ({
			x:0.87, y:0.91, z:5.13,
			width:0.8, height:1,
			rotationX:-90, rotationZ:0,
			asset: "servingMat"
		})
		world.add(mat)

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
		var fridgeDoorClosed = new Objects('fridgeDoor_obj', 'fridgeDoor_mtl', -0.15, 1.34, 5.74, 1,1,1, 0,220,0)
		// var fridgeDoorOpen = new Objects('fridgeDoor_obj', 'fridgeDoor_mtl', 0.403, 1.34, 5.55, 1,1,1, 0,80,0)

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
				// if(holding){
				// 	// put the selected item in the middle of the cutting board
				// 	selected_items.setPosition(0,1,4.2)
				// 	world.add(selected_items)

				// 	let items_on_board = selected_items_name

				// 	// add a hitbox for whatever items on cutting board
				// 	let hitbox = new Plane ({
				// 		x: 0,
				// 		y: 1.1,
				// 		z: 4.4,
				// 		rotationX: 0,
				// 		rotationY: 0,
				// 		rotationZ:0,
				// 		scaleX: 0.4,
				// 		scaleY: 0.4,
				// 		scaleZ: 0.4,

				// 		red:255,
				// 		opacity: 0.8,
				// 		clickFunction: function(theBox){
				// 			// did user select a knife
				// 			if(knife_clicked){
				// 				// swap the asset with sliced product 
				// 				console.log("You have ",items_on_board)
				// 				console.log("display a sliced product")

				// 			}

				// 		}
				// 	})

				// 	world.add(hitbox)
				// 	console.log("cutting board was clicked!")
				// }
				// console.log("cutting board was clicked!")
			}

		})

		var cuttingBoardBox = new Box({
			x:0, y:1.04, z:4.27,
			width:0.54, height:0.4, depth:0.21,
			scaleX:0.5,scaleY:0.5,scaleY:0.5,
			opacity: 0.8,
			clickFunction: function(theBox){
				
				if(holding){
					// put the selected item in the box
					selected_items.setPosition(theBox.x,theBox.y,theBox.z)

					let items_on_board = selected_items_name

					console.log("cutting board was clicked!")
					console.log(selected_items + ' was selected!')
				}

			}
		
		})

		world.add(cuttingBoard)
		world.add(cuttingBoardBox)


		knife = new Interactables('knife_obj','knife_mtl',	0.378, 0.84,4.35,	0.0015,0.0015,0.0015,	90,90,0,	0.36, "knife")
		var menu_stand = new Objects('menuStand_obj','menuStand_mtl', 0.89,1.1,4.2, 0.34,0.34,0.28, 0,130,0,"menu_stand")



	// ******** SPICE SHELF ********
		// spice shelf
		var shelf = new Objects('shelf_obj','shelf_mtl',0,0.84,3.64,0.99,0.63,0.72,0,0,0,"shelf")
		var ketchup = new Objects('ketchup_obj','ketchup_mtl',-0.51,1,4.17,0.0003,0.0003,0.0003,0,60,0,"ketchup")
		var trashCan =  new Objects('trashCan_obj','trashCan_mtl',0.28,0.112,4.979,0.002,0.002,0.002,0,0,0,"trashCan")
		var hotSauce =  new Objects('hotSauce_obj','hotSauce_mtl',-0.22,1.18,3.75,0.3,0.3,0.3,0,180,0,"hotSauce")

		// ingrediants 
		var bread= new Objects('bread_obj','bread_mtl',		-1.13,1,4.276,	1,1,1,	-80,30,0,	"bread")
		// 	_asset,		_mtl,			x,	y,	z,		sX,sY,sZ,_rotationX,_rotationY,_rotationZ,			hitBozScale,_name
		var tomato= new Interactables('tomato_obj','tomato_mtl',	-0.5,1.45,3.64,	0.005,0.005,0.005,	-90,0,0, 0.3,	"tomato")
		var cheese = new Box({
			x:0.072, y:1.387, z:5.97,
			width:0.07,	height:0.05, depth: 0.13,
			red:244, green:208, blue:63,
			clickFunction: function(theBox) {
				console.log("cheese was clicked!")
			}
		})
		world.add(cheese)
	
		// ******** DECORATIONS ********
		var plant1 = new Objects('plant1_obj','plant1_mtl',		1.26,0.88,4.24,		0.1,0.1,0.1,	0,0,0)
		var basket1 = new Objects('basket_obj','basket_mtl',	-0.86,1,4.48,		0.5,0.5,0.5,	0,0,0)
		var basket2 = new Objects('basket_obj','basket_mtl',	-0.72,1,4.27,		0.5,0.5,0.5,	0,0,0)
		var basket3 = new Objects('basket_obj','basket_mtl',	-0.58,1,4.05,		0.5,0.5,0.5,	0,0,0)
			// *** below baskets seem to be too computationally expensive, 
			// *** might consider remove/change them
			// var basket4 = new Objects('basket2_obj','basket2_mtl',	-1.18,0.89,4.26,	0.0001,0.0001,0.0001,	-90,90,0)
			// var basket5 = new Objects('basket2_obj','basket2_mtl',	-0.957,0.89,3.81,	0.0001,0.0001,0.0001,	-90,90,0)


	
		
		

	//Action init: Select Tools

		// did the user click on an item's hitbox??
		// if(holding){
		// 	//remove the default cursor
			world.camera.holder.removeChild( world.camera.cursor.tag );

		// //default item is knife for now
		// 	holdingitem = new Objects('knife_obj','knife_mtl',0.378, 0.84,4.35,0.0015,0.0015,0.0015,90,90,0,"knife").utensil
		// 	holding_item_name = holdingitem.name
		// 	//set the position and rotation to look natural
		// 	holdingitem.setPosition(0,-0.2,-0.5)
		// 	holdingitem.setRotation(0,0,0)
		// 	holdingitem.rotateY(100)

		// 	//set this as a cursor
		// 	holdingitem.tag.setAttribute('cursor', 'rayOrigin: mouse');

		// 	world.camera.holder.appendChild(holdingitem.tag);
		// }

	
	// ****************************** UI ******************************
		// clear selection button
		clearSelectionBtn = new Plane({
			x:0.6, y:0.5, z:-1,
			red:185,green:190,blue:195, opacity: 0.8,
			width:0.5, height:0.1,
			clickFunction: function(thePlane){
				console.log("Clear Selection!")
				clearSelection = true
				selected_items = undefined
				selected_items_name = undefined
			}
		})
		clearSelectionBtn.tag.setAttribute('text','value: Clear Selection ; color: rgb(0,0,0); align:center; height: 1; width:1;')


		// show user's current selection 
		 selectionUI = new Plane ({
			x:-0.6, y:0.5, z:-1,
			red:185,green:190,blue:195, opacity: 0.8,
			width:0.8, height:0.1
		})
		selectionUI.tag.setAttribute('text','value: You have not selected anything; color: rgb(0,0,0); align:center; height: 1; width:1;')


		// add Btns to the HUD
		selectionUI.tag.setAttribute('cursor','rayOrigin: mouse')		
		world.camera.holder.appendChild(selectionUI.tag);
		world.camera.holder.appendChild(clearSelectionBtn.tag);




}



function draw() {
	// move the holding item correspondingly, this is only for knife_mtl
	// if(holding_item_name = "knife"){
	// 	holdingitem.setX(map(mouseX,0,windowWidth,-1,1))
	// 	holdingitem.setY(map(mouseY,0,windowHeight,-0.5,0.5) * -1)
	// }
	// else if(holding == false){
	// 	console.log(holdingitem)

	// }
	// update selection

	if(selected_items_name == undefined ){
		selectionUI.tag.setAttribute('text','value: You have not selected anything; color: rgb(0,0,0); align:center; height: 1; width:1;')
	}else{
		selectionUI.tag.setAttribute('text','value: You selected : '+ selected_items_name + ';  color: rgb(0,0,0); align:center; height: 1; width:1;')
	}


}



// FUNCTIONS ----------------------------------------------------------------------
function clearSelection(){
	selected_items = ''
	selected_items_name = ''
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

		// 	side:'double',
		// 	upFunction: function(me){

		// 	}
		// })
		// world.add(this.hitbox)


	}

}

// interactable objs
class Interactables {
	constructor(_asset,_mtl,x,y,z,sX,sY,sZ,_rotationX,_rotationY,_rotationZ,hitBozScale,_name){
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
			scaleX: hitBozScale,
			scaleY: hitBozScale,
			scaleZ: hitBozScale,

			red:255,
			opacity: 0.8,


			clickFunction: function(theBox){
			
				// the user has seleted an item
				// if(holding == false){
					holding = true

					// update holding item
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
					
					world.add(selected_items)


					selected_items_name = _name

					if(selected_items_name == 'knife'){
						knife_clicked = true
					}else{
						knife_clicked = false
					}


				
				// if user would like to put back the item 
				// else {
				// 	holding = false
					// holdingitem.hide()
					
					// holding_item_name = ''
				// }
				// world.add(checkmark)

				// holdingitem.toggleVisibility()
				
				console.log(holding)
				console.log(selected_items)

				console.log(selected_items_name + " was clicked!")
				// console.log(selected_items)

			}
		})
		
		this.container.add(this.hitbox)


		// this.checkmark = new Plane({
		// 	x: hitboxX,
		// 	y: hitboxY,
		// 	z: hitboxZ,
		// 	rotationX: hitRotationX,
		// 	rotationY: hitRotationY,
		// 	rotationZ:hitRotationZ,
		// 	scaleX: hitBozScale,
		// 	scaleY: hitBozScale,
		// 	scaleZ: hitBozScale,
		// 	transparent: true,
		// 	asset:'selected'
		// })
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

				console.log(customer_order);
			}
		})

		this.serve_button = new Plane({
			x: customerx + x_align -0.5,
			y: customery,
			z: customerz + z_align + 1,
			red:0,green:120,blue:0,
			rotationX: 0,
			rotationY: 270,
			scaleX: 1,
			scaleY: 0.5,
			scaleZ: 1,

			side:'double',
			clickFunction: function(me){

				console.log("you served " + customer_order);
			}
		})
		this.serve_button.tag.setAttribute('text','value: Serve the Food; color: rgb(255,255,255); align: center;');

		this.kickout_button = new Plane({
			x: customerx + x_align -0.5,
			y: customery,
			z: customerz + z_align-1,
			red:120,green:0,blue:0,

			rotationX: 0,
			rotationY: 270,
			scaleX: 1,
			scaleY: 0.5,
			scaleZ: 1,

			side:'double',
			clickFunction: function(me){

				console.log("Kicked out the customer");
				//current_customer.remove_from_world()
				current_customer.remove_from_world()
				let prev_customer = current_customer
				while(prev_customer == current_customer){
					current_customer = random(customers_list);
				}
				current_customer.add_to_world()

			}

		})

		this.kickout_button.tag.setAttribute('text','value: Kick Out!; color: rgb(255,255,255); align: center;');

		this.container.addChild(this.customer)
		this.container.addChild(this.hitbox)
		this.container.addChild(this.serve_button)
		this.container.addChild(this.kickout_button)
		this.hitbox.hide()
		world.add(this.container)

	}
	//constructor ends

	add_to_world(){
		customer_order = random(customer_order_list)
		this.container.setY(0)

	}

	remove_from_world(){
		this.container.setY(-10)

	}

}