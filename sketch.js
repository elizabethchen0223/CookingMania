var world
var recipe_container
var recipe_steak_button,recipe_steak_textholder
var recipe_noodle_button, recipe_noodle_textholder
var steak_container, steak_button, steak_textholder
var noodle_container, noodle_button, noodle_textholder

//customer field
var customers_list = []
var astronaut, astronaut2, r2d2, puppy;
var customerx,customerycustomerz;
var customer_order, current_customer
var customer_order_list = []
var customer_hitbox;




function setup() {
	noCanvas();
	world = new World('VRScene');

	// Ajust Camera
	world.setUserPosition(0,1.8,5)


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


	var ingredient_box = new Box({
		x:0,y:1,z:0,
		width:1, height: 1, depth: 1,
		red:0, green:255, blue:0,
		clickFunction: function(me){
			console.log("Move to ingredient station");

			}
	});
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
		// SKY? SURROUNDING?


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
	// plate
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
		// fridge (see Fridge Class)
		var fridgeBox = new Objects('fridge_obj', 'fridge_mtl', 0, 1.27, 5.9, 1,1,1, 0,90,0)
		var fridgeDoorClosed = new Objects('fridgeDoor_obj', 'fridgeDoor_mtl', -0.15, 1.34, 5.74, 1,1,1, 0,220,0)
		// var fridgeDoorOpen = new Objects('fridgeDoor_obj', 'fridgeDoor_mtl', 0.403, 1.34, 5.55, 1,1,1, 0,80,0)

	// ******** COOKING AREA ********
		var stove = new Box({
			x:-0.93, y:0.91, z:5.28,
			width:1, height:0.76, depth:0.03,		
			rotationX:-90, rotationY:100,
			asset: "stove"
		})
		world.add(stove)

		var pot = new Objects('pot_obj','pot_mtl',-0.95,0.94,5.04,0.008,0.01,0.008,0,300,0)
		var pan = new Objects('pan_obj','pan_mtl',-0.66,1,5.49,1,1,1,0,270,0)
	


	//  ******** PREPARATION AREA ********
		var cuttingBoard = new Box ({
			x:0, y:0.91, z:4.23,
			width:1.21, height:0.9, depth:0.03,
			scaleX:0.5,scaleY:0.5,scaleY:0.5,
			rotationX: -90,
			asset:'boardPattern'
		})
		world.add(cuttingBoard)
		
		var knife = new Objects('knife_obj','knife_mtl',0.378, 0.84,4.35,0.0015,0.0015,0.0015,90,90,0)
		var menu_stand = new Objects('menuStand_obj','menuStand_mtl', 0.89,1.1,4.2, 0.34,0.34,0.28, 0,130,0)
		

	// ******** SPICE SHELF ********
		// spice shelf
		var shelf = new Objects('shelf_obj','shelf_mtl',0,0.84,3.64,0.99,0.63,0.72,0,0,0)
		var ketchup = new Objects('ketchup_obj','ketchup_mtl',-0.51,1,4.17,0.0003,0.0003,0.0003,0,60,0)
		var trashCan =  new Objects('trashCan_obj','trashCan_mtl',0.34,0.068,4.979,0.001,0.001,0.001,0,0,0)
		var hotSauce =  new Objects('hotSauce_obj','hotSauce_mtl',-0.22,1.18,3.75,0.3,0.3,0.3,0,180,0)




}

function draw() {
}



// FUNCTIONS ----------------------------------------------------------------------



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

class Objects {
	constructor(_asset,_mtl,x,y,z,sX,sY,sZ,_rotationX,_rotationY,_rotationZ){
		this.utensil = new OBJ({
			asset:_asset,
			mtl: _mtl,
			x:x, y:y, z:z,
			scaleX: sX, scaleY:sY, scaleZ: sZ,
			rotationX:_rotationX,
			rotationY:_rotationY,
			rotationZ:_rotationZ
		})
		world.add(this.utensil)
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
			scaleZ: _scale,
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
