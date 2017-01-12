var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var LoaderAction = require('../../actions/LoaderAction.js');
var LoaderStore = require('../../stores/LoaderStore.js'); 

var AddItem = React.createClass({
  getInitialState: function() {
  	var menu_item = {};
    var state = { 
    	showModal: false,
    };
	state.name = menu_item.name || ""
	state.code = menu_item.code || ""
	state.category = menu_item.category || ""
	state.type = menu_item.type || ""
	state.thc_percent = menu_item.thc_percent || ""
	state.thc_g = menu_item.thc_g || ""
	state.description = menu_item.description || ""
	state.image = menu_item.image || ""
	state.gram_price = menu_item.gram_price || ""
	state.eighth_price = menu_item.eighth_price || ""
	state.quarter_price = menu_item.quarter_price || ""
	state.half_price = menu_item.half_price || ""
	state.oz_price = menu_item.oz_price    || ""
	state.item_price = menu_item.item_price    || ""
    return state;
  },

  close: function() {
  	var state = this.state;
  	state.showModal = false;
    this.setState(state);
  },

  open: function() {
  	var state = this.state;
  	state.showModal = true;
    this.setState(state);
  },

  submit: function(){
  	LoaderAction.createMenuItem(this.props.dispensary_id, this.state);
  	this.close();
  },

  handleChange: function(field,event){
  	var state = this.state;
  	state[field] = event.target.value;
    this.setState(state);
  },

  render: function() {
  	var menu_item = this.props.menu_item;
    return (
      <div>
        <div onClick={this.open} >
          Add Item
        </div>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>
            	Name:
	            <input type="text" placeholder="Name" value={this.state.name} onChange={this.handleChange.bind(this,"name")} />
            </label>
            <br/>
			<label>
	          Category:
	          <select value={this.state.category} onChange={this.handleChange.bind(this,"category")}>
	            <option value="">Other</option>
	            <option value="Flower">Flower</option>
	            <option value="Preroll">Preroll</option>
	            <option value="Edibles">Edibles</option>
	            <option value="Concentrates">Concentrates</option>
	            <option value="Topicals">Topicals</option>
	            <option value="Acccessories">Acccessories</option>
	          </select>
	        </label>
	        <br/>
			<label>
	          Type:
	          <select value={this.state.type} onChange={this.handleChange.bind(this,"type")}>
	            <option value="">Other</option>
	            <option value="Sativa">Sativa</option>
	            <option value="Indica">Indica</option>
	            <option value="Hybrid">Hybrid</option>
	          </select>
	        </label>        
	        <br/>
            <label>
            	THC Percentage:
	            <input type="text" placeholder="Percentage" value={this.state.thc_percent} onChange={this.handleChange.bind(this,"thc_percent")} />
            </label>
            <br/>
            <label>
            	THC Milligrams:
	            <input type="text" placeholder="Milligrams" value={this.state.thc_g} onChange={this.handleChange.bind(this,"thc_g")} />
            </label>
            <br/>
         	<label>
	          Description:
	          <textarea placeholder="Description" value={this.state.description} onChange={this.handleChange.bind(this,"description")} />
	        </label>           
	        <br/>
         	<label>
	          Image:
	          <input type="text" placeholder="Image" value={this.state.image} onChange={this.handleChange.bind(this,"image")} />
	        </label>           
	        <br/>
			<label>
				Gram Price:
				<input type="text" placeholder="Gram Price" value={this.state.gram_price} onChange={this.handleChange.bind(this,"gram_price")}/>
			</label>
			<br/>
			<label>
				Eighth Price:
				<input type="text" placeholder="Eighth Price" value={this.state.eighth_price} onChange={this.handleChange.bind(this,"eighth_price")}/>
			</label>
			<br/>
			<label>
				Quarter Price:
				<input type="text" placeholder="Quarter Price" value={this.state.quarter_price} onChange={this.handleChange.bind(this,"quarter_price")}/>
			</label>
			<br/>
			<label>
				Half Price:
				<input type="text" placeholder="Half Price" value={this.state.half_price} onChange={this.handleChange.bind(this,"half_price")}/>
			</label>
			<br/>
			<label>
				Oz Price:
				<input type="text" placeholder="Oz Price" value={this.state.oz_price} onChange={this.handleChange.bind(this,"oz_price")}/>
			</label>
			<br/>
			<label>
				Item Price:
				<input type="text" placeholder="Item Price" value={this.state.item_price} onChange={this.handleChange.bind(this,"item_price")}/>
			</label>
			<br/>		
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.submit}>Add</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

var EditItem = React.createClass({
  getInitialState: function() {
  	var menu_item = this.props.menu_item;
    var state = { 
    	showModal: false,
    };
	state.name = menu_item.name || ""
	state.code = menu_item.code || ""
	state.category = menu_item.category || ""
	state.type = menu_item.type || ""
	state.thc_percent = menu_item.thc_percent || ""
	state.thc_g = menu_item.thc_g || ""
	state.description = menu_item.description || ""
	state.image = menu_item.image || ""
	state.gram_price = menu_item.gram_price || ""
	state.eighth_price = menu_item.eighth_price || ""
	state.quarter_price = menu_item.quarter_price || ""
	state.half_price = menu_item.half_price || ""
	state.oz_price = menu_item.oz_price    || ""
	state.item_price = menu_item.item_price    || ""
    return state;
  },

  close: function() {
  	var state = this.state;
  	state.showModal = false;
    this.setState(state);
  },

  open: function() {
  	var state = this.state;
  	state.showModal = true;
    this.setState(state);
  },

  submit: function(){
  	LoaderAction.updateMenuItem(this.props.dispensary_id, this.state);
  	this.close();
  },

  handleChange: function(field,event){
  	var state = this.state;
  	state[field] = event.target.value;
    this.setState(state);
  },

  render: function() {
  	var menu_item = this.props.menu_item;
    return (
      <div>
        <Button onClick={this.open} >
          Edit
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>
            	Name:
	            <input type="text" placeholder="Name" value={this.state.name} onChange={this.handleChange.bind(this,"name")} />
            </label>
            <br/>
			<label>
	          Category:
	          <select value={this.state.category} onChange={this.handleChange.bind(this,"category")}>
	            <option value="">Other</option>
	            <option value="Flower">Flower</option>
	            <option value="Preroll">Preroll</option>
	            <option value="Edibles">Edibles</option>
	            <option value="Concentrates">Concentrates</option>
	            <option value="Topicals">Topicals</option>
	            <option value="Acccessories">Acccessories</option>
	          </select>
	        </label>
	        <br/>
			<label>
	          Type:
	          <select value={this.state.type} onChange={this.handleChange.bind(this,"type")}>
	            <option value="">Other</option>
	            <option value="Sativa">Sativa</option>
	            <option value="Indica">Indica</option>
	            <option value="Hybrid">Hybrid</option>
	          </select>
	        </label>        
	        <br/>
            <label>
            	THC Percentage:
	            <input type="text" placeholder="Percentage" value={this.state.thc_percent} onChange={this.handleChange.bind(this,"thc_percent")} />
            </label>
            <br/>
            <label>
            	THC Milligrams:
	            <input type="text" placeholder="Milligrams" value={this.state.thc_g} onChange={this.handleChange.bind(this,"thc_g")} />
            </label>
            <br/>
         	<label>
	          Description:
	          <textarea placeholder="Description" value={this.state.description} onChange={this.handleChange.bind(this,"description")} />
	        </label>           
	        <br/>
         	<label>
	          Image:
	          <input type="text" placeholder="Image" value={this.state.image} onChange={this.handleChange.bind(this,"image")} />
	        </label>           
	        <br/>
			<label>
				Gram Price:
				<input type="text" placeholder="Gram Price" value={this.state.gram_price} onChange={this.handleChange.bind(this,"gram_price")}/>
			</label>
			<br/>
			<label>
				Eighth Price:
				<input type="text" placeholder="Eighth Price" value={this.state.eighth_price} onChange={this.handleChange.bind(this,"eighth_price")}/>
			</label>
			<br/>
			<label>
				Quarter Price:
				<input type="text" placeholder="Quarter Price" value={this.state.quarter_price} onChange={this.handleChange.bind(this,"quarter_price")}/>
			</label>
			<br/>
			<label>
				Half Price:
				<input type="text" placeholder="Half Price" value={this.state.half_price} onChange={this.handleChange.bind(this,"half_price")}/>
			</label>
			<br/>
			<label>
				Oz Price:
				<input type="text" placeholder="Oz Price" value={this.state.oz_price} onChange={this.handleChange.bind(this,"oz_price")}/>
			</label>
			<br/>
			<label>
				Item Price:
				<input type="text" placeholder="Item Price" value={this.state.item_price} onChange={this.handleChange.bind(this,"item_price")}/>
			</label>
			<br/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.submit}>Edit</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});


var MenuItem = React.createClass({
	getInitialState: function() {
		return { showModal: false };
	},

	close: function() {
		this.setState({ showModal: false });
	},

	open: function() {
		this.setState({ showModal: true });
	},
	render: function(){
		var edit;
		if (this.props.session && this.props.session.type=="admin"){
			edit = (<EditItem dispensary_id={this.props.dispensary_id} menu_item={this.props.menu_item}/>);
		}
		var menu_item = this.props.menu_item;
		return (
			<div>
				<div onClick={this.open}>		
					<hr/>
					<h4>{menu_item["name"]}</h4>
					{edit}
					<hr/>
			    </div>

				<Modal show={this.state.showModal} onHide={this.close}>
		          <Modal.Header closeButton>
		            <Modal.Title>{menu_item["name"]}</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		            <h4>{menu_item["category"]}</h4>
		            <p>{menu_item["description"]}</p>

		          </Modal.Body>
		          <Modal.Footer>
		            <Button onClick={this.close}>Close</Button>
		          </Modal.Footer>
		        </Modal>		    
			</div>
		);
	}
});

var MenuCategory = React.createClass({
	render: function(){
		var menu_items = this.props.menu_items.map(function(menu_item,index){
			return (<MenuItem key={index} dispensary_id={this.props.dispensary_id} menu_item={menu_item} session={this.props.session}/>);
		}.bind(this));
		return (
			<div>
				<h1>{this.props.category_name}</h1>
				{menu_items}	
			</div>
		);
	}
});

var MenuCategories = React.createClass({
	getInitialState: function(){
		return {
			"loaded":LoaderStore.menuLoaded(this.props.dispensary_id)
		}
	},
	updateState: function(){
		var loaded = LoaderStore.menuLoaded(this.props.dispensary_id);
		if (loaded != this.state.loaded){
			this.setState({"loaded":loaded});
		}
	},
	componentWillUpdate: function(){
    	LoaderAction.loadMenu(this.props.dispensary_id); 
    	LoaderAction.extendSession();
	},
	componentWillMount: function(){
		LoaderAction.loadMenu(this.props.dispensary_id);
	},
	componentDidMount: function(){
		LoaderStore.addChangeListener(this.updateState); 
	},

	componentWillUnmount: function(){
		LoaderStore.removeChangeListener(this.updateState); 
	},
	render: function(){
		if (this.state.loaded){
			// get items
			var items = LoaderStore.getMenu(this.props.dispensary_id);

			// convert to {category:[item,item]} format
			var formatted_menu = {};
			for (var index=0; index<items.length; index++){
				var item = items[index];
				if (formatted_menu[item["category"]]!=undefined){
					formatted_menu[item["category"]].push(item);
				} else {
					formatted_menu[item["category"]]=[];
					formatted_menu[item["category"]].push(item);
				}
			}

			// get full category list
			var category_list = [];
			for (var category_name in formatted_menu){
				category_list.push(category_name);
			}

			// create menu categories
			categories = category_list.map(function(category_name,index){
				var menu_items = formatted_menu[category_name];
				return (
					<MenuCategory key={index} dispensary_id={this.props.dispensary_id} category_name={category_name} menu_items={menu_items} session={this.props.session}/>
				)
			}.bind(this));
		} else {
		    var categories = (<h1>Grabbing menu...</h1>);
		}
		return (
			<div className="row">
		      	<div className="col-md-4"/>
		      	<div className="col-md-4">
		      		{categories}
		      	</div>
		      	<div className="col-md-4"/>
		    </div>
		);
	}
});

var Menu = React.createClass({
  render: function(){
  	var session = LoaderStore.getSession();
  	var dispensary_id = this.props.params.dispensary_id || session.dispensary_id;
	var add_menu_item;
	if (session && session.type=="admin"){
		add_menu_item = (<AddItem dispensary_id={dispensary_id}/>);
	}
    return (
      <div className="menu container-fluid">
      	<MenuCategories dispensary_id={dispensary_id} session={session}/>
      	{add_menu_item}
      </div>
    );
  }
});

module.exports = Menu;


