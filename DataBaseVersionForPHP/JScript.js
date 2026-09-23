
document.addEventListener("DOMContentLoaded", function () {

    /*
 bara check url php
    */

    if (
        typeof USER_PROFILE_URL === "undefined" ||
        !USER_PROFILE_URL
    ) {

        console.error(
            "USER_PROFILE_URL was not provided by PHP."
        );

        return;
    }


    /*
    |--------------------------------------------------------------------------
    | Current colors
    |--------------------------------------------------------------------------
    */

    let currentGradient = [
        "#6a5cff",
        "#ff5ca8"
    ];


    /*
    |--------------------------------------------------------------------------
    | Create QR Code
    |--------------------------------------------------------------------------
    */

    const qrContainer =
        document.getElementById("qrCanvas");


    if (!qrContainer) {

        console.error(
            "QR container #qrCanvas was not found."
        );

        return;
    }


    /*
    |--------------------------------------------------------------------------
    | Check QR library
    |--------------------------------------------------------------------------
    */

    if (
        typeof QRCodeStyling === "undefined"
    ) {

        console.error(
            "QRCodeStyling library was not loaded."
        );

        return;
    }


    /*
    |--------------------------------------------------------------------------
    | QR Code
    |--------------------------------------------------------------------------
    */

    const qrCode = new QRCodeStyling({

        width: 240,

        height: 240,

        type: "canvas",

        data: USER_PROFILE_URL,

        margin: 4,


        /*
        | Error correction
        */

        qrOptions: {

            errorCorrectionLevel: "H"

        },


        /*
        | QR dots
        */

        dotsOptions: {

            type: "rounded",

            gradient: {

                type: "linear",

                rotation: Math.PI / 4,

                colorStops: [

                    {
                        offset: 0,
                        color: currentGradient[0]
                    },

                    {
                        offset: 1,
                        color: currentGradient[1]
                    }

                ]

            }

        },


        /*
        | Corner squares
        */

        cornersSquareOptions: {

            type: "extra-rounded",

            color: currentGradient[0]

        },


        /*
        | Corner dots
        */

        cornersDotOptions: {

            type: "dot",

            color: currentGradient[0]

        },


        /*
        | Background
        */

        backgroundOptions: {

            color: "#ffffff"

        },


        /*
        | Logo
        */

        image: "logo.png",


        imageOptions: {

            crossOrigin: "anonymous",

            margin: 6,

            imageSize: 0.35

        }

    });


    /*
    |--------------------------------------------------------------------------
    | Display QR
    |--------------------------------------------------------------------------
    */

    qrCode.append(qrContainer);


    /*
    |--------------------------------------------------------------------------
    | Recolor logo
    |--------------------------------------------------------------------------
    */

    function recolorImage(
        src,
        hexColor,
        callback
    ) {

        const img = new Image();

        img.crossOrigin = "anonymous";


        img.onload = function () {

            const canvas =
                document.createElement("canvas");


            canvas.width = img.width;

            canvas.height = img.height;


            const ctx =
                canvas.getContext("2d");


            if (!ctx) {

                console.error(
                    "Could not create canvas context."
                );

                return;

            }


            /*
            | Draw original logo
            */

            ctx.drawImage(
                img,
                0,
                0
            );


            /*
            | Keep the original transparency
            | and apply selected color
            */

            ctx.globalCompositeOperation =
                "source-in";


            ctx.fillStyle = hexColor;


            ctx.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            /*
            | Return PNG
            */

            callback(
                canvas.toDataURL("image/png")
            );

        };


        img.onerror = function () {

            console.warn(
                "logo.png could not be loaded. QR will work without the logo."
            );

        };


        img.src = src;

    }


    /*
    |--------------------------------------------------------------------------
    | Color buttons
    |--------------------------------------------------------------------------
    */

    const swatches =
        document.querySelectorAll(".swatch");


    swatches.forEach(function (button) {


        button.addEventListener(
            "click",
            function () {


                /*
                | Remove active state
                */

                swatches.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                /*
                | Activate clicked color
                */

                button.classList.add(
                    "active"
                );


                /*
                | Get colors
                */

                currentGradient = [

                    button.dataset.g1,

                    button.dataset.g2

                ];


                /*
                | Update QR
                */

                qrCode.update({

                    dotsOptions: {

                        type: "rounded",

                        gradient: {

                            type: "linear",

                            rotation: Math.PI / 4,

                            colorStops: [

                                {
                                    offset: 0,
                                    color: currentGradient[0]
                                },

                                {
                                    offset: 1,
                                    color: currentGradient[1]
                                }

                            ]

                        }

                    },


                    cornersSquareOptions: {

                        type: "extra-rounded",

                        color:
                            currentGradient[0]

                    },


                    cornersDotOptions: {

                        type: "dot",

                        color:
                            currentGradient[0]

                    }

                });


                /*
                | Recolor logo
                */

                recolorImage(

                    "logo.png",

                    currentGradient[0],

                    function (tintedLogo) {

                        qrCode.update({

                            image: tintedLogo

                        });

                    }

                );

            }
        );

    });


    /*
    |--------------------------------------------------------------------------
    | Initial logo color
    |--------------------------------------------------------------------------
    */

    recolorImage(

        "logo.png",

        currentGradient[0],

        function (tintedLogo) {

            qrCode.update({

                image: tintedLogo

            });

        }

    );


    /*
    |--------------------------------------------------------------------------
    | Download button
    |--------------------------------------------------------------------------
    */

    const output =
        document.getElementById("out");


    if (!output) {

        console.error(
            "#out was not found."
        );

        return;

    }


    const downloadButton =
        document.createElement("button");


    downloadButton.type =
        "button";


    downloadButton.textContent =
        "دانلود QR Code";


    downloadButton.addEventListener(
        "click",
        function () {

            qrCode.download({

                name:
                    "my-profile-qrcode",

                extension:
                    "png"

            });

        }
    );


    output.appendChild(
        downloadButton
    );

});

