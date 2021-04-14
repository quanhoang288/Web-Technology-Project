<?php if($parent_id): ?>
    <h2><?php echo $html->link('Category successfully added. Click here to go back.', 'categories/view/' . $parent_id . '/' . $parent_name) ?></h2>

<?php else: ?>
    <h2><?php echo $html->link('Category successfully added. Click here to go back.', 'categories/index') ?></h2>

<?php endif ?>