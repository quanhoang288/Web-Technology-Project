import React, { Component } from "react";
import "./Test.css";
import FileUploader from '../ImageUploader/ImageUploader'

export class Test extends Component {
  state = {
    downloaded: true,
    obj: null,
    fileName: null,
    file : null
  };
  <!DOCTYPE html>
<html>
<head>
	<title>Download File using PHP</title>
</head>
<body>

<!-- <h2>Download File from HERE : </h2>
<a href="download.php?file=image.jpg">click HERE</a> -->



</body>
</html>

// <?php 


// if (isset($_SERVER['HTTP_ORIGIN'])) {
//     header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
//     header('Access-Control-Allow-Credentials: true');
//     header('Access-Control-Max-Age: 86400');    // cache for 1 day
// }

// // Access-Control headers are received during OPTIONS requests
// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

//     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
//         header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");         

//     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
//         header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

//     exit(0);
// }

// if(!empty($_GET['file']))
// {
// 	$filename = basename($_GET['file']);
// 	$filepath = 'upload/' . $filename;
// 	if(!empty($filename) && file_exists($filepath)){

// //Define Headers
// 		header("Cache-Control: public");
// 		header("Content-Description: FIle Transfer");
// 		header("Content-Disposition: attachment; filename=$filename");
// 		header("Content-Type: application/zip");
// 		header("Content-Transfer-Emcoding: binary");

// 		readfile($filepath);
// 		exit;

// 	}
// 	else{
// 		echo "This File Does not exist.";
// 	}
// }

//  ?>
  downloadRequest = () => {
    
    // axios({
    //   url: 'http://localhost/downloadfile/test.php?file=Hello.docx',
    //   method: 'GET',
    //   responseType: 'blob', // important
    // }).then((response) => {
    //    const url = window.URL.createObjectURL(new Blob([response.data]));
    //    this.setState({obj:url}) 
  
      //  const link = document.createElement('a');
      //  link.href = url;
      //  link.setAttribute('download', 'x.docx'); //or any other extension
      //  document.body.appendChild(link);
      //  link.click();
    // });


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      
      redirect: "follow",
    };

    fetch(
      "http://localhost/downloadfile/test.php?file=Hello.docx",
      requestOptions
    )
      .then((response) => response.blob())
      .then((blob) => {
        var objectURL = window.URL.createObjectURL(blob); 
        this.setState({obj:objectURL}) 
        const link = document.createElement('a');
        link.href = objectURL;
        link.setAttribute('download', 'x.docx'); //or any other extension
        document.body.appendChild(link);
        link.click();
                
                
    })
      .catch((error) => console.log("error", error));
  };

  render() {
    if(this.state.file) 
    {console.log(this.state.file)}
    return (
      <React.Fragment>
        {
          this.state.obj ? 
          <a download='x.docx' href={this.state.obj}>Hello</a> : null
        }
       
        <FileUploader
            onChange={(file) => {
              var prevState = { ...this.state };
              prevState.file = file;
              this.setState(prevState);
            }}
          ></FileUploader>
        <button onClick={this.downloadRequest}>Hello</button>
        <table id="customers">
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Berglunds snabbköp</td>
            <td>Christina Berglund</td>
            <td>Sweden</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Königlich Essen</td>
            <td>Philip Cramer</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
          <tr>
            <td>North/South</td>
            <td>Simon Crowther</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Paris spécialités</td>
            <td>Marie Bertrand</td>
            <td>France</td>
          </tr>
        </table>
      </React.Fragment>
    );
  }
}

export default Test;
