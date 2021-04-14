<?php

class ProductsController extends VanillaController {
	
	function beforeAction () {
		
	}

	function view($id = null) {
		$this->Product->id = $id;
		$this->Product->showHasOne();
		$this->Product->showHMABTM();
		$product = $this->Product->search();
		$this->set('product',$product);
		
	}

	function page ($pageNumber = 1) {
		$this->Product->setPage($pageNumber);
		$this->Product->setLimit('10');
		$products = $this->Product->search();
		$totalPages = $this->Product->totalPages();
		$this->set('totalPages',$totalPages);
		$this->set('products',$products);
		$this->set('currentPageNumber',$pageNumber);
	}
	function addview($categoryId, $categoryName=null){
		$this->set('category_id', $categoryId);
		$this->set('category_name', $categoryName);
	}
	function add($category_id, $category_name){
		$name = $_POST['name'];
		$price = $_POST['price'];

		$tags = explode(',', $_POST['tag']);
		$this->set('category_id', $category_id);
		$this->set('category_name', $category_name);
		// $tag_ids = array();
		$this->Product->name = $name;
		$this->Product->category_id = $category_id;
		$this->Product->price = $price;
		$this->Product->save();
		// echo $name . ' </br>';
		
		$product = $this->Product->custom('SELECT id from products WHERE name = '. '"' . $name . '"')[0];
		$productId = $product['Product']['id'];
		
		
		
		foreach($tags as $value){
			// echo $value;
			$value = strtolower(trim($value));
			$tag = $this->Product->custom('SELECT id from tags WHERE name = ' . '"' . $value . '"');
			if (!count($tag)){
				$this->Product->custom('INSERT INTO tags (name) VALUES(' . '"' . $value . '"' . ')');
				$tag = $this->Product->custom('SELECT id from tags WHERE name = ' . '"' . $value . '"')[0];
				$this->Product->custom('INSERT INTO products_tags (product_id, tag_id) VALUES(' . $productId . ', ' . $tag['Tag']['id'] . ')');
			}
			else{
				$this->Product->custom('INSERT INTO products_tags VALUES(' . $productId . ', ' . $tag[0]['Tag']['id'] . ')');
			}
			// array_push($tag_ids, $tag['Tag']['id']);
			
		}

		
		


		
	}
		
	function findProducts ($categoryId = null, $categoryName = null) {
		if ($categoryId){
			$this->Product->where('category_id',$categoryId);
		}
		$this->Product->orderBy('name');
		return $this->Product->search();
	}
		

	function afterAction() {

	}
	

}