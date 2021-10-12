<html>
    <head>
        <script src="./dist/index.js"></script>
        <style>
            body {
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
            #three {
                width: 100vw;
                height: 100vh;
            }
            #svg-container {
                display: none;
            }
        </style>
    </head>
    <body>
        <div id="svg-container">
            <?php echo file_get_contents('./src/strangereal.svg') ?>
        </div>
        <div id="three"></div>
    </body>
</html>