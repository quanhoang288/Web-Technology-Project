<?php
include_once("Model/Book.php");

class Model{
  public function getBookList(){
    return array(
      "Jungle Book" => new Book("Jungle Book", "R.Kipling", "A classic book."),
      "MoonWalker" => new Book("MoonWalker", "J.Walker", ""),
      "PHP for Dummies" => new Book("PHP for Dummies", "Some Smart Guy", "")
    );
  }

  public function getBook($title){
    $allBooks = $this->getBookList();
    return $allBooks[$title];
  }
}