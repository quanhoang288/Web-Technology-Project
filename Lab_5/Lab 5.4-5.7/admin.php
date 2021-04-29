<html>

<head>
	<style>
		table{
			border-collapse: collapse;
		}
		th, td{
			border: 1px solid;
		}
		td.input{
			border: none;
		}
		input{
			width: 100%;
		}
		button {
			margin-top: 1rem;
			padding: 5px
		}

	</style>
</head>

<body>

	<?php
		$connect = new mysqli("localhost", "root", "", "business_service");
		if (isset($_POST['Title'])) {
			$Title = $_POST['Title'];
			$Description = $_POST['Description'];
			$connect = new mysqli("localhost", "root", "", "business_service");
			$query = 'INSERT INTO categories(Title, Description)
				  VALUES ('.'"'.$Title . '", "' . $Description . '")';
			// echo $query;
			mysqli_query($connect, $query);
			
		}
		$query = 'SELECT * FROM categories';
		$result = mysqli_query($connect, $query);
		$categories = array();
		
		if ($result){
			$numFields = $result->field_count;
			while($row = $result->fetch_row()){
				array_push($categories, $row);
			}
		}
		$connect->close();
	
	?>
	<h1>
		Category Adminstration
	</h1>
	<a href="index.php">Back to home</a>
	<br>
	<form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
		<table style="width:100%">

			<th>CatID</th>
			<th>Title</th>
			<th>Decription</th>
			<?php foreach($categories as $category){ ?>
				<tr>
			<?php
				for ($i = 0; $i < $numFields; $i++){	
			?>
				<td><?php echo $category[$i]?></td>	
			<?php } ?>
				</tr>
			<?php }?>
			<tr>
				<td class="input"></td>
				<td class="input"><input type="text" name="Title" required></td>
				<td class="input"><input type="text" name="Description" required></td>
			</tr>

		</table>
		<button type="submit">Add category</button>
	</form>



</body>

</html>