<?php 
    $tags = '';
    foreach($product['Tag'] as $idx => $tag){
        if ($idx != count($product['Tag']) - 1){
            $tags .= $tag['Tag']['name'] . ', ';
        }
        else {
            $tags .= $tag['Tag']['name'];
        }
    }
?>

<html>
    
    <?php echo '<form action='.'"'. BASE_PATH . '/products/edit/'  . $product['Product']['id'] . '/' . $product['Product']['name'] .'"' .' method="post">' ?>
    <div class = 'input'>
        <label for="name">Name of product</label>
        <input type="text"   name="name" value="<?php echo $product['Product']['name'] ?>"> 
    </div>
    <div class = 'input'>
        <label for="price">Price</label>
        <input type="text"  name="price" value = "<?php echo $product['Product']['price']?>">
    </div>
    <div class = 'input'>
        <label for="tag">Product tags</label> 
        <input type="text" name="tag" value="<?php echo $tags ?>"> 
    </div>

    <input type="submit" value="Add Product">
    </form>


</html>

