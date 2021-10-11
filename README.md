# SkyDrop
Inspired by Apple's AirDrop, I wanted a simple method to transfer files cross-platform without the hassle of logging into emails or file hosting services. 

## Demo

[Link to app](https://www.skydrop.dev)

SkyDrop has two tabs: **Send** and **Receive** which can be selected in the tab panel near the top.

<p align="center">
    <img src="/README/demo1.PNG" alt="demo1" width="75%"/>
</p>

You can send files by either clicking the *Add File* icon or by dragging and dropping files. Once files are added, they can be removed by clicking the *Remove* icon. The payload size and file count limitations can be seen at the bottom.

<p align="center">
    <img src="/README/demo2.PNG" alt="demo2" width="75%"/>
</p>

Once you are ready to send the files, click the *Send* button. This will send the files to the server and generate a unique address consisting of four easy to remember words. 

<p align="center">
    <img src="/README/demo3.PNG" alt="demo3" width="75%"/>
</p>

You can scan the QR code on a mobile device to be taken directly to the **Receive** tab and automatically populate the address form.

<p align="center">
    <img src="/README/demo4.PNG" alt="demo4" width="75%"/>
</p>

On a non-mobile device, you can manually fill out the address form in the **Receive** tab. The text fields will provide a drop-down list of available word choices as you type and autocomplete the highlighted word if you hit `TAB` or `ENTER` to simplify the process. Once the form is complete, hit the *Fetch* button.

<p align="center">
    <img src="/README/demo5.PNG" alt="demo5" width="75%"/>
</p>

If the address exists, it will fetch and display the files. Here you can download each file individually by clicking the *Download* icon next to each file. You can also click the *Download All* button to download a ZIP.

<p align="center">
    <img src="/README/demo6.PNG" alt="demo6" width="75%"/>
</p>

If the file is an image, you can click the *View Image* icon to preview the image.