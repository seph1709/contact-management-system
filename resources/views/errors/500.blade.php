<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv='refresh' content='10; URL=http://127.0.0.1:8000/login'>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
    href="https://fonts.googleapis.com/css2?family=Happy+Monkey&family=M+PLUS+Rounded+1c&family=Text+Me+One&family=Varela+Round&display=swap"
    rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
    href="https://fonts.googleapis.com/css2?family=Happy+Monkey&family=M+PLUS+Rounded+1c&family=Varela+Round&display=swap"
    rel="stylesheet"
    /> 
    <title>unauthorized</title>
    <style>
      body {
        font-family: "Varela Round", serif;
        height: 100vh;
        width: 100vw;
        color: #444444;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
      
      }
      h2,p {
        text-align: center;
        width: 500px;
        margin: 0 auto;
            }
            #error-unauthorized-header{
              margin-bottom: 20px;
              color: red;
            }
    </style>
    
</head>
<body>
  
    <h2 id="error-unauthorized-header">Unauthorized Access!!</h2>
    <p id="error-unauthorized">Please login first to access this page. <span style="display:block"> redirecting to Login Page in 10 sec...</span>
    </p>
 
</body>
</html>