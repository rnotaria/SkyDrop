# SkyDrop
Inspired by Apple's AirDrop, I wanted a simple method to transfer files cross-platform without the hassle of logging into emails or file hosting services. 

***Table of Contents***
  * [Demo](#demo)
  * [How It Works](#how-it-works)
  * [Upcoming Features](#upcoming-features)

## Demo

[Link to app](https://www.skydrop.dev)

SkyDrop has two tabs: **Send** and **Receive** which can be selected in the tab panel near the top. This demo will start with the **Send** tab.

<p align="center">
    <img src="/README/demo1.PNG" alt="demo1" width="50%"/>
</p>

You can send files by either clicking the *Add File* icon or by dragging and dropping files. Once files are added, they can be removed by clicking the *Remove* icon. The payload size and file count limitations can be seen at the bottom.

<p align="center">
    <img src="/README/demo2.PNG" alt="demo2" width="50%"/>
</p>

Once you are ready to send the files, click the *Send* button. This will send the files to AWS and generate a unique address consisting of four easy to remember words. 

<p align="center">
    <img src="/README/demo3.PNG" alt="demo3" width="50%"/>
</p>

You can scan the QR code on a mobile device to be taken directly to the **Receive** tab and automatically populate the address form.

<p align="center">
    <img src="/README/demo4.PNG" alt="demo4" width="50%"/>
</p>

On a non-mobile device, you can manually fill out the address form in the **Receive** tab. The text fields will render a drop-down list of available word choices as you type and autocomplete the highlighted word if you hit `TAB` or `ENTER` to simplify the process. Once the form is complete, hit the *Fetch* button.

<p align="center">
    <img src="/README/demo5.PNG" alt="demo5" width="50%"/>
</p>

If the address exists, it will fetch and display the files. Here you can download each file individually by clicking the *Download* icon next to each file. You can also click the *Download All* button to download a ZIP file containing all the files.

<p align="center">
    <img src="/README/demo6.PNG" alt="demo6" width="50%"/>
</p>

If the file is an image, you can click the *View Image* icon to preview the image.

## How It Works

### Address Generation
One of the requirements for this project was to make file transfers quick and simple. I found the best way to do this was to scrap the user authentication system that file hosting services typically use. SkyDrop avoids this by using Go's [crypto/rand](https://pkg.go.dev/crypto/rand) package to randomly select four words from the [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt) word list. Together, these words form an "address". Remembering four words is simple while also providing over 17 trillion unique address combinations making the chances of collision slim to none.

### AWS
An AWS S3 bucket is used to store files sent through SkyDrop. All files sent are first archived into a ZIP file in the backend before being sent to S3. This reduces cost by reducing the number of `GET` and `POST` requests made to AWS. The bucket is also configured with a Lifecycle Rule that deletes objects after 24 hours to further reduce cost.

### Cloudflare
One potential issue that needed to be addressed was if the application were to be DDOS attacked. This could allow attackers to spam the server by either sending large amounts of data to AWS racking up charges or by making several attempts to guess an address and exposing user data (**You should not send personal files regardless**). To combat this, I routed my app to Cloudflare to act as a sort of proxy server. Cloudflare rate limits users who make too many requests in a short time while also providing several other defenses.


## Upcoming Features