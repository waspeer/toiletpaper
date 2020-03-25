<div align="center">
  <h1>Toiletpaper</h1>
  <p>Special Klangstof store for a sad occasion</p>
</div>

This is a special store build for my band [Klangstof](http://klangstof.com) to raise funds for the whole team behind the band that are struck by the recent situation around Covid-19.

## Why?

We have a store on Shopify, which works really well. For this special store though, we wanted some features that Shopify couldn't provide for us:

-   Pay what you want on all products
-   The option to leave a donation and not buy a product.

Maybe somewhere hidden in the Shopify universe there are some tools which could have helped us build this, but it seemed like a fun challenge to build a custom store myself.

## How does it work?

-   The products are fetched from a specific collection in the Shopify store. 
-   All the products have a special discount. 
-   The discounted price is the minimum you can pay for the product. When you order a product you can choose to pay something extra. 
-   When you check out and there are no products in your cart you get the option to just leave a donation.
-   Payments are handled by stripe.
-   A webhook endpoint listens for succeeded payments and logs everything in a Google Spreadsheet.

## Can I use this?

Of course! You can supply your credentials in a .env file and edit the global settings in `/src/lib/constants.ts`. The global theme (colors, font etc.) are set in `/src/style/` and you can edit the page content in the `/src/sections/` folder.

The project is built in Typescript with Next.js

## License

MIT © Wannes Salomé
