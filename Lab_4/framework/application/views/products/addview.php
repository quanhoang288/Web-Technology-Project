<?php echo '<form action='.'"'. BASE_PATH . '/products/add/'  . $category_id . '/' . $category_name .'"' .' method="post">' ?>
<div class = 'input'>
    <label for="name">Name of product</label>
    <input type="text" onclick="this.value=''" name="name"> 
</div>
<div class = 'input'>
    <label for="price">Price</label>
    <input type="text" onclick="this.value=''" name="price">
</div>
<div class = 'input'>
    <label for="tag">Product tags</label> 
    <input type="text" onclick="this.value=''" name="tag"> 
</div>

<input type="submit" value="Add Product">
</form>