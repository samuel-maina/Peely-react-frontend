import React, { useState, useEffect } from 'react'
import FormData from 'form-data'
import axios from 'axios';
import swal from 'sweetalert';
import Nav from './Nav';
import AdminNav from './AdminNav';
import ImageCropper from './ImageCropper'

        const ArticleCreator = () => {

    const[title, setTitle] = useState("");
    const[contributor, setContributor] = useState("");
    const[body, setBody] = useState("");
    const [blob, setBlob] = useState(null);
    const [blobThumbnail, setBlobThumbnail] = useState(null);
    const [inputImg, setInputImg] = useState('');
    const [mainTags, setMaintags] = useState([]);
    const[articleTags, setArticleTags] = useState([])

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

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = new FormData();
        data.append('file', blob, "Hello");
        data.append('file', blobThumbnail, 'somefile');
        uploadFiles(data);


    }
    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = () => {
        axios.get("http://localhost:3030/api/v1/tags/maintags/")
                .then((response) => {
                    setMaintags(response.data);
                }).catch((err) => {
        });

    }

    const addMainTag = (tag) => {
        setArticleTags(state => [...state, tag])
    }
    const removeMainTag = (idx) => {
        setArticleTags(articleTags.filter(item => item.id !== idx.id));
    }

    const   handleTitle = (event) => {
        setTitle(event.target.value);
    }
    const  handleBody = (event) => {
        setBody(event.target.value);
    }
    const  handleContributor = (event) => {
        setContributor(event.target.value);
    }
    async function uploadFiles(data) {
        var response = await axios.post("http://localhost:3030/api/v1/blog/upload/images", data, {

            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }

        })
                .then((response) => {

                    var blog = {title: title, contributor: contributor, body: body, image: response.data, maintags: articleTags}
                    axios.post("http://localhost:3030/api/v1/blog/article", blog)
                            .then((response) => {
                                swal("", "", "success");
                            }).catch((err) => {
                    });

                }).catch((error) => {
            //handle error
        });
    }

    return (
            <div class="margin-top-md ">
                <AdminNav/>
                <div class="">
                    <div class="margin-top-md"> 
                        <form onSubmit={handleSubmit} class="session ">
                            <div class=''>
            
                                <div class=' '>
                                    <div class='flex-vertical'>
                                        <span class="Mulish font-lg">Input Article Information</span>
                                        <p class='Poppins center font-sm'><span class="material-symbols-outlined">
                                                pages
                                            </span>Article title</p>
                                        <input type='text' placeholder='Article title' class='input' value={title} onChange={handleTitle}/>
                                        <p class='Poppins center font-sm'><span class="material-symbols-outlined">
                                                person
                                            </span>Author</p>
                                        <input type='text' placeholder='Article Author' class='input' value={contributor} onChange={handleContributor}/>
                                        <p class='Poppins center font-sm'><span class="material-symbols-outlined">
                                                article
                                            </span>Body</p>
                                        <textarea class='input' value={body} onChange={handleBody}></textarea>
                                        <p>Select an image</p>
                                        <div class=" h-40 input">
                                            <div class="absoluted flex-vertical">
                                                <div class="relative h-40">
                                                    <label for="file-upload" class="custom-file-uploadd font-sm Roboto pointer">
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
            
                                                    <div class="w-100">
                                                        {
                                                            inputImg && (
                            <div class="">
                                <ImageCropper
                                    getBlob={getBlob}
                                    getBlobThumbnail={getBlobThumbnail}
                                    inputImg={inputImg}
                                    />      
                            </div>
                                                                    )
                                                        }
                                                    </div></div></div>
                                        </div>
                                        <div class='flags Poppins border-1'>
                                            <p class='center'> <span class="material-symbols-outlined">
                                                    strategy
                                                </span>Tags</p>
                                            {articleTags ? <div class="flex-horizontal">{articleTags.map(tag => <div class='sub-flag text-gray font-sm Mulish pointer center text-white' onClick={(e) => removeMainTag(tag)}> <span class="material-symbols-outlined">
                                                        cancel
                                                    </span>{tag.tag}</div>)}</div> : <></>}
                                            <div class='flex-horizontal'>
                                                {mainTags.map(tag =>
                        <div class='flag font-sm Mulish pointer center text-white' onClick={(e) => addMainTag(tag)}> <span class="material-symbols-outlined font-sm">
                                add
                            </span>{tag.tag}</div>
                                                    )}
            
            
                                            </div>
                                        </div>
                                        <div class='flags Poppins border-1'>
                                            <p class='center'> <span class="material-symbols-outlined">
                                                    schema
                                                </span>Sub-tags</p>
                                            <div class='flex-horizontal'>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Technology</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Cars</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Entertainment</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Fashion</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Trends</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Sports</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Nature</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Technology</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Cars</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Entertainment</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Fashion</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Trends</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Sports</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Nature</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Technology</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Cars</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Entertainment</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Fashion</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Trends</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Sports</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Nature</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Technology</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Cars</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Entertainment</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Fashion</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Trends</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Sports</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Nature</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Technology</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Cars</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Entertainment</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Fashion</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Trends</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Sports</button>
                                                <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                        add
                                                    </span>Nature</button>
                                            </div>
                                        </div><div class="relative"> </div></div>
            
                                </div>
            
                            </div> 
                            <input type="submit"/>
                        </form>
            
                    </div> 
            
                </div>
            
            </div>
            )
}

export default ArticleCreator