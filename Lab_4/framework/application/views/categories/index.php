
<h2><?php echo $html->link('Add a new category', 'categories/addview/0') ?></h2>

<div>
    <?php foreach ($categories as $category):?>
        <div class="category">
            <?php echo $html->link($category['Category']['name'],'categories/view/'.$category['Category']['id'].'/'.$category['Category']['name'])?>
        </div>
    <?php endforeach?>

</div>

