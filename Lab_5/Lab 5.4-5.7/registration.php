<html>

<head>
	<style>
		form {
			width: 100%;
			height: 60%;
	

		}

		input {
			float: right;
			margin-bottom: 1rem;
			padding: 10px;
			width: 80%;
			border: 1px solid #CCC
		}

		button {
			margin-top: 1rem;
			padding: 5px
		}

		.content{
			display: flex;
			justify-content: space-between;
			
		}
		.content .form{
			
			width: 40%;
	
		}
		.content .form .form-item{
			display: flex;
			justify-content: space-between;
		}
		.content .form .form-item label{
			margin-top: 0.7rem;
		}

		.content .info label{
			margin-top: 5rem;
		}
		.content .info select{
			margin-top: 8rem;
			width: 100%;
	
			

		}
	</style>
</head>

<body>
	
	<h1>
		Business Registration
	</h1>
	<a href="index.php">Back to home</a>

	<?php 
		$query = "SELECT Title FROM categories";
		$connect = new mysqli("localhost", "root", "", "business_service");
		$categories = array();
		$result = mysqli_query($connect, $query);
		if ($result){
			while ($row = $result->fetch_row()){
				array_push($categories, $row[0]);
				
			}
		}
		$connect->close();
	?>
	<form id='register-form' action="registration_info.php" method='post'>
		<div class="content">
			<div class="info">
				<label>Click on one or control click on multiple categories</label>
				<select name="categories[]" size="10" multiple required>
					<?php 
						foreach ($categories as $category){
							// if (in_array($category, $selectedCategories)){
							// 	echo '<option value ="' . $category .'" selected>' . $category. ' </option>';
							// }
							// else{
							echo '<option value ="' . $category .'">' . $category. ' </option>';
							// }
							
						}
					?>

				</select>
			</div>
			<div class="form">
				<div class="form-item">
					<label for="Business_name">Business name</label>
					<input type="text" name="Business_name" placeholder="Business name" required>
				</div>

		
				<div class="form-item">
					<label for="Address">Address</label>
					<input type="text" name="Address" placeholder="Address" required>
				</div>
				
		
				<div class="form-item">
					<label for="City">City</label>
					<input type="text" name="City" placeholder="City" required >
				</div>
				
				<div class="form-item">
					<label for="telephone">Telephone</label>
					<input type="telephone" name="telephone" placeholder="telephone" required>
				</div>

				<div class="form-item">
					<label for="URL">URL</label>
					<input type="text" name="URL" placeholder="URL" required> 
				</div>
				<button type="submit" value="Add Business"> Add Business</button>
				
			
			</div>
			
		</div>


		
	</form>









</body>

</html>