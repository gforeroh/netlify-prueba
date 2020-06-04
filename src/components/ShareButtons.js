import React from 'react';
import { FacebookShareButton, InstapaperShareButton, TwitterShareButton } from 'react-share';

const ShareButtons = ({
    url,
    title,
    resume
}) => {
    return (
        <div>
            <div className="color-1 mb-3">
                Compartir post
            </div>
            <div className="d-flex align-items-center">
                <div className="mr-4">
                    <InstapaperShareButton url={url} title={title} description={resume}>  
                        <img src="/img/instagram-share.png" alt="share button" />
                    </InstapaperShareButton>
                </div>
                <div className="mr-4">
                    <TwitterShareButton url={url} title={`${title} - ${resume}`}>  
                        <img src="/img/twitter-share.png" alt="share button" />
                    </TwitterShareButton>
                </div>
                <div>
                    <FacebookShareButton url={url} quote={`${title} - ${resume}`}>  
                        <img src="/img/face-share.png" alt="share button" />
                    </FacebookShareButton>
                </div>
            </div>
        </div>
    )
}

export default ShareButtons;