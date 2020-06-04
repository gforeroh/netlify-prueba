import React from 'react'

const networksImages = [{
    image: "/img/wathsapp.svg",
    imageWhite: "/img/wathsapp-white.svg",
    name: "wathsapp",
    alt: "wathsapp"
},{
    image: "/img/instagram.svg",
    imageWhite: "/img/instagram-white.svg",
    name: "instagram",
    alt: "instagram",
},{
    image: "/img/youtube.svg",
    imageWhite: "/img/youtube-white.svg",
    name: "youtube",
    alt: "youtube web",
},{
    image: "/img/facebook.svg",
    imageWhite: "/img/facebook-white.svg",
    name: "facebook",
    alt: "facebook",
}];

const SocialNetworks = ({
    networks,
    isSimple
}) => {
    const _networks = networksImages.map(n => ({
        ...n,
        image: isSimple ? n.image : n.imageWhite,
        url: networks[n.name]
    }))

    // const _networks = networks.map(n => {
    //     const image = networksImages.find(_n => _n.name === n.name);
    //     return {
    //         ...n,
    //         image: isSimple ? image.image : image.imageWhite,
    //         alt: image.alt
    //     }
    // });

    return (
        <div 
            id="social-networks"
            className="d-flex align-items-center">
            {
                _networks && _networks.map((item, index) => (
                    <a 
                        key={`network${index}`}
                        target="_blank" 
                        href={item.url}
                        className="mx-auto ml-md-0 mr-md-4">
                        <img
                            className="img-fluid"
                            src={item.image} 
                            alt={item.alt} />
                    </a>
                ))
            }
        </div>
    )
}

SocialNetworks.defaultProps = {
    isSimple: true
}

export default SocialNetworks;