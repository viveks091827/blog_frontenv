import React, { useRef, useEffect, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Image from 'next/image'
import getCookie from '../common/getCookie';
import axios from 'axios'
import styles from '../styles/Setting.module.css'
import compressImage from '../common/imageUtils';


const ImageCropper = () => {
  const cropperRef = useRef(null);
  const [cropData, setCropData] = useState('');
  const [imgCropped, setImgCropped] = useState(false)

  const [profile, setProfile] = useState({})
  const [id, setId] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [imgUrl, setImgUrl] = useState('')
  const [loggedUser, setLoggedUser] = useState({})
  const [canvas, setCanvas] = useState()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [secondryEmail, setSecondryEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [backupEmail, setBackupEmail] = useState('')
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [compressedImage, setCompressedImage] = useState(null);

  let userId = getCookie('uid')



  const handleImageUpload = async () => {
    setUploading(true)

    try {
      if (!selectedFile) return

      const formData = new FormData()

      const contentType = "image/png";


      console.log('data', cropData);


      const blobPromise = new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      });

      const blob = await blobPromise;

      const file = new File([blob], 'filename.png', { type: 'image/png' });
      
      console.log('blob: ', blob)
      console.log('compress: ', file)

      const compressed = await compressImage(file, 100, 100, 0.5);

      console.log('after compressed: ', compressed)

      const base64Data = compressed.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');


      const decodedData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

      const compBlob = new Blob([decodedData], { type: 'image/png' });

      console.log('compBlob: ', compBlob)

      setCompressedImage(compressed);

      formData.append('image', compBlob, 'cropped_image.png');



      formData.append('userId', id);


      const { data } = await axios.post(`http://${process.env.NEXT_PUBLIC_API_HOST}/profile/image?userId=${id}`, formData)
      console.log(data)

    } catch (error) {
      console.log('file upload error: ', error)
    }
    setUploading(false)
    window.location.reload();
  }

  const updateUserData = async (e) => {
    console.log('updating user profile')

    const data = {}

    if (firstName.length > 0) {
      data['firstName'] = firstName
    }

    if (lastName.length > 0) {
      data['lastName'] = lastName
    }

    if (secondryEmail.length > 0) {
      data['backupEmail'] = secondryEmail
    }

    if (phoneNum.length > 0) {
      data['phoneNo'] = phoneNum
    }

    if (address.length > 0) {
      data['address'] = address
    }

    if (country.length > 0) {
      data['country'] = country
    }

    if (region.length > 0) {
      data['region'] = region
    }

    console.log('data: ', data)

    const res = await axios({
      method: 'put',
      url: `http://${process.env.NEXT_PUBLIC_API_HOST}/user/${id}`,
      data: data
    });

    // console.log('response data: ', res)

  }

  const getProfilePicture = async (userId) => {
    axios.get(`http://${process.env.NEXT_PUBLIC_API_HOST}/user/profilePicture/${userId}`, { responseType: 'arraybuffer' })
      .then(response => {
        console.log('profilepic: ', response.data)
        const fileExtension = 'png'
        let mimeType;
        if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
          mimeType = 'image/jpeg';
        } else if (fileExtension === 'png') {
          mimeType = 'image/png';
        } else {
          console.error('Unsupported image format');
          return;
        }

        // Create a blob from the binary data returned in the response
        const blob = new Blob([response.data], { type: mimeType });
        console.log('blob: ', blob)

        const url = URL.createObjectURL(blob);

        console.log('url: ', url)

        setImgUrl(url)


      })
      .catch(error => {
        console.error(error);
      });
  }


  const handleCrop = () => {
    if (typeof cropperRef.current.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    setCanvas(cropperRef.current.cropper.getCroppedCanvas())
    setImgCropped(true)
  };

  const getProfile = async (userId) => {
    console.log('userId : ', userId)


    axios.get(`http://${process.env.NEXT_PUBLIC_API_HOST}/profile/${userId}`, {

    }, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
            setLoggedUser(response.data.data)
        })
        .catch((error) => {
            console.error(error);
        });
}


  useEffect(() => {
    if (userId.length > 0) {
      getProfilePicture(userId)
      setId(userId)
      getProfile(userId)
    }
  }, [])

  console.log('user: ', loggedUser)

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
             
                  <Image
                    src={imgUrl}
                    alt="logo"
                    width={100}
                    height={100}
                    style={{ border: "solid black 1px", 'border-radius': "100%", 'border': 'none' }}
                  />
              {
                loggedUser ? <span class="font-weight-bold">{loggedUser.firstName}</span> : <span class="font-weight-bold">guest</span>
              }

              <span> </span></div> </div>
          <div class="col-md-5 border-right">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Settings</h4>
              </div>
              <form onSubmit={updateUserData}>
                <div class="row mt-2">
                  <div class="col-md-6"><label class="labels">Name</label>
                    <input type="text" class="form-control" placeholder="first name" onChange={(e) => { setFirstName(e.target.value) }} />
                  </div>
                  <div class="col-md-6"><label class="labels">Surname</label>
                    <input type="text" class="form-control" onChange={((e) => { setLastName(e.target.value) })} placeholder="last name" />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12"><label class="labels">Phone Number</label>
                    <input type="text" class="form-control" placeholder="enter phone number" onChange={(e) => { setPhoneNum(e.target.value) }} />
                  </div>
                  <div class="col-md-12"><label class="labels">Address</label>
                    <input type="text" class="form-control" placeholder="enter address" onChange={(e) => { setAddress(e.target.value) }} />
                  </div>
                  <div class="col-md-12"><label class="labels">Backup Email Id</label>
                    <input  class="form-control" type="email" placeholder="enter email id" onChange={(e) => { setSecondryEmail(e.target.value) }} />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6"><label class="labels">Country</label>
                    <input type="text" class="form-control" placeholder="country" onChange={(e) => { setCountry(e.target.value) }} />
                  </div>
                  <div class="col-md-6"><label class="labels">State/Region</label>
                    <input type="text" class="form-control" onChange={(e) => { setRegion(e.target.value) }} placeholder="state" />
                  </div>
                </div>
                <div className={`mt-5 text-center ${styles.submitButton}`}>
                <button className={`${styles.button}`} type='submit'>Save Profile</button>
              </div>
              </form>
              
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center experience">
                <span>Upload Image</span>
              </div>
              <br />
              <div className={`col-md-12 ${styles.inputBox}`}>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      const file = e.target.files[0];
                      setSelectedImage(URL.createObjectURL(file));
                      setSelectedFile(file)
                    }
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        setCropData(reader.result);
                      }
                    };
                    reader.readAsDataURL(e.target.files[0]);


                  }}
                />
              </div>
              <br />
              <div class="col-md-12">
                <Cropper
                  ref={cropperRef}
                  src={cropData}
                  style={{ height: 400, width: 400 }}
                  aspectRatio={1}
                  guides={true}
                />

              </div>
              <div className={`col-md-12 ${styles.imageUpload}`}>

                {cropData && <button className={`${styles.button}`} onClick={handleCrop}>Crop Image</button>}
                {imgCropped && <button className={`${styles.button}`} disabled={uploading}
                  onClick={() => { handleImageUpload() }}>{
                    uploading ? "Uploading.." : "upload"
                  }</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </>

  );
};

export default ImageCropper;
