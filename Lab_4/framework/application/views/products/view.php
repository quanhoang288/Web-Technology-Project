
<h2><?php echo $html->link('Back to product list', 'categories/view' . '/' . $product['Category']['id'] . '/' . $product['Category']['name']) ?></h2>

<div>
    <h2><strong><?php echo $product['Product']['name']?></strong>
</div>

<div><h2>Price: $<?php echo $product['Product']['price']?></h2>


<?php if (!empty($product['Tag'])):?>
<h2>Tags:</h2>

<?php foreach ($product['Tag'] as $tags):?>
<div class="tag">
<?php echo $tags['Tag']['name']?>
</div>
<?php endforeach?>
</div>
<?php endif?>
<div> <h2><?php echo $html->link('Edit product', 'products/editview/' . $product['Product']['id'] . '/' . $product['Product']['name']) ?></h2></div>
<div> <h2><?php echo $html->link('Delete this product', 'products/delete/' . $product['Product']['id']) ?></h2></div>