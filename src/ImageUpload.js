import React, { useState } from 'react'
import FormData from 'form-data'
import axios from 'axios';
import ImageCropper from './ImageCropper'

        const ImageUpload = () => {
    const [blob, setBlob] = useState(null)
    const [blobThumbnail, setBlobThumbnail] = useState(null)
    const [inputImg, setInputImg] = useState('')

    const getBlob = (blob) => {
        // pass blob up from the ImageCropper component
        setBlob(blob);
    };
    const getBlobThumbnail = (blobThumbnail) => {
        // pass blob up from the ImageCropper component
        setBlobThumbnail(blobThumbnail);
    };

    const onInputChange = (e) => {
        // convert image file to base64 string
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            setInputImg(reader.result)
        }, false)

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    const handleSubmitImage = (e) => {
        // upload blob to firebase 'images' folder with filename 'image'
        e.preventDefault()
        let data = new FormData();
        data.append('file', blob, "Hello");
        data.append('file', blobThumbnail, 'somefile');
        axios.post("http://localhost:3030/api/v1/blog/upload", data, {

            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }

        })
                .then((response) => {
                    //handle success
                    console.log(data);
                }).catch((error) => {
            //handle error
        });


    }


    return (
            <form onSubmit={handleSubmitImage} class="flex-vertical w-10">
                <div class='centerpasge'><span class="material-symbols-outlined font-xxl">
                        photo_frame
                    </span></div>
                <span class="Mulish font-lg">Upload article image</span>
                <label for="file-upload" class="custom-file-upload font-sm Roboto pointer">
                    <input
                        id='file-upload'
                        type='file'
                        accept='image/*'
                        onChange={onInputChange}
                        class='sub-flag'
                        />
                    Select an image to edit before uploading
                    <span class="material-symbols-outlined float-right">
                        photo_size_select_small
                    </span>
                </label>
            
                <div class=" centerpage">
                    {
                        inputImg && (
                            <div class="w-80">
                                <ImageCropper
                                    getBlob={getBlob}
                                    getBlobThumbnail={getBlobThumbnail}
                                    inputImg={inputImg}
                                    />      
                            </div>
                                )
                    }
                </div>
                <button class='chat flag play text-white center' type="submit"
                        sx={{mt: 1}}> <span class="material-symbols-outlined">
                        newsmode
                    </span>Publish</button>
            </form>
            )
}

export default ImageUpload