class IPFSRoutes{
    static uploadRotue = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    static mediaRoute = "https://gateway.pinata.cloud/ipfs/";
    static mediaRoute = (hash) => `https://gateway.pinata.cloud/ipfs/${hash}`;
}

export default IPFSRoutes;