<?php

class CategoriesController extends VanillaController {
	
	function beforeAction () {

	}

	function view($categoryId = null) {
		
		$this->Category->where('parent_id',$categoryId);
		$this->Category->showHasOne();
		$this->Category->showHasMany();
		$subcategories = $this->Category->search();
		
		$this->Category->id = $categoryId;
		$this->Category->showHasOne();
		$this->Category->showHasMany();
		$category = $this->Category->search();
		// $products = $this->Category->custom('select * from products where category_id = ' . $categoryId);
		$this->set('subcategories',$subcategories);
		$this->set('category',$category);
		// $this->set('products', $products);

	}
	function viewProducts($categoryId = null, $categoryName = null) {
	  $categories = performAction('products','findProducts',array($categoryId,$categoryName));
	}
	function addview($parentId, $categoryName = null){
		$this->set('parent_id', $parentId);
		$this->set('category_name', $categoryName);
	}
	function add($parentId, $parentName=null){
		$categoryName = $_POST['category'];
		
		$this->Category->name = $categoryName;
		$this->Category->parent_id = $parentId; 
		$this->Category->save();
		$this->set('parent_id', $parentId);
		$this->set('parent_name', $parentName);
	}
	function editview($id){
		$this->Category->id = $id;
		$category = $this->Category->search();
		
		$this->set('category_id', $category['Category']['id']);
		$this->set('category_name', $category['Category']['name']);

	}
	function update($categoryId){
		// $this->Category->_describe();
		$categoryName = $_POST['category'];
		$this->Category->id = $categoryId;
		$this->Category->name = $categoryName;
		$this->Category->save();
		$this->Category->id = $categoryId;
		$category = $this->Category->search();
		$parentID = $category['Category']['parent_id'];
		$this->Category->id = $parentID;
		$parentCategory = $this->Category->search();
		$this->set('parent_id', $parentID);
		if ($parentID){
			$this->set('parent_name', $parentCategory['Category']['name']);
		}
		
	}
	function delete($categoryId){
		$this->Category->id = $categoryId;
		$this->Category->showHasOne();
		$category = $this->Category->search();
		$this->set('parent_id', $category['Category']['parent_id']);
		$this->Category->id = $categoryId;
		$this->Category->delete();
	}
	
	function index() {
		
		$this->Category->orderBy('name','ASC');
		$this->Category->showHasOne();
		$this->Category->showHasMany();
		$this->Category->where('parent_id','0');
		$categories = $this->Category->search();
		$this->set('categories',$categories);
		// $products = $this->Category->custom('select * from products');
		// $this->set('products', $products);
	
	}


	function afterAction() {

	}


}