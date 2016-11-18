MediumLightbox
=============

####Nice and elegant way to add zooming functionality for images, inspired by medium.com

This plugin reproduce exactly the same code that use Medium to add the smooth transition effect clicking over the images, with some improvement.
* **It works on mobile**, unlike [Medium](https:/medium.com).
* **It's simple**, unlike [Fluidbox](http://terrymun.github.io/Fluidbox/).

#####Key features
Written in pure javascript for better performance, lightweight and simple.
#####Use

**Include**

    <link href="style.css" rel="stylesheet">
    <script src="mediumLightbox.js" ></script>
**Style.css** has some extra style for demo purposes. Pick just what you need.

**html**

    <figure class="half left zoom-effect">
        <div class="aspectRatioPlaceholder" >
            <div class="aspect-ratio-fill" style="padding-bottom: 50%;"></div>
            <img class="img" src="image_tn.jpg" data-src="image.jpg">
        </div>
    </figure>

**Initialize plugin**

	MediumLightbox('figure.zoom-effect');
####Option

    MediumLightbox('figure.zoom-effect', {
        margin:40
    });
* **Margin** - default: 20 - Margin in px applied to the image in zoomed view.
