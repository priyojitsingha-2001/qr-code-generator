import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';


inquirer
    .prompt([
        /* Pass your questions in here */
        {
            message: "Type in your Url",
            name: "URL",
        }
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        const url = answers.URL;

        //a png image redirecting to the above url is created
        var qr_png = qr.image(url);
        qr_png.pipe(fs.createWriteStream("qr_image.png"));

        //the url is also being saved as a text file
        fs.writeFile("url.txt", url, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("file generated !!!");
        })
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });