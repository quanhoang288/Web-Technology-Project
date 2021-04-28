<?php echo '<form action=' .'"'. BASE_PATH .'/categories/update' . '/' . $category_id  .'"' .' method="post">' ?>
<input type="text"  name="category" value="<?php echo $category_name?>"> <input type="submit" value="Save">
</form>