

<div>
    <h2><strong><?php echo $category['Category']['name'] ?></strong>
</div>
<?php if (empty($category['Product']) && !$category['Category']['parent_id']) : ?>
    <div>
        <h2><?php echo $html->link('Back to home', 'categories/index')?></h2>
        <h2><?php echo $html->link('Add a new sub-category', 'categories/addview/'  . $category['Category']['id'] . '/' . $category['Category']['name']) ?></h2>
        <h2><?php echo $html->link('Edit this category', 'categories/editview/' . $category['Category']['id'] . '/'.$category['Category']['name'])?></h2>
        <h2><?php echo $html->link('Delete this category', 'categories/delete/' . $category['Category']['id'])?></h2>
        
    </div>
<?php endif ?>
<?php if (!empty($subcategories)) : ?>
    <div>
       
        <h2>Please select a sub-category</h2>
        <?php foreach ($subcategories as $subcategory) : ?>
            <div class="category">

                <?php echo $html->link($subcategory['Category']['name'], 'categories/view/' . $subcategory['Category']['id'] . '/' . $subcategory['Category']['name']) ?>

            </div>
        <?php endforeach ?>
    </div>
<?php endif ?>
<?php if ($category['Category']['parent_id']) : ?>
    <div>
        <h2><?php echo $html->link('Back to category list', 'categories/view/' . $category['Category']['parent_id'])?></h2>
        <h2><?php echo $html->link('Edit this category', 'categories/editview/' . $category['Category']['id'] . '/'.$category['Category']['name'])?></h2>
        <h2><?php echo $html->link('Delete this category', 'categories/delete/' . $category['Category']['id'])?></h2>
        <h2><?php echo $html->link('Add a new product', 'products/addview/' . $category['Category']['id'] . '/' . $category['Category']['name']) ?></h2>
    </div>
<?php endif ?>
<?php if (!empty($category['Product'])) : ?>
    <div>
        <h2>Please select a product</h2>
        <?php foreach ($category['Product'] as $product) : ?>
            <div class="category">

                <?php echo $html->link($product['Product']['name'], 'products/view/'  . $product['Product']['id'] . '/' . $product['Product']['name']) ?>

            </div>
        <?php endforeach ?>
    </div>
<?php elseif (empty($subcategory)) : ?>
    <p>No products found</p>



<?php endif ?>