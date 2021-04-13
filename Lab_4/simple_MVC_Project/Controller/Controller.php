<?php
include_once("Model/Model.php");

class Controller{
  public $model;

  public function __construct(){
    $this->model =  new Model();
  }

  public function invoke(){
    if( !isset($_GET['book']) ){
      $books = $this->model->getBookList();
      include 'View/BookList.php';
    }
    else{
      $book = $this->model->getBook($_GET['book']);
      include 'View/ViewBook.php' ;
    }
  }
}
?>