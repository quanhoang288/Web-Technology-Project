<?php foreach ($products as $product):?>
<div>
<?php echo $product['Product']['name']?>
</div>
<?php endforeach?>
 
<?php for ($i = 1; $i <= $totalPages; $i++):?>
<div>
<?php if ($i == $currentPageNumber):?>
<?php echo $currentPageNumber?>
<?php else: ?>
<?php echo $html->link($i,'products/page/'.$i)?>
<?php endif?>
</div>
<?php endfor?>
