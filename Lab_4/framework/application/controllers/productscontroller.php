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

		
	function findProducts ($categoryId = null, $categoryName = null) {
		$this->Product->where('category_id',$categoryId);
		$this->Product->orderBy('name');
		return $this->Product->search();
	}
		

	function afterAction() {

	}
	

}