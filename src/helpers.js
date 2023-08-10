import axios from "axios";

const uploadFileToIPFS = async (file) => {
  console.log(process.env.REACT_APP_PINATA_JWT)
  console.log('uploading image to ipfs.')
  const data = new FormData();
  data.append("file", file);
  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data,
    {
      maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        Authorization:
          `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
      },
    }
  );
  console.log('uploaded image to ipfs.')
  return res.data.IpfsHash;
  // return 
};

export default {
  uploadFileToIPFS,
};
