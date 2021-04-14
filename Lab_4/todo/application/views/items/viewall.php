<?php echo '<form action="' . BASE_PATH . 'items/add' . '"'. 'method="post">' ?>
<input type="text" value="I have to..." onclick="this.value=''" name="todo"> <input type="submit" value="add">
</form>
<br/><br/>
<?php $number = 0?>
 
<?php foreach ($todo as $todoitem):?>
    <a class="big" href= <?php echo '"'. BASE_PATH . 'items/view/'. $todoitem['Item']['id']. '/' . strtolower(str_replace(" ","-",$todoitem['Item']['item_name'])) . '"'?>>
    <span class="item">
    <?php echo ++$number?>
    <?php echo $todoitem['Item']['item_name']?>
    </span>
    </a><br/>
<?php endforeach?>
