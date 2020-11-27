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



	//customers
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


	// // box primitive
	var ingredient_box = new Box({
		x:0,y:1,z:0,
		width:1, height: 1, depth: 1,
		red:0, green:255, blue:0,
		clickFunction: function(me){
			console.log("Move to ingredient station");

			}
	});
	//world.add(ingredient_box);
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

	var _floor = new Plane({
		x:0, y:0, z:0,
		width:100, height:100,
		red:120, green:120, blue:120,
		rotationX:-90, metalness:0.25,
		asset: "floor",
		repeatX: 50,
		repeatY: 50
	});

	// add the plane to our world
	world.add(_floor);
}

function draw() {
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
